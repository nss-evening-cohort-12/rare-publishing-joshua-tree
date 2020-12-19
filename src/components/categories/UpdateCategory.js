import React from 'react';

class UpdateCategory extends React.Component {
  state = {
    category: {
      label: '',
    },
  }

  componentDidMount() {
    return fetch(`http://localhost:8000/categories/${this.props.match.params.categoryId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }      
    })
        .then((res) => res.json())
            .then((category) => this.setState({ category }))          
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    const newCategory = Object.assign({}, this.state.category)        
    newCategory["label"] = e.target.value 
    this.setState({ category: newCategory });
  }

  updateCategory = (e) => {
    e.preventDefault();
    const { category } = this.state;

    const newCategory = {
      label: category.label,
    };
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("rare_token")}`
      },
      body: JSON.stringify(newCategory)
  })
      .then(() => this.props.history.push("/categories"))    

    //this.updateCategoryProvider(category.id, newCategory)
    //  .then(() => this.props.history.push("/categories"));
  }

  render() {
    const {
      label,
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
                defaultValue={label}
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
