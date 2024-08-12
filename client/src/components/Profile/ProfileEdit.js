
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

function ProfileEdit() {

    const { user, updateUser } = useOutletContext(); 

    const [keyValue, setKeyValue] = useState("username");
    const [message, setMessage] = useState("");  

    const getValidationSchema = (key) => {
        switch (key) {
            case 'first_name':
                return yup.object().shape({
                    first_name: yup.string().required("Must enter First Name").max(15),
                });
            case 'last_name':
                return yup.object().shape({
                    last_name: yup.string().required("Must enter Last Name").max(15),
                });
            case 'username':
                return yup.object().shape({
                    username: yup.string().required("Must enter a User Name").max(10, "Username must be at most 10 characters long").matches(/^\S*$/, "Username cannot contain spaces"),
                });
            case 'email':
                return yup.object().shape({
                    email: yup.string().email("Invalid email").required("Must enter email"),
                });
            default:
                return yup.object().shape({});

            }
    }

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
        },
        validationSchema: getValidationSchema(keyValue),
        onSubmit: (values) => {
            console.log("Formik onSubmit values:", values);
            console.log("Key Value: ", keyValue);
            console.log("Sending PATCH request to:", `/users/${user.id}`);
            
            if (!user.id) {
                setMessage("User Name is not available.");
                return;
            }
    
            const formData = {
                [keyValue]: values[keyValue]
            };
    
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((r) => {
                if (r.ok) {
                    return r.json();
                } else {
                    return r.json().then((err) => {
                        throw new Error(err.error);
                    });
                }
            })
            .then((updatedUser) => {
                updateUser(updatedUser);
                setMessage("Successfully Updated");
            })
            .catch((error) => {
                console.error('Error during fetch:', error);
                setMessage(error.message);
            });
        }
    });
    
    return (
        <div className="addItem">
            <h3>Account information update</h3>
            <div className="dropdown">
                <label htmlFor="infochange">I want to change:</label>
                <select id="infochange" name="infochange" onChange={(e) => setKeyValue(e.target.value)}>
                    <option value="username">User Name</option>
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="email">Email Address</option>
                </select>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        formik.submitForm();
                    }}> 
                    <input
                        type="text"
                        id={keyValue}
                        name={keyValue}
                        autoComplete="off"
                        value={formik.values[keyValue]}
                        onChange={formik.handleChange}
                    />
                    <input type="submit" className="buttons" />
                </form>
                <p>{message}</p>
            </div>
            <br />
            <Link to={`/profile`}>Close</Link>
        </div>
    )

}

export default ProfileEdit;
