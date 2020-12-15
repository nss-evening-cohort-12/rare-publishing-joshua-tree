import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
      .then((response) => this.setState({ user: response.display_name }))
  }

  componentDidMount() {
    const { post } = this.props;
    this.getCategoryById(post.category.id)
    this.getUserById(post.rare_user.id)
  }

  render() {
    const { post } = this.props;
    const { category, user } = this.state;

    // const filterDate = moment(post.publication_date).format('MMMM Do YYYY');
    const view_post = `posts/${post.id}`
    const view_comments = `comments/${post.id}`

    return (
      <div className="card">
        <div className="card-body">
          <Link to={view_post}><h3 className="card-title">{post.title}</h3></Link>
          <p className="card-text"><strong>Author: </strong> {user}</p>
          <p className="card-text" style={{ fontSize: ".9em" }}><strong>Category: </strong> {category.label}</p>
          <Link className="btn btn-primary post_comment" to={view_comments}>{post.total_comments} Comments</Link>
        </div>
      </div>
    );
  }
}

export default Post;
