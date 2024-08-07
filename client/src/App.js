import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <h1>Project Client</h1>
      <Outlet />
    </>
  )
}

export default App;
