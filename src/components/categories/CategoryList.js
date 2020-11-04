import React, { useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import { Link } from "react-router-dom"
import "./Categories.css"
// import CategoryCards from "./CategoryCards"

export const CategoryList = props => {
    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div style={{ margin: "0rem 3rem"}}>
            <h1>Categories</h1>

            <button onClick={() => props.history.push("/categories/create")}>
                Add Category
            </button>

            <article className="categories">
                {
                    categories.map(category => {
                        return <section className="categories" key={category.id}>
                            <Link to={`/categories/${category.id}`}>
                                <h3>{category.name}</h3>
                            </Link>
                        </section>
                    })
                }
            </article>
        </div>
    )
}

// class CategoryList extends React.Component {
//     state = {
//       categories: [],
//       setCategories: [],
//     }
  
//     getCategories = () => {
//         return fetch("http://localhost:8088/categories")
//             .then(res => res.json())
//             .then(this.setCategories)
//     }
//     componentDidMount() {
//       this.getCategories();
//     }
  

//     render() {
//       const { categories } = this.state;
  
//       const categoryCards = categories.map((category) => <CategoryCards key={category.id} category={category} />);

  
//       return (
//         <div className="Category">
//           <h1>Categories</h1>
//             <div className="categories">
//               <div className="container">
//                 <div className="row">
//                   { categoryCards }
//                   <button><Link to="/new-category">Create a new category</Link></button>
//                 </div>
//               </div>
//           </div>
          
//           </div>
//       );
//     }
//   }
  
//   export default CategoryList;
