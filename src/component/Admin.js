import React from 'react'
import {Users} from '../component/Users'
import { Link } from 'react-router-dom'
export const Admin = () => {
  return (
    <section>
        <h1>Admin page</h1>
        <br/>
        <Users />
        <br/>
        <div >
            <Link to="/">Home </Link>
        </div>
    </section>
  )
}
