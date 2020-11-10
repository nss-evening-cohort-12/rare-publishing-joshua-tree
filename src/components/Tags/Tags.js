import React from "react"
import { Link } from "react-router-dom"

class Tags extends React.Component {
  state = {
    allTags: [],
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <>
        <h1>Tags</h1>
        <Link to="/new-tag">New Tag</Link>
      </>
    )
  }
}

export default Tags;