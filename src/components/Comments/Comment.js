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
      // console.warn(e.target.id)
    } else {
      return;
    }    
  };  

  render() {
    const { comment } = this.props;
    const filterDate = moment(comment.created_on).format('MM/DD/YYYY');
    const userId = localStorage.getItem("rare_user_id")
    // console.warn(userId)
    const editComment = `/edit-comment/${comment.id}`;
    return (
      <div className="Comment card">
        <div className="card-body">
          <h2 className="card-title comment_sub">{comment.subject} <span className="text-muted auther_date">
          {console.warn(comment.author.id)}
          {console.warn(userId)}
          {comment.user_id === parseInt(userId)
          ? <>
              <button className="btn btn delete-comment" onClick={this.deleteComment} id={comment.id}>Delete</button>
              <Link className="btn btn-info set_link_to_none edit-comment" to={editComment}>Edit</Link>
            </>
          : ''
          }</span></h2>
          <p className="card-text">{comment.content}</p>
          <p className="card-text"></p>
          <h4 className="card-title">{comment.author && comment.author.display_name} <span className="text-muted auther_date">{filterDate}</span></h4>
          <hr />
        </div>
      </div>
    );
  }
}

export default Comment;
