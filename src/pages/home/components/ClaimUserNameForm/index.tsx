import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextInput, Button, Text } from '@ignite-ui/react'

import { FieldError, Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'

const userFormSchema = z.object({
  userName: z
    .string()
    .min(4, { message: 'this field must have 4 characters' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'please create your username using only words',
    })
    .transform((userName) => userName.toLowerCase()),
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

  async function handleUserFormSubmit(data: UserFormData) {}

  return (
    <>
      <Form as={'form'} onSubmit={handleSubmit(handleUserFormSubmit)}>
        <TextInput
          {...register('userName')}
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
          {errors.userName ? errors.userName?.message : 'Fill your user-name'}
        </Text>
      </FieldError>
    </>
  )
}
