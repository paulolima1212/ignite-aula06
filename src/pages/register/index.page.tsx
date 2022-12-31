import { Heading, Text, MultiStep, TextInput, Button } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
    .regex(/^([a-z\\-]+)$/i, {
      message: 'please create your username using only words',
    })
    .transform((fullname) => fullname.toLowerCase()),
})

type FormRegisterData = z.infer<typeof formRegisterSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterData>({
    resolver: zodResolver(formRegisterSchema),
  })

  async function handleFormRegisterSubmit(data: FormRegisterData) {
    console.log(data)
  }

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
