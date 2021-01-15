import React, { useState } from "react"

export const SubscriptionContext = React.createContext()


export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])

    const getSubscriptions = () => {
        return fetch("http://localhost:8000/subscriptions", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }            
        })
            .then(res => res.json())
            .then(setSubscriptions)
    }

    const getMySubscriptions = (id) => new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/subscriptions?follower_id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
      })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err));
    });

    return (
      <SubscriptionContext.Provider value={{
          subscriptions, getSubscriptions, getMySubscriptions 
      }}>
          {props.children}
      </SubscriptionContext.Provider>
  )
}
