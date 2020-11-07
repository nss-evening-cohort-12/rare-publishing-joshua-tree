import React from "react"
import { Link } from "react-router-dom"

class Tags extends React.Component {
  render() {
    return (
      <>
        <h1>Tags</h1>
        <Link to="/tags/new">New Tag</Link>
      </>
    )
  }
}

export default Tags;