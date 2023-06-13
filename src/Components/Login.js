import React, { useState } from "react";
// import "./Login.css"
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice"
import "../CSS/Login.css"

const Login = () => {
    const [userName, setUserName] = useState("")

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({
            name: userName,
            loggedIn: true
        }))
    };


    return (
        <div className="login"> 
            <form className="login__form" onSubmit={ (e) => handleSubmit(e) }>
                <h1>Login Here</h1>
                <input type="name" placeholder="username" 
                    value={userName} onChange={(e) => setUserName(e.target.value) }/>
            <button type="submit" className="submit__btn">Login</button>
            </form>
        </div>
    )
}

export default Login