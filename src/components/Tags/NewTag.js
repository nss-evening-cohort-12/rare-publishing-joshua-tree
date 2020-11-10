import React from "react";

import TagProvider from './TagProvider';

class NewTag extends React.Component {
  state = {
    name: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  saveTag = async (e) => {
    e.preventDefault();
    const { name } = this.state;

    if (name === '') {
      this.setState({ validated: false });
    } else {
        const newTag = {
          name,
        };
    
    await TagProvider.addTag(newTag);
    this.props.history.push('/tags');
    }
  }

  render() {
    const { name } = this.state;

    return (
      <div className="container--login">
        <section>
          <form className="form--login">
            <h1>What should we name the tag?</h1>
            <fieldset>
              <label htmlFor="inputEmail">Name</label>
              <input value={name} onChange={this.changeNameEvent} type="text" id="tagName" className="form-control" placeholder="Travel" required autoFocus />
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