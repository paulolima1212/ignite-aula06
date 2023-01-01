import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextInput, Button, Text } from '@ignite-ui/react'

import { FieldError, Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const userFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'this field must have 4 characters' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'please create your username using only words',
    })
    .transform((username) => username.toLowerCase()),
})

type UserFormData = z.infer<typeof userFormSchema>

export function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  const router = useRouter()

  async function handleUserFormSubmit(data: UserFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as={'form'} onSubmit={handleSubmit(handleUserFormSubmit)}>
        <TextInput
          {...register('username')}
          size={'sm'}
          prefix='ignite.com/'
          placeholder='your-user'
        />
        <Button size={'sm'} type='submit'>
          Reserve
          <ArrowRight />
        </Button>
      </Form>
      <FieldError>
        <Text size={'sm'}>
          {errors.username ? errors.username?.message : 'Fill your user-name'}
        </Text>
      </FieldError>
    </>
  )
}
