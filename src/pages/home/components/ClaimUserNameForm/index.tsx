import { TextInput, Button } from '@ignite-ui/react'

import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'

export function ClaimUserNameForm() {
  return (
    <Form as={'form'}>
      <TextInput size={'sm'} prefix='ignite.com/' placeholder='your-user' />
      <Button size={'sm'} type='submit'>
        Reserve
        <ArrowRight />
      </Button>
    </Form>
  )
}
