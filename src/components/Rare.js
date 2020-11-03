import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
/* import Tags from "./Tags/Tags"
import NewTag from "./NewTag/NewTag" */

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

        {/* Below is for Ryan's Tags */}

        {/* <Route path="/tags" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Tags />
            }
        }} />

        <Route path="/new-tag" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <NewTag />
            }
        }} /> */}
    </>
)
