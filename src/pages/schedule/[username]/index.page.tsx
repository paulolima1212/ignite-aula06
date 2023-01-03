import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticProps, GetStaticPaths } from 'next'
import { prisma } from '../../../lib/prisma'
import { ScheduleForm } from './ScheduleForm'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatar_url: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default function UserProfileSchedule({ user }: ScheduleProps) {
  console.log(user.avatar_url)
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatar_url} />
        <Heading>{user.name}</Heading>
        <Text size={'sm'}>{user.bio}</Text>
      </UserHeader>
      <ScheduleForm />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
      },
    },

    revalidate: 60 * 60 * 24,
  }
}
