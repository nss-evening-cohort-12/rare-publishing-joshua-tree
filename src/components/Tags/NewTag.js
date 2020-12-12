import React from "react";

import TagProvider from './TagProvider';

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
    this.props.history.push('/tags');
    }
  }

  render() {
    const { label } = this.state;

    return (
      <div className="container--login">
        <section>
          <form className="form--login">
            <h1>What should we label the tag?</h1>
            <fieldset>
              <label htmlFor="inputEmail">Label</label>
              <input value={label} onChange={this.changeLabelEvent} type="text" id="tagLabel" className="form-control" placeholder="Travel" required autoFocus />
            </fieldset>
            <fieldset style={{
              textAlign:"center"
            }}>
              <button className="btn btn-1" type="submit" onClick={this.saveTag}>Add</button>
            </fieldset>
          </form>
        </section>
      </div>
    )
  }
}

export default NewTag;
