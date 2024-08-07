import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";

function SignUpForm({ onSignUp }){

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


  const formSchema = yup.object().shape({
    first_name: yup.string().required("Must enter First Name").max(15),
    last_name: yup.string().required("Must enter Last Name").max(15),
    username: yup.string().required("Must enter a User Name").max(10),
    email: yup.string().email("Invalid email").required("Must enter email"),
    password_hash: yup.string().required("Must enter password").max(15),
  });

    const formik = useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password_hash: "",
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => onSignUp(user));
          } else {
            r.json().then((err) => setError(err.error));
          }
        })
      }
    })

    return (
        <div>
            <h2>Signup Form</h2>
            <form className="LoginSignupForms" onSubmit={formik.handleSubmit}>
              <p>Please fill out all the information below:</p>
                <label htmlFor="first_name">First Name:  </label>
                <input
                type="text"
                id="first_name"
                autoComplete="off"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                />
                <br/>
                <label htmlFor="last_name">  Last Name:  </label>
                <input
                type="text"
                id="last_name"
                autoComplete="off"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                />
                <br/>
                <label htmlFor="username">User Name:  </label>
                <input
                type="text"
                id="username"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
                />
                <br/>
                <label htmlFor="email">Email Address:  </label>
                <input
                type="text"
                id="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                />
                <br/>
                <label htmlFor="password_hash">Password:  </label>
                <input
                type="password"
                id="password_hash"
                autoComplete="off"
                value={formik.values.password_hash}
                onChange={formik.handleChange}
                />
                <br/>
                <input type="submit" className="buttons"/>
                {isLoading ? "Loading..." : ""}    

                <p>{error}</p>
            </form>            
        </div>
    )
}

export default SignUpForm;