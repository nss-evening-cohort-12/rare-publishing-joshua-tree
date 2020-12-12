import React from "react"
import { Link } from "react-router-dom"

import Post from './Post';
import PostProvider from "./PostProvider";

import './Posts.css'

class MyPosts extends React.Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    const user_id = localStorage.getItem("rare_user_id")
    PostProvider.getMyPostsById(user_id)
      .then((res) => this.setState({ posts: res }))
  }
    
  render() {
    const { posts } = this.state;
    const post = posts.map((post) => <Post key={post.id} post={post} />)    
    return (
      <div className="postContainer">
        <div className="header-post">
          <h1>My Posts</h1>
          <Link to="new-post" className="new-post btn btn-1">New Post</Link>
        </div>
        <div className="boxes">
          {post}
        </div>
      </div>
    )
  }
}

export default MyPosts;
