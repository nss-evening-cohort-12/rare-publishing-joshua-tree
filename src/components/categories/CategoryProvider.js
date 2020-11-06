import React, { useState } from "react"

export const CategoryContext = React.createContext()


export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
            .then(res => res.json())
            .then(setCategories)
    }

    const getCategoryById = (id) => {
        return fetch(`http://localhost:8088/categories/${id}`)
        .then(res => res.json())
    }

    const addCategory = category => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getCategories)
    }

    const deleteCategory = (categoryId) => {
        return fetch(`http://localhost:8088/categories/${categoryId}`, {
            method: "DELETE"
        })
            .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, addCategory, getCategories, deleteCategory, getCategoryById
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}
