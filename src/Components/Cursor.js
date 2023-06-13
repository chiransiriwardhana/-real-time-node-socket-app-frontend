import ReactDOM from 'react-dom'
import React from "react";
// import './Home.css'
import '../CSS/Home.css'


const cursor = () => {
    return (
        <div className="pointer" style={{
            position: "absolute",
            background: "red",
            width:"10px",
            height: "10px",
            /* z-index: 3; */
            left: 0,
            top: 0,
        }}
        id="cursor" ></div>
    )
}

export default cursor;