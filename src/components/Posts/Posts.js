import React from "react"
import { Link } from "react-router-dom"

import Post from './Post';
import PostProvider from "./PostProvider";

import './Posts.css'

class Posts extends React.Component {
  state = {
    posts: [],
  }
  componentDidMount() {
    PostProvider.getPosts()
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
