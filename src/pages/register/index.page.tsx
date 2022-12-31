import { Heading, Text, MultiStep, TextInput, Button } from '@ignite-ui/react'
import { Container, Form, Header } from './styles'
import { ArrowRight } from 'phosphor-react'

export default function Register() {
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
      <Form as={'form'}>
        <label>
          <Text size={'sm'}>UserName:</Text>
          <TextInput prefix='ignite.com/' placeholder='your username' />
        </label>
        <label>
          <Text size={'sm'}>Full name:</Text>
          <TextInput placeholder='Fill your full name' />
        </label>
        <Button type='submit'>
          Next step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
