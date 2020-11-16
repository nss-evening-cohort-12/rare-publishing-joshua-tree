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
import { UserProvider } from "./Users/UserProvider"


export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <>
                    <NavBar />
                    {/* <ApplicationViews /> */}
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

        <Route exact path="/posts" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <Posts {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/my_posts" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <MyPosts {...props} />
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

        <Route exact path="/edit-tag/:tagId" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <EditTag {...props} />
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

        <Route exact path="/edit-post/:postId" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <UpdatePost {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />  

        <CategoryProvider>
        <Route path="/categories" render={() => {
            if (localStorage.getItem("rare_user_id")) {
                return <ApplicationViews />
            } else {
                return <Redirect to="/" />
            }
        }} />
        </CategoryProvider>

        <UserProvider>
            <Route path="/users" render={() => {
                if (localStorage.getItem("rare_user_id")) {
                    return <ApplicationViews />
                } else {
                    return <Redirect to="/" />
                }
            }} />
        </UserProvider>

        <Route exact path="/comments/:postId" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <Comments {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />

        <Route exact path="/new-comment/:postId" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <NewComment {...props} />
            } else {
                return <Redirect to="/" />
            }
        }} />        

    </>
)
