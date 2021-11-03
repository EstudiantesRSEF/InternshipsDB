import React from 'react'
import {Box, Heading, Flex, Text, Button, Link} from '@chakra-ui/react'

const Footer = props => {
  return (
    <Box
      w="full"
      align="center"
      borderTop="2px solid"
      borderTopColor="gray.200"
      padding={4}
      mt={7}
      bgColor="white"
    >
      <Text color="gray.500">
        Created by{' '}
        <Link href="https://borja.ai" color="teal" isExternal>
          @borja
        </Link>{' '}
        for the Grupo de Estudiantes de la Real Sociedad Española de Física
      </Text>
    </Box>
  )
}

export default Footer
