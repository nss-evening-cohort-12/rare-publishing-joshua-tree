import React, { useContext, useEffect} from "react"
import { UserContext } from "./UserProvider"
import { Link } from 'react-router-dom';
import './Users.css'


export const UserList = props => {
  const { users, getUsers, deactivateUser, reactivateUser } = useContext(UserContext)

  useEffect(() => {
      getUsers()
  }, [])



  const checkUser = (id) => {
      const userId = parseInt(localStorage.getItem("rare_user_id"))
      if(userId === id) {
        alert('You cannot deactivate yourself.')
        return false
      } else {
          return true
      }
  }


  return (
      <div style={{ margin: "0rem 3rem"}}>
          <h1 id="profiles">User Profiles</h1>

        <div className="view-inactive"><button onClick={() => props.history.push("/users/inactive")}>View Deactivated</button></div>

          <article className="users">
              { 
                  users.map(user => {
                      return <section className="users" key={user.id}>
                      <div className = "userBox">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="full-name">Full Name: {user.user.first_name} {user.user.last_name}</td>
                                    <td className="display-name"><Link to={(`/users/${user.id}`)}>Display Name: {user.display_name} </Link></td>
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
                                        {user.user.is_active === true ?
                                            <button onClick={() => checkUser(user.user.id) && window.confirm('Are you sure?') && 
                                                deactivateUser(user.user) && window.location.reload()
                                                }>Deactivate</button> :
                                            <button onClick={() => reactivateUser(user.user) && window.location.reload()
                                                }>Reactivate</button>
                                        }
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
