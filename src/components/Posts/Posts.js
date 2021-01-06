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
          <div className="search-bar">Search here</div>
          <div style={{ display: "flex", alignContent: "center", paddingRight: "30px" }}>
            <Link to="new-post" className="new-post">Add Post</Link>
            <Link to="new-post" className="new-post-plus">+</Link>
          </div>
        </div>
        <div className="boxes">
          <h4 className="item-title">Title</h4>
          <h4 className="item-title">Author</h4>
          <h4 className="item-title">Date</h4>
          <h4 className="item-title">Category</h4>
          <h4 className="item-title">Tags</h4>
          <h4 className="item-title">Approved</h4>
        </div>
          {post}
      </div>
    )
  }
}

export default Posts;
