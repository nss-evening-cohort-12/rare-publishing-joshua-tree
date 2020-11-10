import React from "react";
import { Link } from 'react-router-dom';

import TagProvider from './TagProvider';

import './Tags.css';

class EditTag extends React.Component {
  state = {
    tag: {},
  }

  componentDidMount() {
    const { tagId } = this.props.match.params;
    TagProvider.getTagById(tagId)
      .then((response) => this.setState({ tag: response }))
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const name = e.target.value;
    this.setState(prevState => ({
      tag: {
          ...prevState.tag,
          name
      }
    }));
  }

  updateTag = (e) => {
    e.preventDefault();
    const { tag } = this.state;

    const newTag = {
      name: tag.name,
    };
    
    TagProvider.updateTag(tag.id, newTag)
      .then(() => this.props.history.push('/tags'));
  }

  render() {
    const { tag } = this.state;

    return (
      <div className="container--login">
        <section>
          <form className="form--login">
            <h1>What would you like to rename the tag?</h1>
            <fieldset>
              <label htmlFor="inputTag">Name</label>
              <input value={tag.name} onChange={this.changeNameEvent} type="text" id="tagName" className="form-control" required autoFocus />
            </fieldset>
            <fieldset style={{
              textAlign:"center"
            }}>
              <Link to="/tags"><button className="btn btn-1 cancel-edit" type="submit">Cancel</button></Link>
              <button className="btn btn-1" type="submit" onClick={this.updateTag}>Update</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default EditTag;