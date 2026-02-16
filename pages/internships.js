import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Text,
  Heading,
  Flex,
  Box,
  Select,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Container, HomeEntry, Filters } from '@/components'
import db from '@/utils/db/firebase-client'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import useAuth from '@/hooks/useAuth'
import LoginComplete from '@/components/LoginComplete'
import axios from 'axios'


const NoElements = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    height="40vh"
  >
    <Heading as="h3" size="md" color="gray.600" textAlign="center">
      Seems like there's no internships with these characteristics at this time.
    </Heading>
  </Flex>
)

const Index = ({ entriesData }) => {
  const user = useAuth()
  const [favorites, setFavorites] = useState([])
  const [localEntries, setLocalEntries] = useState(entriesData)
  const [selectedFilters, setSelectedFilters] = useState({
    educationLevel: '',
    modality: '',
    discipline: '',
    hasAllowance: '',
    duration: '',
    season: '',
  })

useEffect(() => {
  if (user && Array.isArray(user.favorites)) {
    setFavorites(user.favorites)
  }
}, [user?.favorites])

useEffect(() => {
  let newLocalEntries = [...entriesData]
  for (const [key, value] of Object.entries(selectedFilters)) {
    if (value !== '')
      newLocalEntries = newLocalEntries.filter(entry => entry[key] === value)
  }
  setLocalEntries(newLocalEntries)
}, [selectedFilters])


  if (user === null) return null // aún cargando

  const toggleFavorite = async (id) => {
    const isFav = favorites.includes(id)
    const method = isFav ? 'DELETE' : 'POST'

    try {
      await axios({
        method,
        url: `/api/favorites/${id}?email=${user.email}`,
      })

      setFavorites(prev =>
        isFav ? prev.filter(f => f !== id) : [...prev, id]
      )
    } catch (error) {
      console.error('Error updating favorites:', error)
    }
  }
  return (
    <>
      <div style={{ filter: user === false ? 'blur(5px)' : 'none', pointerEvents: user === false ? 'none' : 'auto' }}>
        <Container>
          <Flex
            direction={['column', 'row', 'row', 'row']}
            alignItems="flex-start"
            pt={10}
          >
            <Filters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <Flex
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              w="full"
              minW="50vw"
            >
              {localEntries.length ? (
                <>
                  <Box w="full" textAlign="center" mb={4}>
                    <Text fontSize="md" color="gray.600">
                      Showing {localEntries.length} result{localEntries.length !== 1 && 's'}
                    </Text>
                  </Box>
                  {localEntries.map(entry => (

                    <HomeEntry
                      key={entry.id}
                      user={user}
                      favorite={favorites.includes(entry.id)}
                      toggleFavorite={() => toggleFavorite(entry.id)}
                      id={entry.id}
                      title={entry.title}
                      description={entry.description}
                      educationLevel={entry.educationLevel}
                      modality={entry.modality}
                      discipline={entry.discipline}
                      hasAllowance={entry.hasAllowance}
                      allowanceAmount={entry.allowanceAmount}
                      language={entry.language}
                      duration={entry.duration}
                      season={entry.season}
                      startDate={entry.startDate}
                      endDate={entry.endDate}
                      url={entry.url}
                      location={entry.location}
                      image={entry.promotionalImage}
                    />
                  ))}
                </>
              ) : (
                <NoElements />
              )}
            </Flex>
          </Flex>
        </Container>
      </div>

      {user === false && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255 255 255 / 27%)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <LoginComplete />
        </div>
      )}
    </>
  )
}

export const getStaticProps = async () => {
  const q = query(
    collection(db, 'entries'),
    where('approved', '==', true),
    orderBy('created', 'desc')
  )

  const snapshot = await getDocs(q)
  const currentYear = new Date().getFullYear()

  const allEntries = snapshot.docs.map(entry => {
    const data = entry.data()

    // Intentamos usar, en este orden, endDate, startDate o created
    const dateString = data.endDate || data.startDate || data.created
    let obsolete = false

    if (dateString) {
      const entryDate = new Date(dateString)
      const entryYear = entryDate.getFullYear()

      // Marcamos como "obsolete" las prácticas de años anteriores
      obsolete = entryYear < currentYear
    }

    return {
      id: entry.id,
      obsolete,
      ...data,
    }
  })

  // Sólo enviamos al frontend las prácticas no obsoletas
  const entriesData = allEntries.filter(entry => !entry.obsolete)

  return {
    props: { entriesData },
    revalidate: 10,
  }
}

export default Index
