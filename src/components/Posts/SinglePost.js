import React from "react";
import './Posts.css';

import PostProvider from './PostProvider';
import TagProvider from '../Tags/TagProvider';

class SinglePost extends React.Component {
  state = {
    post: {},
    current_tags: [],
    all_tags: [],
    current_user: '',
    manage_tags: false,
    readyToSave: [],
  }

  componentDidMount() {
    this.setState({ current_user: localStorage.getItem("rare_user_id") })
    const { postId } = this.props.match.params;
    
    PostProvider.getPostsById(postId)
      .then((response) => this.setState({ post: response, current_tags: response.tags }))
    
    TagProvider.getTags()
      .then((response) => this.setState({ all_tags: response }))
  }

  deletePost = (postId) => {
    PostProvider.deletePost(postId)
      .then(() => this.props.history.push("/posts"))
  }


  manageTags = (e) => {
    e.preventDefault();
    const { manage_tags } = this.state;

    if (manage_tags) {
      this.setState({ manage_tags: false })
    } else {
      this.setState({ manage_tags: true })
    }
  }

  selectNewTag = (e) => {
    e.preventDefault();
    const newId = e.target.id;
    const { current_tags } = this.state;

    TagProvider.getTagById(newId)
      .then((response) => {
        let existing = current_tags.filter(tag => {
          return tag.id === response.id;
        })
        if (existing.length < 1) {
          return [this.setState(prevState => ({
            readyToSave: [...prevState.readyToSave, response],
            current_tags: [...prevState.current_tags, response]
          })),
          document.getElementById(newId).style.backgroundColor = '#404040',
          document.getElementById(newId).style.color = '#fff'];
        } else {
          console.warn('Already in use!')
        }
      })
  }

  saveNewTags = (e) => {
    e.preventDefault();
    const { readyToSave } = this.state;
    const { postId } = this.props.match.params;
    
    readyToSave.forEach((item) => {
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
            .then((response) => this.setState({ post: response, current_tags: response.tags, manage_tags: false, readyToSave: [] }))
        })
    })
  }

  render() {
    const { post, current_user, current_tags, all_tags, manage_tags } = this.state;

    const currentTags = current_tags.map((tag) => 
      <div
        className="tags"
        key={tag.id}
      >{tag.name}
      </div>
    );

    const allManageTags = all_tags.map((tag) =>
      <div
        className={current_tags.some(curr => curr.id === tag.id) ? 'current_manage_tags' : 'all_manage_tags'}
        key={tag.id}
        id={tag.id}
        onClick={this.selectNewTag}
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
          {currentTags}
        </div>
        {post.user_id === parseInt(current_user) && manage_tags === false
          ? <p className="manage_tags" onClick={this.manageTags}>Manage Tags</p> 
          : ''
        }
        {manage_tags === true
          ? <>
              <p className="exit_tags" onClick={this.manageTags}>Exit</p>
              <div className="manage_container">
                  {allManageTags}
              </div>
              <button className="save_tags btn btn-1" onClick={this.saveNewTags}>Save</button>
            </>
          : ''
        }
        {post.user_id === parseInt(current_user)
          ? <div className="delete-container"><button onClick={() => window.confirm('Are you sure?') &&
          this.deletePost(post.id)}>Delete</button></div>
          : ''
        }
      </div>
    )
  }
}

export default SinglePost;