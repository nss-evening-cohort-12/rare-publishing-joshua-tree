import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { CategoryProvider } from "./categories/CategoryProvider"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import Tags from "./Tags/Tags"
import NewTag from "./Tags/NewTag"
import EditTag from "./Tags/EditTag";
import Posts from "./Posts/Posts"
import MyPosts from "./Posts/MyPosts"
import NewPost from "./Posts/NewPost"
import SinglePost from "./Posts/SinglePost"
import UpdatePost from './Posts/UpdatePost'
import Comments from "./Comments/Comments"
import NewComment from "./Comments/NewComment"
import EditComment from "./Comments/EditComment"
import { UserProvider } from "./Users/UserProvider"

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_token")) {
                return <>
                    <NavBar />
                    {/* <ApplicationViews /> */}
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login" render={() => {
            if (localStorage.getItem("rare_token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />
        <Route path="/register" render={() => {
            if (localStorage.getItem("rare_token")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
        
        {/* Below is for Ryan's Tags */}

        <Route exact path="/posts" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <Posts {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/my_posts" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <MyPosts {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/new-post" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <NewPost {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/tags" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <Tags {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/tags/new" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <NewTag {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/edit-tag/:tagId" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <EditTag {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/posts/:postId" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <SinglePost {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/edit-post/:postId" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <UpdatePost {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />  

        <CategoryProvider>
        <Route path="/categories" render={() => {
            if (localStorage.getItem("rare_token")) {
                return <ApplicationViews />
            } else {
                return <Redirect to="/" />
            }
        }} />
        </CategoryProvider>

        <UserProvider>
            <Route path="/users" render={() => {
                if (localStorage.getItem("rare_token")) {
                    return <ApplicationViews />
                } else {
                    return <Redirect to="/" />
                }
            }} />
        </UserProvider>

        <Route exact path="/comments/:postId" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <Comments {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/new-comment/:postId" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <NewComment {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />        

        <Route exact path="/edit-comment/:commentId" render={(props) => {
            if (localStorage.getItem("rare_token")) {
                return <EditComment {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />    

    </>
)
