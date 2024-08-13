import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../UserContext";

function ProfileDelete(){
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const [ message , setMessage] = useState("") 

    function handleSubmit(e){
        e.preventDefault();
        console.log("Delete", user.id)
        fetch(`/users/${user.id}`, {
            method: "DELETE",
          }).then((r) => {
            if (r.ok) {
                setUser(null);
                navigate("/"); 
            } else {
                r.json().then((err) => setMessage(err.error));
                console.log(message)
            }
        })
     }

    return (
        <div id="profileChange"  className="addItem">
            <h3>Delete Account</h3>
            <form onSubmit={handleSubmit}>
            <p>Are you sure you want to delete your account?</p>
            <input type="submit" value="Yes, Delete my account" className="buttons"/>
            <p>Once you click this delete button, you will be signed out from the app</p>
            </form>
            <br/><br/>
            <Link to={`/profile`}>Close</Link>
        </div>

    )
}

export default ProfileDelete;
