import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./pages/Login";
import UserContext from "./UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/check_session")
    .then((r)=> {
      if(r.ok){
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  if (!user)
    return <Login  />
  

  return (
    <>
      <header>
        <NavBar  />
      </header>
      <Outlet  />
    </>
  )
}

export default App;
