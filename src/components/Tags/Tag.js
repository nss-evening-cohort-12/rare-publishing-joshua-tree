import React from 'react';

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

    return (
      <div>
        <div className="tag">
          <div className="hide-delete" onClick={this.deleteTag} id={tag.id}>x</div>
          {tag.name}
        </div>
      </div>
    );
  }
}


export default Tag;