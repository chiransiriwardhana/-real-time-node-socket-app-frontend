import React, { useEffect, useState } from "react";
import Login from "./Components/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Home from "./Components/Home"
import Axios from 'axios'
import ReactDOM from 'react-dom'

const App = () => {

  const user = useSelector(selectUser);

  return (
    <div id="app">
      {user ? <Home /> : <Login />}
    </div>
  )
}

export default App