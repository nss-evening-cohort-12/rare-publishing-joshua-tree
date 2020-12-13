import React from 'react';
import { Link } from 'react-router-dom';

class Tag extends React.Component {
  deleteTag = (e) => {
    e.preventDefault();
    const { deleteTag } = this.props;
    let confirmation = window.confirm("Are you sure you want to delete this tag?");

    if (confirmation) {
      deleteTag(e.target.id);
    } else {
      return;
    }
  }

  render() {
    const { tag } = this.props;
    const editLink = `/edit-tag/${tag.id}`

    return (
      <div className="Tags-div">
      <div className="icon-buttons">
          <Link to={editLink}><i className="fas fa-cog"></i></Link>
          <div onClick={this.deleteTag} ><i className="fas fa-trash-alt" id={tag.id}></i></div>
        <div className="tag">
          {tag.label} 
        </div>
        </div>
      </div>
    );
  }
}


export default Tag;
