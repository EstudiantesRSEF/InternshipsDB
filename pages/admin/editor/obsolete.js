import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import {
  Heading,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { Container } from '@/components'
import db from '@/utils/db/firebase-admin'

const ObsoleteInternships = ({ entriesData }) => {
  const [data, setData] = useState(entriesData)

  const onDelete = async id => {
    await axios.delete(`/api/entry/${id}`)
    setData(data.filter(item => item.id !== id))
  }

  return (
    <Container>
      <Box width="full" minH="30vh" my={10} bgColor="white" p={6} borderRadius="md">
        <Heading mt={5} mb={7} pl={5}>
          Obsolete internships
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Internship title</Th>
              <Th>Year</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(entry => (
              <Tr key={entry.id}>
                <Td>{entry.title}</Td>
                <Td>{entry._year || 'N/A'}</Td>
                <Td>
                  <Link href={`/admin/editor/edit/${entry.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                </Td>
                <Td>
                  <Button onClick={() => onDelete(entry.id)} colorScheme="red" variant="outline">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}

export const getServerSideProps = async () => {
  const entries = await db
    .collection('entries')
    .where('approved', '==', true)
    .orderBy('created', 'desc')
    .get()

  const currentYear = new Date().getFullYear()

  const allEntries = entries.docs.map(entry => {
    const data = entry.data()

    const dateString = data.endDate || data.startDate || data.created
    let obsolete = data.obsolete === true
    let year = null

    if (dateString) {
      const entryDate = new Date(dateString)
      year = entryDate.getFullYear()
      obsolete = obsolete || year < currentYear
    }

    return {
      id: entry.id,
      obsolete,
      _year: year,
      ...data,
    }
  })

  const entriesData = allEntries.filter(entry => entry.obsolete)

  return { props: { entriesData } }
}

export default ObsoleteInternships
