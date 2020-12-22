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
    } else {
      return;
    }    
  };  

  render() {
    const { comment } = this.props;
    const filterDate = moment(comment.created_on).format('MM/DD/YYYY');
    const userId = localStorage.getItem("rare_user_id")

    const editComment = `/edit-comment/${comment.id}`;
    return (
      <div className="Comment card">
        <div className="card-body">
          <h2 className="card-title comment_sub">{comment.subject} <span className="text-muted auther_date">
          {parseInt(comment.author.user) === parseInt(userId)
          ? <>
              <div className="icon-buttons">
              <div onClick={this.deleteComment} ><i className="fas fa-trash-alt fa-2x" id={comment.id}></i></div>
              <Link to={editComment}><i className="fas fa-cog fa-2x"></i></Link>
              </div>
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
