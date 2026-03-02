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
  const [sortOrder, setSortOrder] = useState('created-desc') // predet por fecha de creación, descendente

useEffect(() => {
  if (user && Array.isArray(user.favorites)) {
    setFavorites(user.favorites)
  }
}, [user?.favorites])

// Filtro para las internships, 
useEffect(() => {
  // 1. Partimos siempre de entriesData original
  let newLocalEntries = [...entriesData]
  // 2. Aplicamos los filtros seleccionados
  for (const [key, value] of Object.entries(selectedFilters)) {
    if (value !== '')
      newLocalEntries = newLocalEntries.filter(entry => entry[key] === value)
  }

  // 3. Aplicamos la ordenación según sortOrder
  if (sortOrder == 'created-desc') { //reciente->antiguo, según created
    newLocalEntries = newLocalEntries.sort((a, b) => new Date(b.created) - new Date(a.created))
  } else if (sortOrder == 'title-asc') { //titulo A-Z
    newLocalEntries = newLocalEntries.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortOrder == 'title-desc') { //titulo Z-A
    newLocalEntries = newLocalEntries.sort((a, b) => b.title.localeCompare(a.title))
  } else if (sortOrder == 'closed-asc') { //cercano->lejano, según endDate
    const today = new Date()
    newLocalEntries = newLocalEntries.sort((a, b) => {
      const aEnd = a.endDate ? new Date(a.endDate) : null
      const bEnd = b.endDate ? new Date(b.endDate) : null
      const aOpen = aEnd && aEnd >= today
      const bOpen = bEnd && bEnd >= today
      // Si una está abierta y la otra cerrada, la abierta va antes
      if (aOpen && !bOpen) return -1
      if (!aOpen && bOpen) return 1
      // Si ambas tienen endDate, ordena por fecha (más cercano primero)
      if (aEnd && bEnd) return aEnd - bEnd
      // Si una no tiene endDate, mándala al final
      if (!aEnd && bEnd) return 1
      if (aEnd && !bEnd) return -1
      // Si ninguna tiene endDate, mantén el orden
      return 0
    })
  }

  // 4. Actualizamos el estado (cada vez que cambie filtro o order, se recalcula todo)
  setLocalEntries(newLocalEntries)
}, [selectedFilters, sortOrder, entriesData])


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
                    <Flex justify={{ base: 'center', md: 'space-between' }}
                    align="center" direction={{ base: 'column', md: 'row' }} gap="2">
                      <Text fontSize="md" color="gray.600">
                       Showing {localEntries.length} result{localEntries.length !== 1 && 's'}
                      </Text>

                      {/* Controles de ordenación */}
                      <Flex align="center">
                        <Text mr={2} fontSize="sm" color="gray.600">
                          Order by:
                        </Text>
                        <Select size="sm" value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)} w="200px">
                          <option value="closed-asc">Sooner deadline</option>
                          <option value="created-desc">Most recent</option>
                          <option value="title-asc">Title (A-Z)</option>
                          <option value="title-desc">Title (Z-A)</option>
                        </Select>
                      </Flex>
                    </Flex>
                    
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
    let obsolete = data.obsolete === true

    if (dateString) {
      const entryDate = new Date(dateString)
      const entryYear = entryDate.getFullYear()

      // Marcamos como "obsolete" si está marcada en DB o es de años anteriores
      obsolete = obsolete || entryYear < currentYear
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
