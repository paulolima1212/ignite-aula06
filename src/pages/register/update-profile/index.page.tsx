import {
  Heading,
  Text,
  MultiStep,
  Button,
  TextArea,
  Avatar,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormAnnotation, ProfileBox } from './styles'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'

const formUpdateProfileSchema = z.object({
  bio: z.string(),
})

type FormUpdateProfileData = z.infer<typeof formUpdateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormUpdateProfileData>({
    resolver: zodResolver(formUpdateProfileSchema),
  })

  const { data } = useSession()
  const router = useRouter()

  async function handleFormUpdateProfileSubmit(
    dataForm: FormUpdateProfileData
  ) {
    await api.put('/users/update-profile', {
      bio: dataForm.bio,
    })

    await router.push(`/schedule/${data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Tell more about yourself</Heading>
        <Text size={'sm'}>Finally, a brief description of yourself.</Text>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox
        as={'form'}
        onSubmit={handleSubmit(handleFormUpdateProfileSubmit)}
      >
        <label>
          <Text size={'sm'}>Profile picture</Text>
          <Avatar src={data?.user.avatar_url} />
        </label>
        <label>
          <Text size={'sm'}>About you</Text>
          <TextArea {...register('bio')} />
        </label>
        <FormAnnotation size={'sm'}>
          Tell me a little more about yourself
        </FormAnnotation>
        <Button disabled={isSubmitting} type='submit'>
          Finish
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  )
  return {
    props: {
      session,
    },
  }
}
