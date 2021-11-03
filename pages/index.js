import React, {useEffect, useState} from 'react'
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
import {Container, HomeEntry, Filters} from '../components'
import db from '../utils/db'

const NoElements = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    alignItems="center"
    height="40vh"
  >
    <Heading as="h3" size="md" color="gray.600" textAlign="center">
      Seems like there's no internships with these characterisitics at this
      time.
    </Heading>
  </Flex>
)

const Index = ({entriesData}) => {
  const [localEntries, setLocalEntries] = useState(() => entriesData)
  const [selectedFilters, setSelectedFilters] = useState({
    educationLevel: '',
    modality: '',
    discipline: '',
    hasAllowance: '',
    duration: '',
    season: '',
  })

  useEffect(() => {
    let newLocalEntries = [...entriesData]
    for (const [key, value] of Object.entries(selectedFilters)) {
      if (value !== '')
        newLocalEntries = newLocalEntries.filter(entry => entry[key] === value)
    }
    console.log('newData', newLocalEntries.length)
    setLocalEntries(newLocalEntries)
  }, [selectedFilters])

  return (
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
            localEntries.map(entry => (
              <HomeEntry
                key={entry.id}
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
            ))
          ) : (
            <NoElements />
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export const getStaticProps = async () => {
  const entries = await db
    .collection('entries')
    .where('approved', '==', true)
    .orderBy('created', 'desc')
    .get()
  const entriesData = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data(),
  }))
  return {
    props: {entriesData},
    revalidate: 10,
  }
}

export default Index
