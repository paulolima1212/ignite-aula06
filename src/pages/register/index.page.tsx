import { Heading, Text, MultiStep, TextInput, Button } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'

const formRegisterSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'this field must have 4 characters' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'please create your username using only words',
    })
    .transform((userName) => userName.toLowerCase()),
  fullname: z
    .string()
    .min(4, { message: 'this field must have 4 characters' })
    .transform((fullname) => fullname.toLowerCase()),
})

type FormRegisterData = z.infer<typeof formRegisterSchema>

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(formRegisterSchema),
  })

  async function handleFormRegisterSubmit(data: FormRegisterData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.fullname,
      })

      await router.push('/connect-schedule')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        alert(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Welcome to Ignite Call</Heading>
        <Text size={'sm'}>
          We need some information about you to create your profile. You will be
          able to change this information after creation.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as={'form'} onSubmit={handleSubmit(handleFormRegisterSubmit)}>
        <label>
          <Text size={'sm'}>UserName:</Text>
          <TextInput
            prefix='ignite.com/'
            placeholder='your username'
            {...register('username')}
          />
          {errors.username && (
            <FormError size={'sm'}>{errors.username.message}</FormError>
          )}
        </label>
        <label>
          <Text size={'sm'}>Full name:</Text>
          <TextInput
            placeholder='Fill your full name'
            {...register('fullname')}
          />
          {errors.fullname && (
            <FormError size={'sm'}>{errors.fullname.message}</FormError>
          )}
        </label>
        <Button disabled={isSubmitting} type='submit'>
          Next step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
