import Image from 'next/image'
import Link from 'next/link'
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Flex,
  Divider,
  Table,
} from '@chakra-ui/react'
import {
  CalendarIcon,
  TimeIcon,
  SunIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons'

const Apply = () => (
  <Box
    w="80vw"
    bg="green.800"
    boxShadow="md"
    rounded={'md'}
    p={6}
    overflow={'hidden'}
    mt={10}
  >
    <Flex justifyContent="center" alignItems="center">
      <Button colorScheme="white" variant="outline">
        Apply to this internship
      </Button>
    </Flex>
  </Box>
)

const TableLine = ({label, value}) => (
  <Flex flexDir="row" alignItems="baseline">
    <Text color="gray.700" fontSize="sm" mr={2} casing="uppercase">
      <b>{label}</b>
    </Text>{' '}
    <Text>{value}</Text>
  </Flex>
)

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2]

  return day + '/' + month + '/' + year
}

const DataTable = ({props}) => {
  return (
    <Box
      w="80vw"
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="md"
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      mt={10}
    >
      <Flex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flexDirection="column" mr={5}>
          <TableLine label="educational level" value={props.educationLevel} />
          <TableLine label="modality" value={props.modality} />
        </Flex>
        <Flex flexDirection="column" mr={5}>
          <TableLine label="discipline" value={props.discipline} />
          <TableLine label="languages" value={props.language} />
        </Flex>
        <Flex flexDirection="column" mr={5}>
          <TableLine label="duration" value={props.duration} />
          <TableLine label="season" value={props.season} />
        </Flex>
        <Flex flexDirection="column">
          <TableLine label="Opening date" value={formatDate(props.startDate)} />
          <TableLine label="Closing date" value={formatDate(props.endDate)} />
        </Flex>
      </Flex>
    </Box>
  )
}

const Entry = props => {
  return (
    <>
      <Box
        w="80vw"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="md"
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={
              props.image ||
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {props.location || 'Remote'}{' '}
            <span color="gray.500">
              {' '}
              • {props.educationLevel} • {props.modality}
            </span>
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            fontFamily={'body'}
          >
            {props.title || 'Untitled Entry'}
          </Heading>
          <Text color={'gray.500'} mb={3}>
            {props.description}
          </Text>
        </Stack>
      </Box>
      <DataTable props={props} />
      <Apply />
    </>
  )
}

export default Entry
