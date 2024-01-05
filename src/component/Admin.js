import React from 'react'
import {Users} from '../component/Users'
export const Admin = () => {
  return (
    <section>
        <h1>Admin page</h1>
        <br/>
        <Users />
        <br/>
        <div >
        <a href='/home'>Home</a>
        </div>
    </section>
  )
}
