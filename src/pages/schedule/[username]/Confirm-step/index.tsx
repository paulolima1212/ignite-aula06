import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

const confirmStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please inform a name with 3 characters' }),
  email: z.string().email({ message: 'Please inform a valid email' }),
  observation: z.string().nullable(),
})

type ConfirmStepData = z.infer<typeof confirmStepSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmStepData>({
    resolver: zodResolver(confirmStepSchema),
  })

  function handleConfirmScheduling(data: ConfirmStepData) {
    console.log(data)
  }

  return (
    <ConfirmForm as={'form'} onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 September 2023
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size={'sm'}>Name</Text>
        <TextInput placeholder='Your name' {...register('name')} />
        {errors.name && (
          <FormError size={'sm'}>{errors.name.message}</FormError>
        )}
      </label>
      <label>
        <Text size={'sm'}>Email address</Text>
        <TextInput placeholder='johndoe@example.com' {...register('email')} />
        {errors.email && (
          <FormError size={'sm'}>{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size={'sm'}>Observation</Text>
        <TextArea {...register('observation')} />
      </label>

      <FormActions>
        <Button type='button' variant={'tertiary'}>
          Cancel
        </Button>
        <Button disabled={isSubmitting} type='submit'>
          Confirm
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
