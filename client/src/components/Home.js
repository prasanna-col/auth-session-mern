import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../App"

function Home({}) {
    const userContext = useContext(UserContext)

    useEffect(()=>{
        console.log("Home")
    },[])

  return (
    <>
     Welcome {userContext.email}
    </>
  )
}

export default Home
