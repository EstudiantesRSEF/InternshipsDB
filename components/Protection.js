import React, {useState} from 'react'
import {
  Heading,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import {Container} from './'

const Protection = ({children}) => {
  const officialPassword = 'crumbleLakes13'
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [allowed, setAllowed] = useState(false)

  const passValidation = () =>
    password === officialPassword
      ? setAllowed(true)
      : setError('Wrong password!')

  return allowed ? (
    children
  ) : (
    <Box w="full" my={10} bgColor="white" p={6} borderRadius="md">
      <Heading mt={5} mb={7}>
        Enter admin password
      </Heading>
      <FormControl id="password" isRequired mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant="filled"
        />
      </FormControl>
      {error && <Text color="red">{error}</Text>}
      <Button disabled={!password} onClick={passValidation} mt={5}>
        Submit
      </Button>
    </Box>
  )
}

export default Protection
