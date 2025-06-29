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

const Published = ({ entriesData }) => {
  const [data, setData] = useState(entriesData)

  const onDelete = async id => {
    await axios.delete(`/api/entry/${id}`)
    setData(data.filter(item => item.id !== id))
  }

  return (
    <Container>
      <Box width="full" minH="30vh" my={10} bgColor="white" p={6} borderRadius="md">
        <Heading mt={5} mb={7} pl={5}>
          Published internships
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Internship title</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(entry => (
              <Tr key={entry.id}>
                <Td>{entry.title}</Td>
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

  const entriesData = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data(),
  }))

  return { props: { entriesData } }
}

export default Published