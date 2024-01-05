import {useState, useEffect} from 'react'
import axios from '../api/axios'

export const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(()=>{

        const getUsers = async()=>{
            try{

                const response = await axios.get('/users',{
                })
                console.log(response.data)
                setUsers(response.data)

            }catch(err){

                console.error(err)

            }
        }

        getUsers()
    }, [])

    return (
        <article>
          <h2>Users List</h2>
          <ul>
            {users.username ? (
              users.username.map((username, i) => <li key={i}>{username}</li>)
            ) : (
              <li>No users found!</li>
            )}
          </ul>
        </article>
    );
}
