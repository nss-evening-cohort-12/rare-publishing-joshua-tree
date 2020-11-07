import React from "react"
import { Link } from "react-router-dom"

class Posts extends React.Component {
  render() {
    return (
      <>
        <h1>Posts</h1>
        <Link to="new-post">New Post</Link>
      </>
    )
  }
}

export default Posts;