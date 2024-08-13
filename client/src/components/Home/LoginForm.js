import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
import UserContext from "../../UserContext";

function LoginForm(){
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);  

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a User Name").max(10)
                .matches(/^\S*$/, "Username cannot contain spaces"),
        password: yup.string().required("Must enter password").max(15)
                .matches(/^\S*$/, "Username cannot contain spaces"),
      });

    
    const formik = useFormik({
    initialValues: {
        username: "",
        password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user)=> {
                setUser(user)
                navigate("/"); 
            });
        } else {
            r.json().then((err) => setError(err.error));
        }
        })
    }
    })

        
    return (
        <div >
            <h2>Login</h2>
            <form className="loginSignin" onSubmit={formik.handleSubmit}>
                <p>Type your UserName and Password:</p>
                <label htmlFor="username">User Name: </label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                <br/>
                <label htmlFor="password">   Password: </label>
                <input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <br/>
                <input type="submit" className="buttons"/>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm;