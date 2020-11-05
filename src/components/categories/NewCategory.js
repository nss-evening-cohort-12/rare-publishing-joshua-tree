import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"


export const NewCategory = (props) => {
   
    const { addCategory, getCategories } = useContext(CategoryContext)
    const [category, setCategory] = useState({})

    const handleControlledInputChange = (event) => {

        const newCategory = Object.assign({}, category)   
        newCategory[event.target.name] = event.target.value    
        setCategory(newCategory)                                 
    }


    useEffect(() => {
        getCategories()
    }, [])



    const constructNewCategory = () => {
          addCategory({
              category_name: category.category_name,
          })
              .then(() => props.history.push("/categories"))
        }
    

    return (
        <form className="categoryForm">
            <h2>Add A New Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Category name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        // defaultValue={animal.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewCategory()
                }}
                className="btn btn-primary">
                {"Save Changes"}
            </button>
        </form>
    )
}

// import React from 'react';
// import { CategoryProvider } from './CategoryProvider';


// class NewCategory extends React.Component {
//   state = {
//     category_name: '',
//   }

//   changeCategoryNameEvent = (e) => {
//     e.preventDefault();
//     this.setState({ category_name: e.target.value });
//   }


//   saveCategories = (e) => {
//     e.preventDefault();

//     const { newCategory } = this.state;

//     const category = { newCategory, };

//       return fetch("http://localhost:8088/categories", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(category)
//     })
//         .then(CategoryProvider.getCategories)
//   }

//   render() {
//     const { category_name } = this.state;

//     return (
//       <div className="NewCat">
//         <h1>Add a New Category</h1>
//         <form className="col-6 offset-3">
//           <div className="form-group">
//             <label htmlFor="">Category Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="catName"
//                 value={category_name}
//                 onChange={this.changeCategoryNameEvent}
//                 />
//             </div>
//           <button className="btn btn-secondary" onClick={this.saveCategories}>Save Category</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default NewCategory;
