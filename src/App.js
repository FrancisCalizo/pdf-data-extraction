import DashboardLayout from './components/DashboardLayout'

import { ThemeProvider } from '@mui/material/styles'

import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout />
    </ThemeProvider>
  )
}

export default App
