import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar({ member, onLogout }){
    const navigate = useNavigate();

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            onLogout();
            navigate("/"); 
          }
        });
      }

    return (
        <nav>
            <NavLink
                to="/"
                className="nav-link"
            >Home
            </NavLink>
            <NavLink 
                to="/destinations"
                className="nav-link"
            >Destinations
            </NavLink>
            <NavLink
                to="/itineraries"
                className="nav-link"
            >Itineraries</NavLink>
            <NavLink
                to="/profile"
                className="nav-link"
            >Profile</NavLink>
            <NavLink
                className="nav-link"
                onClick={handleLogoutClick}
            >Logout</NavLink>
        </nav>
    )
}

export default NavBar