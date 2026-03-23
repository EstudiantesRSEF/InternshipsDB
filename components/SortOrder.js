import React, {useState} from 'react'
import {
  Text,
  Flex,
  Box,
  Select,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
  UpDownIcon,
} from '@chakra-ui/icons'

const SortOrder = ({sortOrder, setSortOrder}) => {
  const onChange = e => {
    const {value, name} = e.target
    console.log('triggered', {value, name})
  }

  const minWidth = '250px'
  const marginBottom = '16px'

  return (
    <Box
      minW="300px"
      w={['full', '300px']}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={6}
      mb={10}
    >
    <Text
    color={'gray.500'}
    fontWeight={600}
    textTransform={'uppercase'}
    fontSize={'sm'}
    letterSpacing={1.1}>
    SORT BY:
    </Text>
    <Select
    size="md"
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    w="200px"
    >
    <option value="closed-asc">Sooner deadline</option>
    <option value="created-desc">Most recently uploaded</option>
    <option value="title-asc">Title (A-Z)</option>
    <option value="title-desc">Title (Z-A)</option>
    </Select>
    </Box>
  )
}

export default SortOrder