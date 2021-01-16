import React, { useState } from "react"

export const SubscriptionContext = React.createContext()


export const SubscriptionProvider = (props) => {
    const [subscriptions, setSubscriptions] = useState([])
    const [posts, setPosts] = useState([])

    const getSubscriptions = () => {
        return fetch("http://localhost:8000/subscriptions", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }            
        })
            .then(res => res.json())
            .then(setSubscriptions)
    }


    const getMySubscriptions = (id) => {
      return fetch(`http://localhost:8000/subscriptions?follower_id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
          }
      })
          .then(res => res.json())
          .then(setSubscriptions)
          .then(() => {
            const authorIds = subscriptions.map(subscription => subscription.author_id.id).join()
            fetch(`http://localhost:8000/posts?user_id=${authorIds}`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
              }
            })
            .then(res => res.json())
            .then(setPosts)
          })
  }

    return (
      <SubscriptionContext.Provider value={{
          subscriptions, posts, getSubscriptions, getMySubscriptions
      }}>
          {props.children}
      </SubscriptionContext.Provider>
  )
}
