import React from 'react'
import {useRouter} from 'next/router'
import {Spinner, Box, Stack, Heading, Text} from '@chakra-ui/react'
import {Container, Entry} from '../../components'
import db from '../../utils/db'

const NotFound = () => (
  <Stack
    as={Box}
    textAlign={'center'}
    spacing={{base: 8, md: 14}}
    py={{base: 20, md: 36}}
  >
    <Heading
      fontWeight={600}
      fontSize={{base: '2xl', sm: '4xl', md: '6xl'}}
      lineHeight={'110%'}
    >
      <Text as={'span'} color={'green.400'}>
        Whooooops! <br />
      </Text>
      Seems like the entry you are looking for doesn't exist
    </Heading>
  </Stack>
)

const Post = props => {
  const {entry} = props
  const router = useRouter()

  return (
    <Container>
      <Box my={5}>
        {router.isFallback && <Spinner />}
        {!entry && <NotFound />}
        {entry && (
          <Entry
            key={entry.id}
            id={entry.id}
            title={entry.title}
            description={entry.description}
            educationLevel={entry.educationLevel}
            modality={entry.modality}
            discipline={entry.discipline}
            hasAllowance={entry.hasAllowance}
            allowanceAmount={entry.allowanceAmount}
            language={entry.language}
            duration={entry.duration}
            season={entry.season}
            startDate={entry.startDate}
            endDate={entry.endDate}
            url={entry.url}
            location={entry.location}
          />
        )}
      </Box>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const entries = await db.collection('entries').get()
  const paths = entries.docs.map(entry => ({
    params: {
      id: entry.id,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async context => {
  const {id} = context.params
  const res = await db.collection('entries').doc(id).get()
  const entry = res?.data()
  if (entry) {
    return {
      props: {
        entry: entry,
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default Post
