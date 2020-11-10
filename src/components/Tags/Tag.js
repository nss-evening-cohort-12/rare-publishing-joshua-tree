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
      <div>
        <div className="tag">
          <div className="hide-delete" onClick={this.deleteTag} id={tag.id}>x</div>
          <Link to={editLink} className="edit-link">
            {tag.name}
          </Link>
        </div>
      </div>
    );
  }
}


export default Tag;