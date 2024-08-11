import { useEffect, useState } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


function UserPage(){

    const { user, updateUser } = useOutletContext(); 

    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then((r)=> {
          if(r.ok){
            r.json().then((user) => {
                updateUser(user)
          })
          }
        })
      }, []);


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Account Information</h3>
            <div id="accountDetail">
                <p>User Name:  {user.username}</p>
                <p>First Name:  {user.first_name}</p>
                <p>Last Name:  {user.last_name}</p>
                <p>Email Address:  {user.email}</p>
                <p>Password:  ●●●●●●●●●</p>
                <Link to="/profile/edit" >Update your account information</Link> 
                <br/> <br/>
                <Link to="/profile/delete">Delete your accounts</Link>
                <Outlet  context={{user: user, updateUser:updateUser}} />
                <br/>
                <br/>
            </div>
        </div>
    )
}

export default UserPage;