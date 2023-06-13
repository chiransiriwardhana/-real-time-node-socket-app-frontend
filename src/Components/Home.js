import React, { useEffect, useState } from "react";
// import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice"
import { selectUser } from "../features/userSlice"
import io from 'socket.io-client'
import ReactDOM from 'react-dom'
import Cursor from "./Cursor";
import '../CSS/Home.css'
import Navbar from "./Navbar";

const socket = io.connect("http://localhost:3001")

const Home = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    const [state, setState] = React.useState({ left: 0, top: 0 });
    const mouseMove = (event) => {
        socket.emit("mouse_activity", { x: event.pageX, y: event.pageY, userName: user.name });
    }

    useEffect(() => {
        window.addEventListener("mousemove", mouseMove);
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        window.removeEventListener("mousemove", mouseMove)
    };

    const updateState = function (data) {
        setState({ left: data.coords.x, top: data.coords.top })
    }

    function getCursorElement(id, name) {
        var elementId = 'cursor-' + id;
        var element = document.getElementById(elementId)
        if (element == null) {
            element = document.createElement('canvas')
            const ctx = element.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(100, 75);
            ctx.lineTo(100, 25);
            ctx.rotate((Math.PI / 4));
            ctx.fill();
            ctx.fillText(name, 50, 50);
            element.id = elementId
            element.className = 'cursor'
            document.body.appendChild(element)
        }
        return element;
    }

    socket.on('all_mouse_activity', (data) => {
        var el = getCursorElement(data.session_id, data.coords.userName);
        el.style.left = data.coords.x + 'px';
        el.style.top = data.coords.y + 'px';
    });


    return (
        <div className='home' id="home">
            <Navbar user={user.name} logout={handleLogout} />
            {/* <h1>Welcome <span className='user__name'>{user.name}</span></h1> */}
            {/* <button className='logout__button' onClick={(e) => handleLogout(e)}>Logout</button> */}
        </div>
    )
}

export default Home;