import { useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

import { UserContext } from './App'

const ProtectedRoute = ({ user, redirectPath = "" }) => {
  console.log("user data", user)
  if (!user) {
    // return <Navigate to={redirectPath} replace />
    return <>Being refresh...</>
  }
  return <Outlet />
}
function RoutesComp() {
  const userContext = useContext(UserContext)
  return (
    <>
      <Routes>
        {/* {userContext?.email && (
          <Route path='/home' element={<Home />} />
        )}
        {!userContext?.email && (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )} */}

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoute user={userContext?.email} />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default RoutesComp
