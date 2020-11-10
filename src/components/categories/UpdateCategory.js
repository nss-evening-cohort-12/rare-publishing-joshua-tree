import React from 'react';

class UpdateCategory extends React.Component {
  state = {
    category: {
      category_name: '',
    },
  }

  componentDidMount() {
    return fetch(`http://localhost:8088/categories/${this.props.match.params.categoryId}`)
        .then((res) => res.json())
            .then((category) => this.setState({ category }))          
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const newCategory = Object.assign({}, this.state.category)        
    newCategory["category_name"] = e.target.value 
    this.setState({ category: newCategory });
  }

  updateCategory = (e) => {
    e.preventDefault();


        return fetch(`http://localhost:8088/categories/${this.props.match.params.categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.category)
        })
            .then(() => this.props.history.push("/categories")) 
  }

  render() {
    const {
      category_name,
    } = this.state.category;

    return (
      <div className="EditCategory">
        <h1>Edit Category</h1>
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="">Name</label>
              <input
                type="text"
                className="form-control"
                id="catName"
                defaultValue={category_name}
                onChange={this.changeNameEvent}
                />
            </div>
          <button onClick={this.updateCategory}>Save Changes</button>
          <button onClick={() => {
                this.props.history.push(`/categories`)
            }}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default UpdateCategory;
