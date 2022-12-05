import { useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

import { UserContext } from './Context'


const ProtectedRoute = ({ user, redirectPath = "" }) => {
  if (!user) {
    // return <Navigate to={redirectPath} replace />
    return <>Being refresh...</>
  }
  return <Outlet />
}
function RoutesComp() {
  const { userEmail } = useContext(UserContext)

  return (
    <>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoute user={userEmail} redirectPath={""} />}>
          <Route path='/home' element={<Home />} />
        </Route>

      </Routes>
    </>
  )
}

export default RoutesComp
