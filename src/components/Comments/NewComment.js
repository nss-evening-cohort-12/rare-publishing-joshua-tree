import React from "react";
import '../Posts/Posts.css';

import CommentsProvider from "./CommentsProvider";

class NewComment extends React.Component {
  state = {
    user_id: 0,
    title: '',
    content: '',
    post_id: 0,
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  saveNewComment = async (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    const user = localStorage.getItem("rare_user_id");
    const { postId } = this.props.match.params;

    const newComment = {
      user_id: user,
      subject: title,
      content,
      post_id: postId,
    };

    await CommentsProvider.addCommentToPost(newComment)    
      CommentsProvider.getCommentsByPostId(postId)
        .then(() => this.props.history.push(`/Comments/${postId}`))
  }

  render() {
    const { title, content } = this.state;

    return (
      <div className="container--login">
        <section>
          <form className="form--login">
            <h1>Add a New Comment</h1>
            <fieldset>
              <label htmlFor="postTitle">Subject</label>
              <input value={title} onChange={this.changeTitleEvent} type="text" id="postTitle" className="form-control" placeholder="Comment Title" required autoFocus />
            </fieldset>
            <fieldset>
              <label htmlFor="postContent">Content</label>
              <textarea style={{height: '200px'}} name="message" rows="200" cols="20" value={content} onChange={this.changeContentEvent} type="text" id="postContent" className="form-control" placeholder="I have one comment I like to talk about..." required autoFocus />
            </fieldset>
            <fieldset style={{ textAlign:"center" }}>
              <button className="btn btn-1" type="submit" onClick={this.saveNewComment}>Add Comment</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default NewComment;
