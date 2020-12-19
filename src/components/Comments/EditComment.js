import React from "react";
import '../Posts/Posts.css';

import CommentsProvider from "./CommentsProvider";

class EditComment extends React.Component {
  state = {
    comment: {},
    title: '',
    content: '',    
  }

  componentDidMount() {
    const { commentId } = this.props.match.params;
    CommentsProvider.getCommentById(commentId)
      .then((response) => {
        this.setState({ comment: response })
        this.setState ({ title: response.subject, content: response.content })
      })
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

  saveEditComment = async (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    // const user = localStorage.getItem("rare_user_id");
    // const { postId } = this.props.match.params;
    const { comment } = this.state;
    const { commentId } = this.props.match.params;

    const editComment = {
      user_id: comment.user_id,
      subject: title,
      content,
      post_id: comment.post_id,
      creation_date: comment.creation_date,
    };

    await CommentsProvider.updateComment(commentId, editComment)    
      CommentsProvider.getCommentsByPostId(comment.post_id)
        .then(() => this.props.history.push(`/Comments/${comment.post_id}`))
  }

  render() {
    const { title, content } = this.state;

    return (
      <div className="container--login">
        <section>
          <form className="form--login">
            <h1>Update Your Comment</h1>
            <fieldset>
              <label htmlFor="postTitle">Subject</label>
              <input value={title} onChange={this.changeTitleEvent} type="text" id="postTitle" className="form-control" placeholder="Comment Title" required autoFocus />
            </fieldset>
            <fieldset>
              <label htmlFor="postContent">Content</label>
              <textarea style={{height: '200px'}} name="message" rows="200" cols="20" value={content} onChange={this.changeContentEvent} type="text" id="postContent" className="form-control" placeholder="I have one comment I like to talk about..." required autoFocus />
            </fieldset>
            <fieldset style={{ textAlign:"center" }}>
              <button className="btn btn-1" type="submit" onClick={this.saveEditComment}>Save Changes</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default EditComment;
