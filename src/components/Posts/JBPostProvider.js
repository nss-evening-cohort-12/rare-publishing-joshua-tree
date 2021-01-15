import React, { useState } from "react"

export const PostContext = React.createContext()


export const JBPostProvider = (props) => {
    const [posts, setPosts] = useState([])


      const getAuthorPostsById = (id) => {
        return fetch(`http://localhost:8000/posts?user_id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
          }
        })
        .then(res => res.json())
        .then(setPosts)
    }

    return (
      <PostContext.Provider value={{
          posts, getAuthorPostsById
      }}>
          {props.children}
      </PostContext.Provider>
  )
}
