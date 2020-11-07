import React from "react"
import "./Categories.css"
import { Link } from "react-router-dom"

export default ({ categories }) => (
    <section className="category">
        <h3 className="category__name">
            <Link to={`/categories/${categories.id}`}>
                { categories.category_name }
            </Link>
        </h3>
    </section>
)
