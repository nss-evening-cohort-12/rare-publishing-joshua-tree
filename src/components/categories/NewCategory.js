import React from 'react';


class NewCategory extends React.Component {
  state = {
    category_name: '',
  }

  changeCategoryNameEvent = (e) => {
    e.preventDefault();
    this.setState({ category_name: e.target.value });
  }


  saveCategories = (e) => {
    e.preventDefault();

    const { category_name } = this.state;

    const category = { category_name };

      return fetch("http://localhost:8088/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
        .then(() => this.props.history.push("/categories"))
  }

  render() {
    const { category_name } = this.state;

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
                value={category_name}
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
