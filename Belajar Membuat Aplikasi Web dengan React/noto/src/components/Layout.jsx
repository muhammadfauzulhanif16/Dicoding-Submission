import React from 'react'
import { Grid } from '@chakra-ui/react'

export const Layout = ({ children }) => {
  return (
    <Grid templateColumns='repeat(3, 1fr)' p={[4, 8, 12]} gap={[4, 8, 12]}>
      {children}
    </Grid>
  )
}
