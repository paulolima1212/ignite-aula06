import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { api } from '../../../../lib/axios'
import { useRouter } from 'next/router'

const confirmStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please inform a name with 3 characters' }),
  email: z.string().email({ message: 'Please inform a valid email' }),
  observations: z.string().nullable(),
})

type ConfirmStepData = z.infer<typeof confirmStepSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  handleClearSelectedDateTime: () => void
}

export function ConfirmStep({
  schedulingDate,
  handleClearSelectedDateTime,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmStepData>({
    resolver: zodResolver(confirmStepSchema),
  })

  const router = useRouter()

  const username = router.query.username

  async function handleConfirmScheduling(data: ConfirmStepData) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    await router.push(`/users/${username}`)
  }

  const dateWithTime = dayjs(schedulingDate).format('DD[ of ]MMMM [ of ]YYYY')
  const schedulingTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as={'form'} onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {dateWithTime}
        </Text>
        <Text>
          <Clock />
          {schedulingTime}
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
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          onClick={handleClearSelectedDateTime}
          type='button'
          variant={'tertiary'}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting} type='submit'>
          Confirm
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
