import React from 'react';
import { Link } from 'react-router-dom';

import PostProvider from '../Posts/PostProvider';
import CommentsProvider from './CommentsProvider';

import Comment from './Comment';

import './Comments.css';

class Comments extends React.Component {
  state = {
    post: {},
    current_user: '',
    comments: [],
  }

  componentDidMount() {
    this.getAllComments()

    this.setState({ current_user: localStorage.getItem("rare_user_id") })
    const { postId } = this.props.match.params;
    
    CommentsProvider.getCommentsByPostId(postId)
      .then((res) => {
        this.setState({ comments: res })
        console.warn(res)
      })

    PostProvider.getPostsById(postId)
      .then((response) => this.setState({ post: response }))
      // .then((response) => this.setState({ post: response, current_tags: response.tags, comments: response.comments }))
  }

  getAllComments = () => {
    const { postId } = this.props.match.params;
    CommentsProvider.getCommentsByPostId(postId)
      .then((response) => this.setState({ comments: response }))
  }

  deleteComment = (commentId) => {
    CommentsProvider.deleteComment(commentId)
      .then(() => this.getAllComments())
  }

  render() {
    const { post, comments } = this.state;

    console.warn(comments)
    const comment = comments.map((comment) => <Comment key={comments.id} comment={comment} deleteComment={this.deleteComment} />)
    const { postId } = this.props.match.params;    
    const newComment = `/new-comment/${postId}`;

    return (
      <div className="SinglePost">

        <div className="title_container">
          <div className="category_name">{post.category_name}</div>
          <h1>| {post.title} |</h1>
          <h4>{post.publication_date}</h4>
        </div>
        <div className="user_icon">Written by <span style={{fontWeight: 'bold'}}>{post.author}</span></div>
        <div className="comments_container">
          <h4>Comments:</h4>
            {/* <button className="btn btn-1" type="submit" onClick={this.saveNewComment}>Add</button> */}

          <Link className="btn btn-info" to={newComment}>Add Comment</Link>
          {comment}
        </div>
      </div>
    )
  }
}

export default Comments;
