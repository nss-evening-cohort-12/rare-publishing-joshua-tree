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


    return (
        <section className="category">
            <h3 className="category__name">{categories.category_name}</h3>

            <button onClick={() => window.confirm('Are you sure?') &&
            deleteCategory(categories.id).then(() => props.history.push("/categories"))
            }>Delete</button>

            <button onClick={() => {
                props.history.push(`/categories/edit/${categories.id}`)
            }}>Edit</button>
        </section>
    )
}
