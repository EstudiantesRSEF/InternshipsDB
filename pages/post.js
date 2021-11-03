import {useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Select,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import {Container} from '../components'

const Post = () => {
  const router = useRouter()
  const [content, setContent] = useState({
    title: '',
    description: '',
    educationLevel: '',
    modality: '',
    discipline: '',
    hasAllowance: '',
    allowanceAmount: null,
    language: '',
    duration: '',
    season: '',
    startDate: '',
    endDate: '',
    url: '',
    promotionalImage: '',
  })

  const onChange = e => {
    const {value, name} = e.target
    setContent(prevState => ({...prevState, [name]: value}))
  }

  const onSubmit = async () => {
    await axios.post('/api/entry', content)
    router.push('/success')
  }

  const validate = () => {
    for (const [key, value] of Object.entries(content)) {
      if (value === '') return true
    }
    return false
  }

  const marginBetweenElements = 4

  return (
    <Container>
      <Box my={10} bgColor="white" p={6} borderRadius="md">
        <Heading mt={5} mb={7}>
          Submit a new internship to our database
        </Heading>
        <FormControl id="title" isRequired mb={marginBetweenElements}>
          <FormLabel>Opportunitie's title</FormLabel>
          <Input
            type="text"
            name="title"
            value={content.title}
            onChange={onChange}
            placeholder="ESA Young Minds Internship"
            variant="filled"
          />
        </FormControl>
        <FormControl id="description" isRequired mb={marginBetweenElements}>
          <FormLabel>Short description</FormLabel>
          <Textarea
            type="text"
            name="description"
            value={content.description}
            onChange={onChange}
            placeholder="A brief explanation as to why your opportunity is great!"
            variant="filled"
          />
          <FormHelperText>
            The description needs to be of at least 180 characters.
          </FormHelperText>
        </FormControl>
        <FormControl id="educationLevel" isRequired mb={marginBetweenElements}>
          <FormLabel>Education level</FormLabel>
          <Select
            name="educationLevel"
            onChange={onChange}
            placeholder="Relevant education level"
            variant="filled"
          >
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </Select>
        </FormControl>
        <FormControl id="modality" isRequired mb={marginBetweenElements}>
          <FormLabel>Modality</FormLabel>
          <Select
            name="modality"
            onChange={onChange}
            placeholder="Relevant modality"
            variant="filled"
          >
            <option value="Experimental">Experimental</option>
            <option value="Theoretical">Theoretical</option>
            <option value="Computational">Computational</option>
          </Select>
        </FormControl>
        <FormControl id="discipline" isRequired mb={marginBetweenElements}>
          <FormLabel>Discipline</FormLabel>
          <Select
            name="discipline"
            onChange={onChange}
            placeholder="Relevant discipline"
            variant="filled"
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
        </FormControl>
        <FormControl id="location" isRequired mb={marginBetweenElements}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            name="location"
            value={content.location}
            onChange={onChange}
            placeholder="i.e: London, Cambdrige, Oxford"
            variant="filled"
          />
          <FormHelperText>
            If there is more than one you can separate them by commas
          </FormHelperText>
        </FormControl>
        <FormControl id="hasAllowance" isRequired mb={marginBetweenElements}>
          <FormLabel>Allowance</FormLabel>
          <Select
            name="hasAllowance"
            onChange={onChange}
            placeholder="Choose a type of allowance"
            variant="filled"
          >
            <option value="No allowance">No allowance</option>
            <option value="One time allowance">One time allowance</option>
            <option value="Monthly allowance">Monthly allowance</option>
            <option value="Accommodation and travel support">
              Accommodation and travel support
            </option>
          </Select>
        </FormControl>
        {(content.hasAllowance === 'One time allowance' ||
          content.hasAllowance === 'Monthly allowance') && (
          <FormControl
            id="allowanceAmount"
            isRequired
            mb={marginBetweenElements}
          >
            <FormLabel>Allowance amount</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="€"
              />
              <Input
                type="text"
                name="allowanceAmount"
                value={content.allowanceAmount}
                onChange={onChange}
                placeholder="300"
                variant="filled"
              />
            </InputGroup>
          </FormControl>
        )}
        <FormControl id="language" isRequired mb={marginBetweenElements}>
          <FormLabel>Required languages</FormLabel>
          <Input
            type="text"
            name="language"
            value={content.language}
            onChange={onChange}
            placeholder="i.e: English, French"
            variant="filled"
          />
          <FormHelperText>
            If there is more than one you can separate them by commas
          </FormHelperText>
        </FormControl>
        <FormControl id="duration" isRequired mb={marginBetweenElements}>
          <FormLabel>Duration</FormLabel>
          <Select
            name="duration"
            onChange={onChange}
            placeholder="Choose a type of duration"
            variant="filled"
          >
            <option value="One (1) month or less">One (1) month or less</option>
            <option value="More than one (1) month">
              More than one (1) month
            </option>
          </Select>
        </FormControl>
        <FormControl id="season" isRequired mb={marginBetweenElements}>
          <FormLabel>Season</FormLabel>
          <Select
            name="season"
            onChange={onChange}
            placeholder="Choose a season"
            variant="filled"
          >
            <option value="In summer">In summer</option>
            <option value="Throughout the academic year">
              Throughout the academic year
            </option>
          </Select>
        </FormControl>
        <FormControl id="startDate" isRequired mb={marginBetweenElements}>
          <FormLabel>Opening date</FormLabel>
          <Input
            type="date"
            min="2021-01-01"
            name="startDate"
            value={content.startDate}
            onChange={onChange}
            variant="filled"
          />
        </FormControl>
        <FormControl id="endDate" isRequired mb={marginBetweenElements}>
          <FormLabel>Closing date</FormLabel>
          <Input
            type="date"
            min="2021-01-01"
            name="endDate"
            value={content.endDate}
            onChange={onChange}
            variant="filled"
          />
        </FormControl>
        <FormControl id="url" isRequired mb={marginBetweenElements}>
          <FormLabel>
            Link to more information and or application form
          </FormLabel>
          <Input
            type="url"
            name="url"
            value={content.url}
            onChange={onChange}
            placeholder="i.e: https://rsef.es/internship-application-details"
            variant="filled"
          />
        </FormControl>
        <FormControl
          id="promotionalImage"
          isRequired
          mb={marginBetweenElements}
        >
          <FormLabel>URL of promotional image</FormLabel>
          <Input
            type="url"
            name="promotionalImage"
            value={content.promotionalImage}
            onChange={onChange}
            placeholder="i.e: https://rsef.es/internship-application-details-image.jpeg"
            variant="filled"
          />
          <FormHelperText>
            If you want your internship to be shared with Grupo de Estudiantes
            members through email, including a promotional image is a requisite.
            This image will also be used for the platforms listing, if you don't
            provide one, a generic template will be used for this purposes.
          </FormHelperText>
        </FormControl>
        <Button disabled={validate()} onClick={onSubmit} mt={5}>
          Submit internship
        </Button>
      </Box>
    </Container>
  )
}

export default Post
