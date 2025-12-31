import React from 'react'
import {Container as ChakraContainer, Flex} from '@chakra-ui/react'
import {Header, Footer} from './'

const Container = ({children}) => {
  return (
    <Flex direction="column" align="center" bgColor="red.500">
      <Header />
      <ChakraContainer maxW={['100vw', '90vw']} centerContent minH="80vh">
        {children}
      </ChakraContainer>
      <Footer />
    </Flex>
  )
}

export default Container
