import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import Routes from './Routes'
import { useNavigate } from "react-router-dom";

import { UserContextProvider } from './Context'

function App() {
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState(true)
  const [userEmail, setUserEmail] = useState(true)

  const ContextValues = {
    userSession, setUserSession,
    userEmail, setUserEmail
  }

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/isAuth')
        if (!res.ok) {
          console.log("res", res)
          navigate('/');
          return setLoading(false)
        }

        setUserSession(await res.json())
        await console.log("userSession", userSession)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUserAuth()
  }, [])

  return (
    <UserContextProvider value={ContextValues}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? <>loading...</> : <Routes />}
      </ThemeProvider>
    </UserContextProvider>
  )
}

export default App
