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
  Icon,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaUserCircle, FaBars } from 'react-icons/fa'
import styles from '@/styles/Home.module.css'
import useAuth from '@/hooks/useAuth'
import Cookies from 'js-cookie'
import { StarIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

const Header = (props) => {
  const router = useRouter()
  const user = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      Cookies.remove('token')
      window.location.href = '/'
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
        align={['flex-start', 'center']}
        justify="space-between"
        direction={['column', 'row']}
        padding="1rem"
        width={['100vw', '90vw']}
        gap={[4, 0]}
        {...props}
      >
        {/* Logo y título */}
        <Link href="/" passHref>
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
                display={['none', 'block']}
              >
                InternshipsDB
              </Heading>
              <Heading
                as="h2"
                size="md"
                color="gray.700"
                ml={3}
                display={['block', 'none']}
              >
                InternshipsDB
              </Heading>
            </Flex>
          </a>
        </Link>

        {/* Contenido derecho */}
        <Flex
          direction={['column', 'row']}
          alignItems={['flex-start', 'center']}
          gap={[3, 6]}
          w={['full', 'auto']}
        >
          <ChakraLink
            href="https://estudiantes.rsef.es/"
            isExternal
            _hover={{ textDecor: 'none' }}
          >
            Visit main website
          </ChakraLink>
          {user && user.name && (
              <Link href="/post" passHref>
                <Button colorScheme="green" variant="outline" w={['auto', 'auto']} mr={2}>
                  Submit internship
                </Button>
              </Link>
              )}
          {user && user.name && (
            <Flex
              direction={['row', 'row']}
              align="center"
              w={['full', 'auto']}
              gap={2}
              mt={[2, 0]}
            >
              {/* Usuario */}
              <Flex align="center">
                <Icon as={FaUserCircle} mr={2} />
                <Text fontSize="sm">
                  Hola, {user.name} ({user.role})
                </Text>
              </Flex>
              <Text
                fontSize="xs"
                color="gray.500"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                onClick={handleLogout}
                ml={2}
              >
                Cerrar sesión
              </Text>
              <IconButton
                icon={<StarIcon />}
                aria-label="Favorite"
                color={'gold'}
                onClick={handleClick}
                size="sm"
                isRound
                ml={2}
              />
              {(user.role === 'admin' || user.role === 'editor') && (
                <>
                  <Icon
                    as={FaBars}
                    cursor="pointer"
                    onClick={onOpen}
                    ml={2}
                  />
                  <Drawer
                    placement="right"
                    onClose={onClose}
                    isOpen={isOpen}
                  >
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerHeader>Admin/Editor Panel</DrawerHeader>
                      <DrawerBody>
                        <Link href="/admin/editor/published" passHref>
                          <Button variant="link" width="100%" mb={2} onClick={onClose}>
                            Published Internships
                          </Button>
                        </Link>
                        <Link href="/admin/editor/review" passHref>
                          <Button variant="link" width="100%" mb={2} onClick={onClose}>
                            Review Internships
                          </Button>
                        </Link>
                        {user.role === 'admin' && (
                          <>
                            <Link href="/admin/users" passHref>
                              <Button variant="link" width="100%" mb={2} onClick={onClose}>
                                Users Management
                              </Button>
                            </Link>
                            <Link href="/admin/page/landing" passHref>
                              <Button variant="link" width="100%" mb={2} onClick={onClose}>
                                Edit Landing Page
                              </Button>
                            </Link>
                          </>
                        )}
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header