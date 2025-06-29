import React, { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react'
import { Container, HomeEntry } from '@/components'
import db from '@/utils/db/firebase-client'
import { collection, getDocs } from 'firebase/firestore'
import useAuth from '@/hooks/useAuth'
import LoginForm from '@/components/LoginForm'
import axios from 'axios'

const UserFavorites = () => {
  const user = useAuth()
  const [favoriteEntries, setFavoriteEntries] = useState([])

  const fetchFavorites = async () => {
    if (user && Array.isArray(user.favorites)) {
      const snapshot = await getDocs(collection(db, 'entries'))
      const allEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      const filtered = allEntries.filter(entry =>
        user.favorites.includes(entry.id)
      )
      setFavoriteEntries(filtered)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [user])

  const toggleFavorite = async (id) => {
    if (!user || !user.email) return

    const isFav = user.favorites.includes(id)
    const method = isFav ? 'DELETE' : 'POST'

    try {
      await axios({
        method,
        url: `/api/favorites/${id}?email=${user.email}`,
      })

      // Actualizamos favoritos en el usuario local
      if (isFav) {
        user.favorites = user.favorites.filter(favId => favId !== id)
      } else {
        user.favorites.push(id)
      }

      // Quitamos el elemento de la lista si ya no es favorito
      setFavoriteEntries(prev =>
        prev.filter(entry => entry.id !== id)
      )
    } catch (error) {
      console.error('Error updating favorites:', error)
    }
  }

  if (user === null) return null

  return (
    <>
      <div style={{ filter: user === false ? 'blur(5px)' : 'none', pointerEvents: user === false ? 'none' : 'auto' }}>
        <Container>
          <Heading my={6}>My Favorite Internships</Heading>
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            w="full"
          >
            {favoriteEntries.length ? (
              favoriteEntries.map(entry => (
                <HomeEntry
                  key={entry.id}
                  user={user}
                  favorite={true}
                  toggleFavorite={() => toggleFavorite(entry.id)}
                  {...entry}
                />
              ))
            ) : (
              <Box textAlign="center">
                <Text color="gray.500">No favorites yet.</Text>
              </Box>
            )}
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
          <LoginForm />
        </div>
      )}
    </>
  )
}

export default UserFavorites
