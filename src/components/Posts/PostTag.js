import React from 'react';
//import './App.scss';

class PostTag extends React.Component {

  componentDidMount = () => {
    // const { tag } = this.props;
  };
  

  render() {
    const { tag, handleCheck, Checked } = this.props;
    return (
      <div className="App">
        <h6></h6>
        <input type="checkbox" id={tag.id} name={tag.label} defaultChecked={Checked} value={tag.label} onChange={handleCheck}/>
        <label htmlFor={tag.label}> {tag.label}</label>
      </div>
    );
  }
}

export default PostTag;
