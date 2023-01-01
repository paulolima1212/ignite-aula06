import {
  Heading,
  Text,
  MultiStep,
  Button,
  Checkbox,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../../register/styles'
import {
  FormError,
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from 'phosphor-react'

import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeekDays } from '../../../utils/get-week-days'

const timeIntervalFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'You need select at last one day of the week.',
    }),
})

type TimeIntervalFormData = z.infer<typeof timeIntervalFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TimeIntervalFormData>({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
    resolver: zodResolver(timeIntervalFormSchema),
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  function handleFormIntervalSubmit(data: TimeIntervalFormData) {
    console.log(data)
  }

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Almost there</Heading>
        <Text size={'sm'}>
          Define the range of times you are available on each day of the week
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>
      <IntervalBox
        as={'form'}
        onSubmit={handleSubmit(handleFormIntervalSubmit)}
      >
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type='time'
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size={'sm'}
                    type='time'
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>
        {errors.intervals && (
          <FormError size={'sm'}>{errors.intervals.message}</FormError>
        )}
        <Button>
          Next step
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
