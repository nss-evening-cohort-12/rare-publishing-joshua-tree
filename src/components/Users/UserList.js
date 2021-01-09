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
          <h1 id="profiles">User Profiles</h1>


          <article className="users">
              {
                  users.map(user => {
                      return <section className="users" key={user.id}>
                      <div className = "userBox">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="full-name">Full Name: {user.user.first_name} {user.user.last_name}</td>
                                    <td className="display-name">Display Name: {user.display_name}</td>
                                    {user.user.is_active === true ? 
                                        <td className="active-status"><input type="checkbox" id="active" name="active" defaultChecked />
                                        <label htmlFor="active"> Active</label></td> :
                                        <td className="active-status"><input type="checkbox" id="active" name="active" />
                                        <label htmlFor="active"> Active</label></td>
                                    }
                                    {user.user.is_staff === true ? 
                                        <td className="user-status"><div className="radio-buttons">
                                            <input type="radio" className="input" id="author" name={user.id} value="author"/>
                                            <label htmlFor="author"> Author</label>
                                            <input type="radio" className="input" id="admin" name={user.id} value="admin" defaultChecked/>
                                            <label htmlFor="admin"> Admin</label>
                                        </div></td> :
                                        <td className="user-status"><div className="radio-buttons">
                                            <input type="radio" className="input" id="author" name={user.id} value="author" defaultChecked/>
                                            <label htmlFor="author"> Author</label>
                                            <input type="radio" className="input" id="admin" name={user.id} value="admin"/>
                                            <label htmlFor="admin"> Admin</label>
                                        </div></td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                      </div>
                      </section>
                  })
              }
          </article>
      </div>
  )
}
