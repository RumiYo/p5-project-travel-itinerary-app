import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./pages/Login";

function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch("/check_session")
    .then((r)=> {
      if(r.ok){
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  const handleLogin = (user) => {
    setUser(user); 
  };

  const handleLogOut = () => {
    setUser(null); 
  };

  if (!user)
    return <Login onLogin={handleLogin}  />
  

  return (
    <>
      <header>
        <NavBar user={user} onLogout={handleLogOut} />
      </header>
      <Outlet  context={{user: user, updateUser:handleLogin }}  />
    </>
  )
}

export default App;
