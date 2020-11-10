// import React, { useContext, useState, useEffect } from "react"
// import { CategoryContext } from "./CategoryProvider"


// export const UpdateCategory = (props) => {
//     const { categories, updateCategory, getCategories } = useContext(CategoryContext)

//     // Component state
//     const [category, setCategory] = useState({})

//     const editMode = props.match.params.hasOwnProperty("categoryId")  // true or false

//     const handleControlledInputChange = (event) => {

//         const newCategory = Object.assign({}, category)          // Create copy
//         newCategory[event.target.name] = event.target.value    // Modify copy
//         setCategory(newCategory)                                 // Set copy as new state
//     }

//     /*
//         If there is a URL parameter, then the user has chosen to
//         edit an animal.
//             1. Get the value of the URL parameter.
//             2. Use that `id` to find the animal.
//             3. Update component state variable.
//     */
//     const getCategoryInEditMode = () => {
//         if (editMode) {
//             const categoryId = parseInt(props.match.params.categoryId)
//             const selectedCategory = categories.find(c => c.id === categoryId) || {}
//             setCategory(selectedCategory)
//         }
//     }

//     // Get animals from API when component initializes
//     useEffect(() => {
//         getCategories()
//     }, [])

//     // Once provider state is updated, determine the animal (if edit)
//     useEffect(() => {
//         getCategoryInEditMode()
//     }, [categories])


//     const constructNewCategory = () => {

//             if (editMode) {
//                 // PUT
//                 updateCategory({
//                     id: category.id,
//                     category_name: category.category_name
//                 })
//                     .then(() => props.history.push("/categories"))
//             }
//         }


//     return (
//         <form className="editForm">
//             <h2 className="editForm__title">Edit Category</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="name">Category name: </label>
//                     <input type="text" name="name" required autoFocus className="form-control"
//                         defaultValue={category.category_name}
//                         onChange={handleControlledInputChange}
//                     />
//                 </div>
//             </fieldset>
//             <button type="submit"
//                 onClick={evt => {
//                     evt.preventDefault()
//                     constructNewCategory()
//                 }}
//                 className="btn btn-primary">
//                 Save changes
//             </button>
//         </form>
//     )
// }

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
          <button className="btn btn-secondary" onClick={this.updateCategory}>Save Changes</button>
        </form>
      </div>
    );
  }
}

export default UpdateCategory;
