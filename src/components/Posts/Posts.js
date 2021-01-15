import React from "react"
import { Link } from "react-router-dom"
import moment from 'moment'

import Post from './Post';
import PostProvider from "./PostProvider";

import './Posts.css'

class Posts extends React.Component {
  state = {
    posts: [],
    isAdmin: false,
    inputValue: ''
  }

  today = moment(new Date()).valueOf();
  newArr = [];

  getUserById = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }
    })
      .then(res => res.json())
      .then((response) => {
        if (response.user["is_staff"] === true) {
          this.setState({ isAdmin: true })
        }
      })
  }

  componentDidMount() {
    this.getUserById(localStorage.getItem("rare_user_id"))
    .then(() => {
      PostProvider.getPosts()
      .then((response) => {
        if (this.state.isAdmin === true) {
          response.forEach(element => {
            if (moment(element.publication_date).valueOf() <= this.today) {
              this.newArr.push(element)
            }
          });
        } else if (this.state.isAdmin === false) {
          response.forEach(element => {
            if (element.approved === true && moment(element.publication_date).valueOf() <= this.today) {
              this.newArr.push(element)
            }
          });
        }
      })
      .then(() => this.setState({ posts: this.newArr }))
    })
  }

  titleSearch = (e) => {
    console.log(e.target.value)
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    const { posts, isAdmin } = this.state;
    const post = posts.map((post) => <Post key={post.id} post={post} isAdmin={isAdmin} />)

    return (
      <div className="postContainer">
        <div className="header-post">
          <input type="text" placeholder="Search By Title" value={this.props.inputValue} onChange={this.props.titleSearch}></input>
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
          {isAdmin
            ? <h4 className="item-title">Approved</h4>
            : ''
          }
        </div>
          {post}
      </div>
    )
  }
}

export default Posts;
