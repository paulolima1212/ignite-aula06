import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'

import previewImg from '../../assets/preview.png'
import Image from 'next/image'
import { ClaimUserNameForm } from './components/ClaimUserNameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title='Simple Scheduling by Ignite'
        description='A web page by Ignite'
      />
      <Container>
        <Hero>
          <Heading as='h1' size={'4xl'}>
            Uncomplicated Scheduling
          </Heading>
          <Text size={'xl'}>
            connect your calendar and let people schedule meetings in their
            spare time
          </Text>
          <ClaimUserNameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImg}
            alt='schedule about application'
            width={827}
            height={442}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
