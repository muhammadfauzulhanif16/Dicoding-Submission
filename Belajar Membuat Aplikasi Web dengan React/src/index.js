import { App } from './App'
import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
    <ColorModeScript />

    <App />
  </StrictMode>
)
