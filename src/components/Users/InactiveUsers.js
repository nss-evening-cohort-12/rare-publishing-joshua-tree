import React, { useContext, useEffect} from "react"
import { UserContext } from "./UserProvider"
import './Users.css'


export const InactiveUserList = props => {
  const { users, getInactiveUsers, reactivateUser } = useContext(UserContext)

  useEffect(() => {
      getInactiveUsers()
  }, [])


  return (
      <div style={{ margin: "0rem 3rem"}}>
          <h1 id="profiles">User Profiles</h1>

        <div className="view-users"><button onClick={() => props.history.push("/users")}>Return to User List</button></div>

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
                                        <td className="active-status"><p>Active</p></td> :
                                        <td className="inactive-status"><p>Inactive</p></td>
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
                                    <td className="activate-button">
                                            <button onClick={() => reactivateUser(user.user) && props.history.push("/users")
                                                }>Reactivate</button>
                                    </td>
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
