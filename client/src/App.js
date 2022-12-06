import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import Routes from './Routes'
import { useNavigate } from "react-router-dom";

import { UserContextProvider } from './Context'

function App() {
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState("")


  const ContextValues = {
    userSession, setUserSession,
    userEmail, setUserEmail,
    userId, setUserId
  }

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/isAuth')
        if (!res.ok) {
          localStorage.clear();
          navigate('/');
          return setLoading(false)
        }

        setUserSession(await res.json())
        setUserEmail(localStorage.getItem('loggedEmail'))
        setUserId(localStorage.getItem('loggedUserId'))
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
