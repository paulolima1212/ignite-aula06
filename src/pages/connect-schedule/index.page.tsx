import { Heading, Text, MultiStep, Button } from '@ignite-ui/react'
import { Container, Header } from '../register/styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectSchedule() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error

  const isAuthenticated = session.status === 'authenticated'

  async function handleConnectToCalendar() {
    await signIn('google')
  }

  function handleNextStep() {
    router.push('/register/time-intervals')
  }

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
          {isAuthenticated ? (
            <Button variant={'secondary'} size={'sm'} disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button
              variant={'secondary'}
              size={'sm'}
              onClick={handleConnectToCalendar}
            >
              Connect
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size={'sm'}>
            Need permission to access Google Calendar, confirm that you have
            authorized
          </AuthError>
        )}
        <Button onClick={handleNextStep} disabled={!isAuthenticated}>
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
