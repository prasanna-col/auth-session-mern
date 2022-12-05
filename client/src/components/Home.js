import React, { useContext } from 'react'
import { UserContext } from "../Context"

function Home() {

  const { userEmail } = useContext(UserContext)

  return (
    <>
      Welcome {userEmail}
    </>
  )
}

export default Home
