import useContext from 'react'
import AuthContext from '../context/authProvider'



export const UseAuth = () => {
  return useContext(AuthContext)
}

export default UseAuth
