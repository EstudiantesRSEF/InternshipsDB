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

const Filters = ({selectedFilters, setSelectedFilters}) => {
  const [toggle, setToggle] = useState(false)
  const onChange = e => {
    const {value, name} = e.target
    console.log('triggered', {value, name})
    setSelectedFilters(prevState => ({...prevState, [name]: value}))
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
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Text
          color={'gray.500'}
          fontWeight={600}
          textTransform={'uppercase'}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          BASIC FILTERS
        </Text>
        {toggle ? (
          <ChevronUpIcon onClick={() => setToggle(!toggle)} />
        ) : (
          <ChevronDownIcon onClick={() => setToggle(!toggle)} />
        )}
      </Flex>
      {toggle && (
        <Flex direction="column" justifyContent="center" mt={6}>
          <Select
            name="educationLevel"
            onChange={onChange}
            placeholder="Education level"
            variant="filled"
            minW={minWidth}
            mb={marginBottom}
          >
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </Select>
          <Select
            name="modality"
            onChange={onChange}
            placeholder="Modality"
            variant="filled"
            minW={minWidth}
            mb={marginBottom}
          >
            <option value="Experimental">Experimental</option>
            <option value="Theoretical">Theoretical</option>
            <option value="Computational">Computational</option>
          </Select>
          <Select
            name="discipline"
            onChange={onChange}
            placeholder="Discipline"
            variant="filled"
            minW={minWidth}
            mb={marginBottom}
          >
            <option value="Thermodynamics and Statistical Physics">
              Thermodynamics and Statistical Physics
            </option>
            <option value="Complex Systems and Nonlinear Dynamics">
              Complex Systems and Nonlinear Dynamics
            </option>
            <option value="Quantum Information and Computing">
              Quantum Information and Computing
            </option>
            <option value="Geophysics and Meteorology">
              Geophysics and Meteorology
            </option>
            <option value="Astrophysics and Gravitation">
              Astrophysics and Gravitation
            </option>
            <option value="Optics, Photonics and Lasers">
              Optics, Photonics and Lasers
            </option>
            <option value="Molecular, Atomic, Nuclear and Plasma">
              Molecular, Atomic, Nuclear and Plasma
            </option>
            <option value="Elementary particles, High Energy and Fields">
              Elementary particles, High Energy and Fields
            </option>
            <option value="Condensed Matter">Condensed Matter</option>
            <option value="Materials Physics">Materials Physics</option>
            <option value="Electronic Properties & Semiconductors">
              Electronic Properties & Semiconductors
            </option>
            <option value="Interdisciplinary Physics">
              Interdisciplinary Physics
            </option>
          </Select>
          <Select
            name="hasAllowance"
            onChange={onChange}
            placeholder="Allowance"
            variant="filled"
            minW={minWidth}
            mb={marginBottom}
          >
            <option value="No allowance">No allowance</option>
            <option value="One time allowance">One time allowance</option>
            <option value="Monthly allowance">Monthly allowance</option>
            <option value="Accommodation and travel support">
              Accommodation and travel support
            </option>
          </Select>
          <Select
            name="duration"
            onChange={onChange}
            placeholder="Duration"
            variant="filled"
            minW={minWidth}
            mb={marginBottom}
          >
            <option value="One (1) month or less">One (1) month or less</option>
            <option value="More than one (1) month">
              More than one (1) month
            </option>
          </Select>
          <Select
            name="season"
            onChange={onChange}
            placeholder="Season"
            variant="filled"
            minW={minWidth}
            mb={marginBottom}
          >
            <option value="In summer">In summer</option>
            <option value="Throughout the academic year">
              Throughout the academic year
            </option>
          </Select>
        </Flex>
      )}
    </Box>
  )
}

export default Filters
