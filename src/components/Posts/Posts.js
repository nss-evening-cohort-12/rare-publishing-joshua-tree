import React from "react"
import { Link } from "react-router-dom"
import Post from './post';

import './Posts.css'

class Posts extends React.Component {
  state = {
    posts: [],
  }
  componentDidMount() {
    fetch("http://localhost:8088/posts", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((res) => this.setState({ posts: res }))
  }
    
  render() {
    const { posts } = this.state;
    const post = posts.map((post) => <Post key={post.id} post={post} />)    
    return (
      <div className="postContainer">
        <h1>Posts</h1>
        <div className="boxes">
          {post}
        </div>
        <Link to="new-post">New Post</Link>
      </div>
    )
  }
}

export default Posts;
