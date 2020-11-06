import React from "react"
import { Route, Redirect } from "react-router-dom"

import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
// import { ApplicationViews } from "./ApplicationViews"
// import { NavBar } from "./nav/NavBar"
import Tags from "./Tags/Tags"
import NewTag from "./Tags/NewTag"
import Posts from "./Posts/Posts"
import NewPost from "./Posts/NewPost"

export const Rare = () => (
  <>
    {/* <Route render={() => {
      if (localStorage.getItem("rare_user_id")) {
          return <>
            <NavBar />
            <ApplicationViews />
          </>
      } else {
            return <Redirect to="/login" />
        }
    }} /> */}

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

    <Route exact path="/posts" render={(props) => {
        if (localStorage.getItem("rare_user_id")) {
            return <Redirect to="/" />
        } else {
            return <Posts {...props} />
        }
    }} />

    <Route exact path="/posts/new" render={(props) => {
        if (localStorage.getItem("rare_user_id")) {
            return <Redirect to="/" />
        } else {
            return <NewPost {...props} />
        }
    }} />

    <Route exact path="/tags" render={(props) => {
        if (localStorage.getItem("rare_user_id")) {
            return <Redirect to="/" />
        } else {
            return <Tags {...props} />
        }
    }} />

    <Route exact path="/tags/new" render={(props) => {
        if (localStorage.getItem("rare_user_id")) {
            return <Redirect to="/" />
        } else {
            return <NewTag {...props} />
        }
    }} />
  </>
)
