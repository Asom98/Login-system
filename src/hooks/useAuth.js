import { useContext } from 'react'
import AuthContext from '../context/authProvider'



const UseAuth = () => {
  return useContext(AuthContext)
}

export default UseAuth
