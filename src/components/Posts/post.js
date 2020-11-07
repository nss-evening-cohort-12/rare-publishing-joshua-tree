import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './Posts.css';

class Post extends React.Component {

  render() {
    const { post } = this.props;
    const filterDate = moment(post.publication_date).format('MMMM Do YYYY, hh:mm:ss a');
    // if you want only month.day.year
    // moment().format('MM-DD-YYYY')
    // style="width: 18rem;"
    return (
      <div className="card">
        <image src={post.image_url} class="card-img-top" alt="post image"></image>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.full_name} .. {filterDate}</p>
          <p className="card-text">{post.category_name}</p>
          <Link className="btn btn-primary" to="/posts/new">Comment</Link>
        </div>
      </div>
    );
  }
}

export default Post;
