import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    // const handleLogout = () => {


    //     return fetch("http://127.0.0.1:8000/logout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         }
    //     })
    // }

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img alt="Rare Logo" className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/my_posts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Management</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/users">User Profiles</Link>
            </li>
            {
                (localStorage.getItem("rare_token") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                // handleLogout()
                                localStorage.removeItem("rare_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
