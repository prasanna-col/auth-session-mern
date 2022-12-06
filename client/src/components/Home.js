import React, { useContext } from 'react'
import { UserContext } from "../Context"
import {
  Stack,
  Button,
} from '@mui/material'

import { useNavigate } from "react-router-dom";
function Home() {

  let navigate = useNavigate();

  const { userEmail, userId } = useContext(UserContext)

  const on_logout = async () => {
    const res = await fetch('/api/logout', { method: 'DELETE' })
    if (!res.ok) {
      alert("Err occured in logout");
      return
    }
    localStorage.clear();
    navigate('/');
  }

  return (
    <div style={{ marginLeft: 30, marginTop: 30 }}>
      <h2>Welcome {userEmail}</h2>
      <h3>userID: {userId}</h3>
      <Stack spacing={1} direction="row">
        <Button variant="contained" onClick={() => { on_logout() }}>Logout</Button>
      </Stack>
    </div>
  )
}

export default Home
