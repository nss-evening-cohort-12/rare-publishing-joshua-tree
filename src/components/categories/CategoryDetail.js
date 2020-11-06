import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Categories.css"

export const CategoryDetails = (props) => {
    const { deleteCategory, getCategoryById } = useContext(CategoryContext)

    const [categories, setCategory] = useState([])

    useEffect(() => {
        const categoryId = parseInt(props.match.params.animalId)
        getCategoryById(categoryId)
            .then(setCategory)
    }, [])

    return (
        <section className="category">
            <h3 className="category__name">{categories.category_name}</h3>

            <button onClick={() => deleteCategory(categories.id).then(() => props.history.push("/categories"))} >Delete Category</button>

            {/* <button onClick={() => {
                props.history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button> */}
        </section>
    )
}
