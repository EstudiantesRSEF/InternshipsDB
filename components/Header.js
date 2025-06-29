import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'
import styles from '@/styles/Home.module.css'
import useAuth from '@/hooks/useAuth'
import { FaUser,FaBars  } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { IconButton } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router';

const Header = props => {
  const router = useRouter();

  const user = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  //console.log(user)
  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      Cookies.remove('token');
      window.location.href = '/';
    }
  }
  const handleClick = () => {
    router.push('/users')
  }
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
            <Image src="/logo.png" width={90 * 0.6} height={85 * 0.6} alt="Logo" />
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

      <Flex direction="row" alignItems="center" gap={6}>
        <ChakraLink
          href="https://estudiantes.rsef.es/"
          isExternal
          _hover={{ textDecor: 'none' }}
        >
          Visit main website
        </ChakraLink>
       {user && user.name && (
        <>
        <Link href="/post">
          <Button colorScheme="green" variant="outline">
            Submit internship
          </Button>
        </Link>
        
          <Flex direction="column" align="end" ml={4}>
            <Flex align="center">
              <Icon as={FaUserCircle} mr={2} />
              <Text fontSize="sm">Hola, {user.name} ({user.role})</Text>
            </Flex>
            <Text
              fontSize="xs"
              color="gray.500"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Text>
          </Flex>
        
         <IconButton
            icon={<StarIcon />}
            aria-label="Favorite"
            top={0}
            right={2}
            color={'gold'}
            onClick={handleClick}
            size="sm"
            isRound
          />
          </>
        )}

            {user && (user.role === 'admin' || user.role === 'editor'  ) && (
              <>
              <Flex direction="column" align="end" ml={4}>
                <Icon
                  as={FaBars}
                  cursor="pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  ml={4}
                />
                </Flex>
                {isMenuOpen && (
                  <Box
                    position="absolute"
                    top="90px"
                    right="0px"
                    bgColor="white"
                    boxShadow="md"
                    p={2}
                    borderRadius="md"
                    zIndex="10"
                  >
                    <Link href="/admin/editor/published">
                      <Button variant="link" width="100%" mb={2}>
                        Published Internships
                      </Button>
                    </Link>
                    <Link href="/admin/editor/review">
                      <Button variant="link" width="100%"  mb={2}>
                        Review Internships
                      </Button>
                    </Link>
                      {user && user.role === 'admin' && (
                        <>
                          <Link href="/admin/users">
                            <Button variant="link" width="100%" mb={2}>
                              Users Management
                            </Button>
                          </Link>
                          <Link href="/admin/page/landing">
                            <Button variant="link" width="100%" mb={2}>
                              Edit Landing Page
                            </Button>
                          </Link>
                        </>
                      )}
                  </Box>
                )}
              </>
            )}
      </Flex>
    </Flex>
  </Box>
)
}
 
export default Header
