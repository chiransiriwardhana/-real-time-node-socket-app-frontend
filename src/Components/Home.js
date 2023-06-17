import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { selectUser } from "../features/userSlice";
import io from "socket.io-client";
import "../CSS/Home.css";
import Navbar from "./Navbar";
import moize from "moize";

const socket = io.connect("http://localhost:3001");

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const mouseMove = (event) => {
    socket.emit("mouse_activity", {
      x: event.pageX,
      y: event.pageY,
      userName: user.name,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.removeEventListener("mousemove", mouseMove);
  };

  function getCursorElement(id, name, secondSideUser) {
    var elementId = "cursor-" + id;
    var element = document.getElementById(elementId);
    if (element == null && secondSideUser.name !== "") {
      element = document.createElement("canvas");
      const ctx = element.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(100, 75);
      ctx.lineTo(100, 25);
      ctx.rotate(Math.PI / 4);
      ctx.fill();
      ctx.fillText(name, 50, 50);
      element.id = elementId;
      element.className = "cursor";
      document.body.appendChild(element);
    }
    return element;
  }

  socket.on("all_mouse_activity", (data) => {
    var el = getCursorElement(data.session_id, data.coords.userName, user);
    el.style.left = data.coords.x + "px";
    el.style.top = data.coords.y + "px";
  });

  return (
    <React.Fragment>
      <div className="home" id="home">
        <Navbar user={user.name} logout={handleLogout} />
      </div>
    </React.Fragment>
  );
};

export default moize(Home, {
  isReact: true,
});
