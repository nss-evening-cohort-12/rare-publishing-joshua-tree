import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import './Posts.css';

class Post extends React.Component {

  state = {
    category: '',
    user: ''
  }

  getCategoryById = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }
    })
      .then(res => res.json())
      .then((response) => this.setState({ category: response }))
  }

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
        this.setState({ user: response.display_name })
      })
  }

  componentDidMount() {
    const { post } = this.props;
    this.getCategoryById(post.category.id)
    this.getUserById(post.rare_user.id)
  }

  render() {
    const { post, isAdmin } = this.props;
    const { category, user } = this.state;

    const filterDate = moment(post.publication_date).format('MMMM Do YYYY');
    const view_post = `posts/${post.id}`
    // const view_comments = `comments/${post.id}`

    return (
      <div className="single-post">
          <Link to={view_post} className="post-link post-item"><h3>{post.title}</h3></Link>
          <div className="post-item"><h4>@{user}</h4></div>
          <div className="post-item"><h4>{filterDate}</h4></div>
          <div className="post-item"><h4>{category.label}</h4></div>
          <div className="post-item"><h4>{post.tags}</h4></div>
          {isAdmin
            ? <div className="post-item"><input type="checkbox" className="approved-checkbox" /></div>
            : ''
          }
      </div>
    );
  }
}

export default Post;
