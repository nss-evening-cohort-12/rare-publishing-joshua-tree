import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

import './Posts.css';
import PostProvider from './PostProvider';

class Post extends React.Component {

  state = {
    category: '',
    user: '',
    tags: []
  }

  componentDidMount() {
    const { post } = this.props;
    this.getCategoryById(post.category.id)
    this.getUserById(post.rare_user.id)
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

  updateApproval = () => {
    const { post } = this.props;
    const isChecked = document.getElementById(`checkbox--${post.id}`).checked;
    const postTags = [];

    post.tags.forEach((tag) => {
      postTags.push(tag.id)
    })

    const updatedPost = {
      rare_user: post.rare_user['id'],
      title: post.title,
      content: post.content,
      category: post.category['id'],
      image_url: post.image_url,
      approved: isChecked,
      publication_date: post.publication_date,
      tags: postTags
    }

    PostProvider.updatePost(post.id, updatedPost)
      .catch((err) => console.error('There was an error approving this post -> ', err))
  }

  render() {
    const { post, isAdmin } = this.props;
    const { category, user } = this.state;

    let tag = ""

    const allTags = post.tags;

    if (allTags) {
      tag = allTags.map((tag) => 
      <div
        className=""
        id={tag.id}
        key={tag.id}
      >{tag.label}
      </div>);
    }
    

    const filterDate = moment(post.publication_date).format('MMMM Do YYYY');
    const view_post = `posts/${post.id}`
    // const view_comments = `comments/${post.id}`

    return (
      <div className="single-post">
          <Link to={view_post} className="post-link post-item"><h3>{post.title}</h3></Link>
          <div className="post-item"><h4>@{user}</h4></div>
          <div className="post-item"><h4>{filterDate}</h4></div>
          <div className="post-item"><h4>{category.label}</h4></div>
          <div className="post-item"><h4>{tag}</h4></div>
          {isAdmin
            ? <div className="post-item"><input 
                onChange={this.updateApproval}
                id={`checkbox--${post.id}`}
                type="checkbox"
                className="approved-checkbox"
                defaultChecked={post.approved} />
              </div>
            : ''
          }
      </div>
    );
  }
}

export default Post;
