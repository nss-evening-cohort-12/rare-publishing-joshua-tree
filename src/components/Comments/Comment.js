import React from 'react';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import './Comments.css';

class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    const filterDate = moment(comment.creation_date).format('MM/DD/YYYY');
    // const filterDate = moment(comment.creation_date).fromNow();
    return (
      <div className="Comment card">
        <div className="card-body">
          <h4 className="card-title">{comment.author} <span className="text-muted auther_date">{filterDate}</span></h4>
          <p className="card-text">{comment.content} ..</p>
          <p className="card-text"></p>
          {/* <p className="card-text">{comment.subject} .. {filterDate}</p>
          <Link className="btn btn-primary" to="new-post">Comment</Link> */}
        </div>
      </div>
    );
  }
}

export default Comment;
