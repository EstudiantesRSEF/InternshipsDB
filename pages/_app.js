import {useEffect} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {ChakraProvider} from '@chakra-ui/react'
import * as gtag from '../utils/analytics/gtag'

function MyApp({Component, pageProps}) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>RSEF Students Group Interships</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
