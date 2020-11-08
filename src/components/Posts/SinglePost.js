import React from "react";
import './Posts.css';

import PostProvider from './PostProvider';

class SinglePost extends React.Component {
  state = {
    post: {},
    tags: [],
    current_user: '',
  }

  componentDidMount() {
    this.setState({ current_user: localStorage.getItem("rare_user_id") })
    const { postId } = this.props.match.params;
    
    PostProvider.getPostsById(postId)
      .then((response) => this.setState({ post: response, tags: response.tags }))
  }

  render() {
    const { post, current_user, tags } = this.state;

    const allTags = tags.map((tag) => 
      <div
        className="tags"
        key={tag.id}
      >{tag.name}
      </div>
    );

    return (
      <div className="SinglePost">
        {post.image_url !== ''
          ? <div className="image_container">
              <img alt={post.category_name} src={post.image_url} className="post_image"/>
            </div>
          : ''
        }
        <div className="title_container">
          <div className="category_name">{post.category_name}</div>
          <h1>| {post.title} |</h1>
          <h4>{post.publication_date}</h4>
        </div>
        <p className="post_content">{post.content}</p>
        <div className="user_icon">Written by <span style={{fontWeight: 'bold'}}>{post.author}</span></div>
        <div className="tag_container">
          {allTags}
          {post.user_id === parseInt(current_user)
            ? <p className="manage_tags">Manage Tags</p>
            : ''
          }
        </div>
      </div>
    )
  }
}

export default SinglePost;