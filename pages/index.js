import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/useAuth'
import LandingPage from '@/components/LandingPage'
import db from '@/utils/db/firebase-client'
import { doc, getDoc } from 'firebase/firestore'
import { Center, Spinner } from '@chakra-ui/react'

export async function getServerSideProps() {
  try {
    const docRef = doc(db, 'page', 'landingPage')
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return { notFound: true }
    }

    const data = docSnap.data()

    return {
      props: {
        logoUrl: data.logoUrl || '',
        videoUrl: data.videoUrl || '',
        description: data.description || '',
        ctaButtonText:
          data.ctaButtonText ||
          '¡Accede a la Internships Database del GdeE-RSEF!',
        ctaButtonLink: data.ctaButtonLink || 'link_boton',
        secondaryButtonText: data.secondaryButtonText || '',
        secondaryButtonLink: data.secondaryButtonLink || '',
        infoText:
          data.infoText ||
          'La Internships Database es sólo para miembros del GdeE-RSEF...',
      },
    }
  } catch (error) {
    console.error('Error cargando configuración:', error)
    return { notFound: true }
  }
}

export default function Landing(props) {
  const user = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/internships')
    }
  }, [user, router])

  if (user === null) {
    // Mientras carga el usuario, muestra spinner y no renderices landing
    return (
      <Center w="100vw" h="100vh" bg="white">
        <Spinner size="xl" color="green.500" />
      </Center>
    )
  }

  if (user) return null // Usuario logado: no mostrar landing (ya redirige)

  // Usuario no logado: mostrar landing
  return <LandingPage {...props} />
}