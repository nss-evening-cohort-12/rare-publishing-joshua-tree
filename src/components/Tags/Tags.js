import React from "react";
import { Link } from "react-router-dom";

import Tag from './Tag';
import TagProvider from './TagProvider';

import './Tags.css';

class Tags extends React.Component {
  state = {
    allTags: [],
  }

  componentDidMount() {
    this.getAllTags();
  }

  getAllTags = () => {
    TagProvider.getTags()
      .then((response) => this.setState({ allTags: response }))
  }

  deleteTag = (tagId) => {
    TagProvider.deleteTag(tagId)
      .then(() => this.getAllTags())
  }

  render() {
    const { allTags } = this.state;

    const tagCards = allTags.map((tag) => <Tag key={tag.id} tag={tag} deleteTag={this.deleteTag} />)

    return (
      <div className="Tags">
        <h1>Tag Management</h1>

        <div className="header-container">
          <Link to="/tags/new" className="btn btn-1 new-tag">New Tag</Link>
        </div>
        <h3>Click on a tag to edit it</h3>
        <div className="tag-container">
          {tagCards}
        </div>
      </div>
    )
  }
}

export default Tags;
