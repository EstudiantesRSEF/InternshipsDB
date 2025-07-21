import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChakraProvider,Spinner, Center } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from '@/styles/theme';
import useAuth from '@/hooks/useAuth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const user = useAuth();
  const [showApp, setShowApp] = useState(false); // Controla si renderizar
  const [checkingAuth, setCheckingAuth] = useState(true) // nuevo estado

useEffect(() => {
  if (user !== null) {
    const path = router.pathname
    const role = user?.role

    const publicRoutes = ['/', '/register', '/reset-password', '/internships', '/LetEmailPage']

    const isAdminRoute = path.startsWith('/admin')
    const isEditRoute = path.startsWith('/admin/editor')

    if (user === false && !publicRoutes.includes(path)) {
      router.replace('/')
      return 
    }

    if (user && path === '/') {
      router.replace('/internships')
      return
    }

    if (isAdminRoute) {
      if (role === 'admin') {
        setShowApp(true)
      } else if (role === 'editor' && isEditRoute) {
        setShowApp(true)
      } else {
        router.replace('/internships')
        return
      }
      setCheckingAuth(false)
      return
    }

    // Resto de rutas válidas
    setShowApp(true)
    setCheckingAuth(false)
  }
}, [user, router])

if (checkingAuth) {
  return (
    <Center w="100vw" h="100vh" bg="white">
      <Spinner size="xl" color="green.500" />
    </Center>
  );
}  

if (!showApp) return null;

  return (
    <>
      <Head>
        <title>InternshipsDB</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
