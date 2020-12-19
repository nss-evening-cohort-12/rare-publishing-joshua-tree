import React from 'react';


class NewCategory extends React.Component {
  state = {
    label: '',
  }

  changeCategoryNameEvent = (e) => {
    e.preventDefault();
    this.setState({ label: e.target.value });
  }

  componentDidMount = () => {
    console.log('I am here')
  };


  saveCategories = (e) => {
    e.preventDefault();

    const { label } = this.state;

    const category = { label };

      return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        },
        body: JSON.stringify(category)
    })
        .then(() => this.props.history.push("/categories"))
  }

  render() {
    const { label } = this.state;

    return (
      <div className="NewCat">
        <h1>Add a New Category</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="catName"
                value={label}
                onChange={this.changeCategoryNameEvent}
                />
            </div>
          <button className="btn btn-secondary" onClick={this.saveCategories}>Save Category</button>
        </form>
      </div>
    );
  }
}

export default NewCategory;
