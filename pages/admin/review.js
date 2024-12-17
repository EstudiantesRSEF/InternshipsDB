import React, {useState} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import {
  Heading,
  Stack,
  Box,
  Button,
  useColorModeValue,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import {Container, HomeEntry, Protection} from '../../components'
import db from '../../utils/db'

const Review = ({entriesData}) => {

  const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('adminToken');
      if (token === 'validToken') {
        setAuthenticated(true);
      } else {
        Router.push('/login'); // Redirige a la página de login si no está autenticado
      }
    }, []);

    if (!authenticated) {
      return null; // Muestra una pantalla vacía mientras verifica
    }

    return (
      <div>
        {
          const [data, setData] = useState(entriesData)

          const onDelete = async id => {
            await axios.delete(`/api/entry/${id}`)
            setData(data.filter(item => item.id !== id))
          }

          const onApprove = async id => {
            await axios.put(`/api/approve`, {id})
            setData(data.filter(item => item.id !== id))
          }

          return (
            <Container>
              <Protection>
                <Box
                  width="full"
                  minH="30vh"
                  my={10}
                  bgColor="white"
                  p={6}
                  borderRadius="md"
                >
                  <Heading mt={5} mb={7} pl={5}>
                    Applications pending approval
                  </Heading>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Application title</Th>
                        <Th>View</Th>
                        <Th>Edit</Th>
                        <Th>Approve</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map(entry => (
                        <Tr key={entry.id}>
                          <Td>{entry.title}</Td>
                          <Td>
                            <Link href={`/posts/${entry.id}`}>
                              <Button variant="outline">View</Button>
                            </Link>
                          </Td>
                          <Td>
                            <Link href={`/admin/edit/${entry.id}`}>
                              <Button variant="outline">Edit</Button>
                            </Link>
                          </Td>
                          <Td>
                            <Button
                              onClick={() => onApprove(entry.id)}
                              colorScheme="green"
                              variant="outline"
                            >
                              Approve
                            </Button>
                          </Td>
                          <Td>
                            <Button
                              onClick={() => onDelete(entry.id)}
                              colorScheme="red"
                              variant="outline"
                            >
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Protection>
            </Container>
          )
        }
        
        export const getStaticProps = async () => {
          const entries = await db
            .collection('entries')
            .where('approved', '!=', true)
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

        }
      </div>
    );

export default Review
