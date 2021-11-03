import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
  Divider,
  Icon,
  Link,
  Button,
} from '@chakra-ui/react'
import {CalendarIcon, SunIcon} from '@chakra-ui/icons'
import {GiReceiveMoney} from 'react-icons/gi'
import {FaUniversity} from 'react-icons/fa'
import {IoLanguage} from 'react-icons/io5'
import {MdAccessTime} from 'react-icons/md'

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2]

  return day + '/' + month + '/' + year
}

const Line = ({icon, label, value}) => (
  <Flex direction="row" justifyContent="center" alignItems="baseline" mr={3}>
    {icon}
    <Text ml={2}>
      <b>{label}:</b> {value}
    </Text>
  </Flex>
)

const imageComp = () => (
  <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
    <img
      src={props.image || imageFallback}
      onError={imageFallback}
      layout="fill"
      objectFit="cover"
    />
  </Box>
)

const HomeEntry = props => {
  return (
    <Box ml={[0, 6]} mb={6}>
      <Box
        maxW="550px"
        w="full"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Flex flexDir="row" flexWrap="wrap">
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
              mr={1}
            >
              {props.location || 'Remote'}
            </Text>
            <Text
              color={'gray.500'}
              fontWeight={600}
              textTransform={'uppercase'}
              fontSize={'sm'}
              letterSpacing={1.1}
              mr={1}
            >
              {` • ${props.educationLevel} • `}
            </Text>
            <Text
              color={'gray.500'}
              fontWeight={600}
              textTransform={'uppercase'}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {props.modality}
            </Text>
          </Flex>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            fontFamily={'body'}
          >
            {props.title.length > 40
              ? `${props.title.substring(0, 40)}...`
              : props.title}
          </Heading>
          <Divider />
          <Text minH="3rem" color={'gray.500'} mb={3}>
            {props.description.substring(0, 180)}...
          </Text>
          <Divider mb={3} />
          <Flex
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            <Line
              icon={<Icon as={FaUniversity} />}
              label="Discipline"
              value={props.discipline}
            />
            <Line
              icon={<Icon as={IoLanguage} />}
              label="Languages"
              value={props.language}
            />
            <Line
              icon={<Icon as={MdAccessTime} />}
              label="Duration"
              value={props.duration}
            />
            <Line icon={<SunIcon />} label="Season" value={props.season} />
            <Line
              icon={<Icon as={GiReceiveMoney} />}
              label="Allowance"
              value={
                props.hasAllowance === 'No allowance' ||
                props.hasAllowance === 'Accommodation and travel support'
                  ? props.hasAllowance
                  : `${props.allowanceAmount}€ ${
                      props.hasAllowance === 'Monthly allowance'
                        ? 'per month'
                        : 'one time payment'
                    }`
              }
            />
            <Flex direction="row" flexWrap="wrap">
              <Line
                icon={<CalendarIcon />}
                label="Opening date"
                value={formatDate(props.startDate)}
              />
              <Line
                icon={<CalendarIcon />}
                label="Closing date"
                value={formatDate(props.endDate)}
              />
            </Flex>
          </Flex>
        </Stack>
        <Divider my={3} />
        <Flex justifyContent="center" alignItems="center" pt={2}>
          <Link href={props.url} isExternal _hover={{textDecoration: 'none'}}>
            <Button colorScheme="green">Apply to this internship</Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default HomeEntry
