import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./r-logo.jpg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img alt="Rare Logo" className="navbar__logo" src={Logo} />
                <h1 style={{ textAlign: "center", fontSize: "2em", marginTop: "0" }}>Rare</h1>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">All Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/my_posts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category Manager</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Manager</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/users">User Manager</Link>
            </li>
            {
                (localStorage.getItem("rare_token") !== null) ?
                    <li className="navbar__item">
                        <button className="navbar__link logout"
                            onClick={() => {
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
