import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"

import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const displayName =  useRef()
    const isStaff = useRef()
    const profileImageUrl = useRef('')

    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (passwordCheck(password, verifyPassword)) {
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "username": email.current.value,
                "is_staff": isStaff.current.checked,
                "display_name": displayName.current.value,
                "profile_image_url": profileImageUrl.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem("rare_token", res.token)
                    history.push("/")
                }
            })
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="displayName"> Display Name </label>
                    <input type="text" ref={displayName} name="displayName" className="form-control" placeholder="Choose a good display name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let other gamers know a little bit about you..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="profileImageUrl"> Profile URL (Optional) </label>
                    <textarea ref={profileImageUrl} name="profileImageUrl" className="form-control" />
                </fieldset>
                <fieldset>
                    <label htmlFor="isStaff"> Admin? </label>
                    <input type="checkbox" ref={isStaff} name="isStaff" defaultChecked />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}

const passwordCheck = (password, verifyPassword) => {

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const completeRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const noLowerCase = /^(?!.*[a-z])$/;
    const noUpperCase = /^(?!.*[A-Z])$/;
    const noNumber = /^(?!.*\d)$/;

    if (password.current.value === verifyPassword.current.value) {
        if (password.current.value.match(completeRegex)) {
            return true;
        }
        else if (password.current.value.match(noLowerCase)) {
            return alert("Password must contain a lowercase letter.")
        }
        else if (password.current.value.match(noUpperCase)) {
            return alert("Password must contain an uppercase letter.")
        }
        else if (password.current.value.match(noNumber)) {
            return alert("Password must contain a number.")
        }
        else {
            return alert("Passwords can only (and must) contain at least on lowercase, one uppercase, and one number.")
        }
    }

    else {
        return alert("Passwords do not match.");
    }
}