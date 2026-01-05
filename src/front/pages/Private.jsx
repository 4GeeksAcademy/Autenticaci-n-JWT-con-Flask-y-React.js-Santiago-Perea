import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="container-sm w-25">
            <div className="row justify-content-md-center">
                <h1 className="my-4">Login Successfully</h1>
                <button onClick={logout} className="btn btn-primary">Log Out</button>
            </div>
        </div>
    );
};