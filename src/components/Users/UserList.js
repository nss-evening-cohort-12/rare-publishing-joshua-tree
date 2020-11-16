import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import './Users.css'


export const UserList = props => {
  const { users, getUsers } = useContext(UserContext)

  useEffect(() => {
      getUsers()
  }, [])

  return (
      <div style={{ margin: "0rem 3rem"}}>
          <h1>User Profiles</h1>


          <article className="users">
              {
                  users.map(user => {
                      return <section className="users" key={user.id}>
                      <div className = "userBox">
                          <h3>Full Name: {user.first_name} {user.last_name}</h3>
                          <h3>Display Name: {user.display_name}</h3>
                          <h3>User Type: Admin</h3>
                      </div>
                      </section>
                  })
              }
          </article>
      </div>
  )
}
