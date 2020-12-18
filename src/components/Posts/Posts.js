import React from "react"
import { Link } from "react-router-dom"
import moment from 'moment'

import Post from './Post';
import PostProvider from "./PostProvider";

import './Posts.css'

class Posts extends React.Component {
  state = {
    posts: [],
  }

  today = moment(new Date()).valueOf();
  newArr = [];

  componentDidMount() {
    PostProvider.getPosts()
      .then((response) => {
        response.forEach(element => {
          if (element.approved === true && moment(element.publication_date).valueOf() <= this.today) {
            this.newArr.push(element)
          }
        });
      })
      .then(() => this.setState({ posts: this.newArr }))
  }

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
