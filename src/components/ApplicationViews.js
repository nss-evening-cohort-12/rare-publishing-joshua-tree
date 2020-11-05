import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./categories/CategoryList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { NewCategory } from "./categories/NewCategory"



export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>

        <CategoryProvider>
            <Route exact path="/categories" render={(props) => {
                return <>
                    <main className="categoryContainer">
                        {/* <h1>Categories</h1> */}

                        {/* <CategorySearch /> */}
                        <CategoryList history={props.history} />
                    </main>

                </>
            }} />

            <Route exact path="/categories/create" render={(props) => {
                return <NewCategory {...props} />
            }} />

            {/* <Route path="/animals/:animalId(\d+)" render={
                props => <AnimalDetails {...props} />
            } />

            <Route path="/animals/edit/:animalId(\d+)" render={
                props => <AnimalForm {...props} />
            } /> */}
            </CategoryProvider>
    </>
}
