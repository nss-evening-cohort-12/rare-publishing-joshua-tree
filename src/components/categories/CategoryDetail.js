import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Categories.css"

export const CategoryDetails = (props) => {
    const { deleteCategory, getCategoryById } = useContext(CategoryContext)

    const [categories, setCategory] = useState([])

    useEffect(() => {
        const categoryId = parseInt(props.match.params.categoryId)
        getCategoryById(categoryId)
            .then(setCategory)
    }, [])

    // const options = {
    //     title: 'Title',
    //     message: 'Message',
    //     buttons: [
    //       {
    //         label: 'Yes',
    //         onClick: () => alert('Click Yes')
    //       },
    //       {
    //         label: 'No',
    //         onClick: () => alert('Click No')
    //       }
    //     ],
    //   };
       
    //   confirmAlert(options);


    return (
        <section className="category">
            <h3 className="category__name">{categories.category_name}</h3>

            <button onClick={() => window.confirm('Are you sure?') &&
            deleteCategory(categories.id).then(() => props.history.push("/categories"))
            }>Delete</button>



            {/* <button onClick={() => {
                props.history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button> */}
        </section>
    )
}
