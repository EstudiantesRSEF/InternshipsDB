import React from 'react'
import {Box, Heading, Flex, Text, Button, Link} from '@chakra-ui/react'

const Footer = props => {
  return (
    <Box
      w="full"
      borderTop="2px solid"
      borderTopColor="gray.200"
      padding={4}
      mt={7}
      bgColor="green.700"
    >
      <Flex w="full" p={4} color="white" justifyContent="center" alignItems="flex-start">
        <Flex direction="column" p={4} flex="1" alignItems="flex-start" textAlign="left">
          <Heading
            color="white"
            fontSize={'xl'}
            fontFamily={'body'}
            mb={2}
          >
          Development:
          </Heading>
          <Link href="https://borja.ai" color="gray.100" isExternal>
            @borja
          </Link>{' '}
          <Link href="https://github.com/ruthqv" color="gray.100" isExternal>
            @ruthqv
          </Link>
          <Text color="gray.100">
            <Link href="https://github.com/tortiz-r" color="gray.100" isExternal>
              @tristan
            </Link>{' '}
            (Active maintainment)
          </Text>
        </Flex>
        {/* <Flex direction="column" p={4} justify="left">
          Active maintainment:
          <Link href="https://github.com/tortiz-r" color="gray.100" isExternal>
            @tristan
          </Link>
        </Flex> */}
        <Flex direction="column" p={4} flex="1" alignItems="center" textAlign="center"> {/* align="left"*/}
          <Heading
            color="white"
            fontSize={'xl'}
            fontFamily={'body'}
            mb={2}
          >
          Contacta con nosotros:
          </Heading>          {/* "mailto:estudiantes@rsef.es?cc=someoneelse@example.com&bcc=andsomeoneelse@example.com&subject=Summer%20Party&body=You%20are%20invited%20to%20a%20big%20summer%20party!" */}
          <Link href="mailto:estudiantes@rsef.es?subject=Incidencia%DataBase&body=Escribo%para%transmitir%una%incidencia%relativa%a%la%Inetrnships%DataBase.%Ruego%se%transmita%al%Comité%IT%/%Equipo%DataBase."
             target="_top" color="white">
            Quiero comunicar una incidencia.
          </Link>
          <Link href="mailto:estudiantes@rsef.es?subject=Sugerencia%DataBase&body=Escribo%para%transmitir%una%sugerencia%relativa%a%la%Inetrnships%DataBase.%Ruego%se%transmita%al%Comité%IT%/%Equipo%DataBase."
             target="_top" color="white">
            Quiero hacer una sugerencia.
          </Link>
          <Link href="mailto:estudiantes@rsef.es?subject=Counicacion%sobre%DataBase&body=Ruego%se%transmita%al%Comité%IT%/%Equipo%DataBase."
             target="_top" color="white">
            Otro
          </Link>
        </Flex>
        <Flex direction="column" p={4} flex="1" alignItems="flex-end" textAlign="left"> {/* align="left"*/}
          <Heading
            color="white"
            fontSize={'xl'}
            fontFamily={'body'}
            mb={2}
          >
          Conecta:
          </Heading>
          <Link href="https://twitter.com/EstudiantesRSEF"
            target="_top" color="white" isExternal
          >
            Twitter
          </Link>
           <Link href="https://www.instagram.com/estudiantesrsef/"
            target="_top" color="white" isExternal
          >
            Instagram.
          </Link>
          <Link href="https://www.youtube.com/channel/UCxKN9jdwl2EgFsGcwDj1QOg"
            target="_top" color="white" isExternal
          >
            Youtube
          </Link>
          <Link href="https://www.linkedin.com/company/grupo-de-estudiantes-rsef/"
            target="_top" color="white" isExternal
          >
            Linkedin.
          </Link>
           <Link href="https://estudiantes.rsef.es/"
            target="_top" color="white" isExternal
          >
            GdeE Website
          </Link>
           <Link href="http://www.iaps.info/"
            target="_top" color="white" isExternal
          >
            IAPS Website
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
