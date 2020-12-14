import React from "react";

import TagProvider from './TagProvider';
import './Tags.css'

class NewTag extends React.Component {
  state = {
    label: '',
  }

  changeLabelEvent = (e) => {
    e.preventDefault();
    this.setState({ label: e.target.value });
  }

  saveTag = async (e) => {
    e.preventDefault();
    const { label } = this.state;

    if (label === '') {
      this.setState({ validated: false });
    } else {
        const newTag = {
          label,
        };
    
    await TagProvider.addTag(newTag);
    window.location.reload()
    }
  }

  render() {
    const { label } = this.state;

    return (
      <div className="container--tag">
        <section>
          <form className="form--tag">
            <h1>Create New Tag</h1>
            <fieldset>
              <label htmlFor="inputEmail">Label</label>
              <input value={label} onChange={this.changeLabelEvent} type="text" id="tagLabel" className="form-control" placeholder="Travel" required autoFocus />
            </fieldset>
            <fieldset style={{
              textAlign:"center"
            }}>
              <button className="btn btn-1" type="submit" onClick={this.saveTag}>Create</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default NewTag;
