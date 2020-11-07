import React from "react";
import './Posts.css';

class SinglePost extends React.Component {
  state = {
    post: {},
    user: {},
    category: {},
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    
    fetch(`http://localhost:8088/posts/${postId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then((post_response) => post_response.json())
    .then((post_res) => this.setState({ post: post_res }))
    .then(() => this.setState({ user: this.state.post.user }))
    .then(() => this.setState({ category: this.state.post.category }))
  }

  render() {
    const { post, category, user } = this.state;
    const name = user.display_name;

    return (
      <div className="SinglePost">
        {post.image_url !== ''
          ? <div className="image_container">
              <img alt={category.category_name} src={post.image_url} className="post_image"/>
            </div>
          : ''
        }
        <div className="title_container">
          <div className="category_name">{category.category_name}</div>
          <h1>| {post.title} |</h1>
          <h4>{post.publication_date}</h4>
        </div>
        <p>{post.content}</p>
        <div className="user_icon">Written by <span style={{textDecoration: 'underline'}}>{name}</span></div>
      </div>
    )
  }
}

export default SinglePost;