import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Comment.css';

class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    // const filterDate = moment(comment.creation_date).format('MM/DD/YYYY, hh:mm a');
    const filterDate = moment(comment.creation_date).fromNow();
    // const view_post = `posts/${post.id}`
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

/*
      <div className="Comment card">
        <h2>INSIDE Comment COMPONENT</h2>
        <button className="btn btn-info">I am a button</button>
        <div className="card-body">
          <Link to={view_post}><h5 className="card-title">{comment.subject}</h5></Link>
          <p className="card-text">{post.full_name} .. {filterDate}</p>
          <p className="card-text">{post.category_name}</p>
          <Link className="btn btn-primary" to="new-post">Comment</Link>
        </div>
      </div>
*/
