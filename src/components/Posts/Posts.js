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

  // deletePost = (postId) => {
  //   PostProvider.deletePost(postId)
  //     .then(() => PostProvider.getPosts())
  // }
  // deletePost={this.deletePost}
    
  render() {
    const { posts } = this.state;
    const post = posts.map((post) => <Post key={post.id} post={post} />)    
    return (
      <div className="postContainer">
        <div className="header-post">
          <h1>Posts</h1>
          <Link to="new-post" className="new-post btn btn-1">New Post</Link>
        </div>
        <div className="boxes">
          {post}
        </div>
      </div>
    )
  }
}

export default Posts;
