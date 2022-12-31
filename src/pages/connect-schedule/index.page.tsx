import { Heading, Text, MultiStep, Button } from '@ignite-ui/react'
import { Container, Header } from '../register/styles'
import { ArrowRight } from 'phosphor-react'
import { ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'

export default function ConnectSchedule() {
  const session = useSession()

  const isAuthenticated = session.status === 'authenticated'

  return (
    <Container>
      <Header>
        <Heading as={'strong'}>Connect your schedule</Heading>
        <Text size={'sm'}>
          Connect your calendar to automatically check for busy times and new
          scheduled events
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant={'secondary'}
            size={'sm'}
            onClick={() => signIn('google')}
            disabled={isAuthenticated}
          >
            {isAuthenticated ? 'Connected' : 'Connect'}
          </Button>
        </ConnectItem>
        <Button>
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
