import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        fetch('https://bookish-yodel-r4v7p64v5q462jrj-3001.app.github.dev/api/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password })
        })
        .then((response) => {
                if (response.ok) {
                    alert("User created");
                } else {
                    alert("Error");
                }
                
            })
        setEmail(""), setUsername(""), setPassword("")
    };


    return (
        <div className="container-sm w-25 p-3">
            <h1>Registrarse</h1>
            <form className="row justify-content-md-center" onSubmit={onSubmit}>
                <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="col-12 my-3">
                    <button type="submit" className="btn btn-primary px-5">Sign Up</button>
                </div>
                <div className="col-12 my-3">
                    <Link to={"/Login"} className="">Login</Link>
                </div>

            </form>
        </div>

    )
}