import React from "react";
import Login from "./Components/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Home from "./Components/Home";

const App = () => {
  const user = useSelector(selectUser);
  var element = <Login msg={""} />;

  if (user != null) {
    if (user.name !== "") {
      element = <Home />;
    } else {
      element = <Login msg={"Please enter the username"} />;
    }
  }

  return (
    <React.Fragment>
      <div id="app">{element}</div>
    </React.Fragment>
  );
};

export default App;
