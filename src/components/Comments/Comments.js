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

    this.setState({ current_user: localStorage.getItem("rare_token") })
    const { postId } = this.props.match.params;
    
    CommentsProvider.getCommentsByPostId(postId)
      .then((res) => {
        this.setState({ comments: res })
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

    const mapComment = comments.map((comment) => <Comment key={comment.id} comment={comment} deleteComment={this.deleteComment} />)
    const { postId } = this.props.match.params;    
    const newComment = `/new-comment/${postId}`;

    return (
      <div className="SinglePost">
        <div className="title_container">
        <div className="category_name">{post.category && post.category.label}</div>
          <h1>| {post.title} |</h1>
          <h4>{post.publication_date}</h4>
        </div>
        <div className="comments_container">
        <Link className="btn btn-info set_link_to_none" to={newComment}>Add Comment</Link>
          <h4>Comments:</h4>
          <div className="row">
          <div className="column">
          {mapComment}
          </div>
          </div>
 
        </div>
      </div>
    )
  }
}

export default Comments;
