import React from "react";
import { Link } from "react-router-dom";

import TagProvider from './TagProvider';

import './Tags.css';

class Tags extends React.Component {
  state = {
    allTags: [],
  }

  componentDidMount() {
    TagProvider.getTags()
      .then((response) => this.setState({ allTags: response }))
  }

  render() {
    const { allTags } = this.state;

    const tagCards = allTags.map((tag) =>
      <div className="tag">
        {tag.name}
      </div>
    )

    return (
      <div className="Tags">
        <h1>Tag Management</h1>
        <div className="header-container">
          <Link to="/new-tag" className="btn btn-1 new-tag">New Tag</Link>
        </div>
        <div className="tag-container">
          {tagCards}
        </div>
      </div>
    )
  }
}

export default Tags;