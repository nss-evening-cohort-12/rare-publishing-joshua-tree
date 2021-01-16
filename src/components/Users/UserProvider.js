import React, { useState } from "react"

export const UserContext = React.createContext()


export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }  
        })
            .then(res => res.json())
            .then(setUsers)
    }
    
    const getInactiveUsers = () => {
        return fetch("http://localhost:8000/users?is_active=False", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }  
        })
            .then(res => res.json())
            .then(setUsers)
    }

    //stretch goal to refactor this later into one toggle function

    const deactivateUser = (authUserObj) => new Promise((resolve, reject) => {
        authUserObj.is_active = false
        fetch(`http://localhost:8000/authusers/${authUserObj.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("rare_token")}`
          },
          body: JSON.stringify(authUserObj)
        })
        .then(() => resolve())
        .catch((err) => reject(err));
      });

      const reactivateUser = (authUserObj) => new Promise((resolve, reject) => {
        authUserObj.is_active = true
        fetch(`http://localhost:8000/authusers/${authUserObj.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("rare_token")}`
          },
          body: JSON.stringify(authUserObj)
        })
        .then(() => resolve())
        .catch((err) => reject(err));
      });


      const autherUser = (authUserObj) => new Promise((resolve, reject) => {
        authUserObj.is_staff = false
        fetch(`http://localhost:8000/authusers/${authUserObj.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("rare_token")}`
          },
          body: JSON.stringify(authUserObj)
        })
        .then(() => resolve())
        .catch((err) => reject(err));
      });

      const adminUser = (authUserObj) => new Promise((resolve, reject) => {
        authUserObj.is_staff = true
        fetch(`http://localhost:8000/authusers/${authUserObj.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("rare_token")}`
          },
          body: JSON.stringify(authUserObj)
        })
        .then(() => resolve())
        .catch((err) => reject(err));
      });      

      const getUserById = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
          }
        })
          .then(res => res.json())    
      }

    return (
      <UserContext.Provider value={{
          users, getUsers, deactivateUser, reactivateUser, getUserById, getInactiveUsers, autherUser, adminUser
      }}>
          {props.children}
      </UserContext.Provider>
  )
}
