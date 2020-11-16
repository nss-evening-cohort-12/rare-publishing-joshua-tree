import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Comments.css';

class Comment extends React.Component {

  deleteComment = (e) => {
    e.preventDefault();
    const deleteCurrentComment = this.props.deleteComment;
    let confirmation = window.confirm("Are you sure you want to delete this comment?");

    if (confirmation) {
      deleteCurrentComment(e.target.id);
      console.warn(e.target.id)
    } else {
      return;
    }    
  };  

  render() {
    const { comment } = this.props;
    const filterDate = moment(comment.creation_date).format('MM/DD/YYYY');
    // const filterDate = moment(comment.creation_date).fromNow();
    const userId = localStorage.getItem("rare_user_id")
    const editComment = `/edit-comment/${comment.id}`;
    return (
      <div className="Comment card">
        <div className="card-body">
          <h2 className="card-title comment_sub">{comment.subject} <span className="text-muted auther_date">
          {comment.user_id === parseInt(userId)
          ? <>
              <button className="btn btn delete-comment" onClick={this.deleteComment} id={comment.id}>Delete</button>
              <Link className="btn btn-info set_link_to_none edit-comment" to={editComment}>Edit</Link>
            </>
          : ''
          }</span></h2>
          <p className="card-text">{comment.content} ..</p>
          <p className="card-text"></p>
          <h4 className="card-title">{comment.author} <span className="text-muted auther_date">{filterDate}</span></h4>
          {/* <p className="card-text">{comment.subject} .. {filterDate}</p>
          <Link className="btn btn-primary" to="new-post">Comment</Link> */}
          <hr />
        </div>
      </div>
    );
  }
}

export default Comment;
