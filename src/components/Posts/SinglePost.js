import React from "react";
import { Link } from 'react-router-dom';
import moment from 'moment';

import PostProvider from './PostProvider';
import TagProvider from '../Tags/TagProvider';

import './Posts.css';

class SinglePost extends React.Component {
  state = {
    post: {},
    all_tags: [],
    manage_tags: false,
    current_tags: [],
    current_user: '',
    total_comments: 0,
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.setState({ current_user: localStorage.getItem("rare_token") })
    
    PostProvider.getPostsById(postId)
      .then((response) => this.setState({ post: response, current_tags: response.tags, total_comments: response.total_comments }))
      .then(() => {
        this.setState(prevState => ({
          post: {
            ...prevState.post,
            publication_date: this.state.post.publication_date.split(' ')[0]
          }
        }))
      })
    //TagProvider.getTags()
      //.then((response) => this.setState({ all_tags: response }))
  }

  deletePost = (postId) => {
    PostProvider.deletePost(postId)
      .then(() => this.props.history.push("/posts"))
  }

  manageTags = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      manage_tags: !prevState.manage_tags
    }));
  }

  selectNewTag = (e) => {
    e.preventDefault();
    const element = document.getElementById(e.target.id);

    element.classList.toggle('current_manage_tags');
    element.classList.toggle('all_manage_tags');
  }

  saveNewTags = async (e) => {
    e.preventDefault();
    const { postId } = this.props.match.params;
    const tagsToSave = [];
    const container = document.getElementsByClassName('current_manage_tags');
    
    for (let i = 0; i < container.length; i++) {
      const tagId = container[i].id;
      TagProvider.getTagById(tagId)
        .then((response) => {
          tagsToSave.push(response);
        })
    }

    await PostProvider.deletePostTags(postId)
    this.setState({ current_tags: tagsToSave });
    this.postNewTags();
  }

  postNewTags = () => {
    const { postId } = this.props.match.params;
    const { current_tags } = this.state;
    
    if (current_tags.length < 1) {
      PostProvider.getPostsById(postId)
        .then((response) => this.setState({ post: response, current_tags: response.tags, manage_tags: false }))
    } else {
        current_tags.forEach((item) => {
          TagProvider.getTagById(item.id)
            .then((response) => {
              const newPostTag = {
                post_id: postId,
                tag_id: response.id 
              }
              TagProvider.addTagToPost(newPostTag)
            })
            .then(() => {
              PostProvider.getPostsById(postId)
                .then((response) => this.setState({ post: response, current_tags: response.tags, manage_tags: false }))
            })
        })
      }
  }

  render() {
    const { post, current_user, current_tags, all_tags, manage_tags, total_comments } = this.state;
    const { postId } = this.props.match.params;
    const viewComments = `/comments/${postId}`;
    // const currentTags = current_tags.map((tag) => 
      //<div
        //className="tags"
        //key={tag.id}
      //>{tag.name}
      //</div>
    //);

    //const allManageTags = all_tags.map((tag) =>
      //<div
        //className={current_tags.some(curr => curr.id === tag.id) ? 'current_manage_tags' : 'all_manage_tags'}
        //key={tag.id}
        //id={tag.id}
        //onClick={this.selectNewTag}
      //>{tag.name}
      //</div>
    //);

    return (
      <div className="SinglePost">
        {post.image_url !== ''
          ? <div className="image_container">
              <img alt={post.category_name} src={post.image_url} className="post_image"/>
            </div>
          : ''
        }
        <div className="title_container">
          <div className="category_name">{post.category && post.category.label}</div>
          <h1>| {post.title} |</h1>
          <h4>{moment(post.publication_date).format('MMMM Do YYYY')}</h4>
        </div>
        <p className="post_content">{post.content}</p>
        <div className="user_icon">Written by <span style={{fontWeight: 'bold'}}>{post.author}</span></div>
        <div><Link className="tag_container post_comment" to={viewComments}>{total_comments} Comments</Link></div>
        {/*<div className="tag_container">
          {currentTags}
        </div>*/}
        <div className="footer-container">
          <div>
            {post.user_id === parseInt(current_user) && manage_tags === false
              ? <p className="manage_tags" onClick={this.manageTags}>Manage Tags</p> 
              : ''
            }
            {manage_tags === true
              ? <>
                  <p className="exit_tags" onClick={this.manageTags}>Exit</p>
                  {/*<div className="manage_container">
                      {allManageTags}
                  </div>*/}
                  <button className="save_tags btn btn-1" onClick={this.saveNewTags}>Save</button>
                </>
              : ''
            }
          </div>
          <div>
            {post.user_id === parseInt(current_user)
              ? <><div className="delete-container"><button onClick={() => window.confirm('Are you sure?') &&
              this.deletePost(post.id)} className="btn btn-1 delete-post">Delete Post</button></div>
              <div className="edit-container"><Link to={`/edit-post/${post.id}`}>
                <button className="btn btn-1 edit-post">Edit</button></Link></div></>
              : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

export default SinglePost;
