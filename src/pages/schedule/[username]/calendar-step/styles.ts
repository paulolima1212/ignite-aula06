import { Box, styled } from '@ignite-ui/react'
import { Repeat } from 'phosphor-react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  width: 540,
  gridTemplateColumns: '1fr',
})
