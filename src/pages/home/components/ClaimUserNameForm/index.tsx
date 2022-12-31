import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextInput, Button } from '@ignite-ui/react'

import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'

const userFormSchema = z.object({
  userName: z.string().min(1),
})

type UserFormData = z.infer<typeof userFormSchema>

export function ClaimUserNameForm() {
  const { register, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  async function handleUserFormSubmit() {}

  return (
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
  )
}
