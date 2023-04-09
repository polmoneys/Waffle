import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
