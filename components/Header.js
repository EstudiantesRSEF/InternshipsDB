import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react'

import styles from '../styles/Home.module.css'

const Header = props => {
  return (
    <Box
      w="full"
      align="center"
      borderBottom="2px solid"
      borderTop="5px solid"
      borderBottomColor="gray.200"
      borderTopColor="green.400"
      bgColor="white"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        width={['100vw', '90vw']}
        {...props}
      >
        <Link href="/">
          <a>
            <Flex direction="row" alignItems="center">
              <Image src="/logo.png" width={90 * 0.6} height={85 * 0.6} />
              <Heading
                as="h2"
                size="lg"
                isTruncated
                color="gray.700"
                ml={3}
                className={styles.mobileHidden}
              >
                RSEF Students Group
              </Heading>
            </Flex>
          </a>
        </Link>
        <Flex direction="row" alignItems="center">
          <ChakraLink
            href="https://estudiantes.rsef.es/"
            isExternal
            mr={5}
            _hover={{textDecor: 'none'}}
          >
            Visit main website
          </ChakraLink>
          <Link href="/post">
            <Button colorScheme="green" variant="outline">
              Submit internship
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
