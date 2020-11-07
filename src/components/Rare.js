import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"


import { CategoryProvider } from "./categories/CategoryProvider"

// import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import Tags from "./Tags/Tags"
import NewTag from "./Tags/NewTag"
import Posts from "./Posts/Posts"
import NewPost from "./Posts/NewPost"
import SinglePost from "./Posts/SinglePost"

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />
        <Route path="/register" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
        {/* Jeanine's Category code below */}
        <CategoryProvider>
        <Route path="/categories" render={() => {
            // if (localStorage.getItem("rare_user_id")) {
            //     return <Redirect to="/" />
            // } else {
                // return <ApplicationViews />
            // }
        }} />
        </CategoryProvider>
        {/* Below is for Ryan's Tags */}

        <Route exact path="/posts" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <Posts {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/new-post" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <NewPost {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/tags" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <Tags {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/new-tag" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <NewTag {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/posts/:postId" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <SinglePost {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        {/* Jeanine's Category code below */}
        <CategoryProvider>
        <Route path="/categories" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <ApplicationViews />
            }
        }} />
        </CategoryProvider>
    </>
)
