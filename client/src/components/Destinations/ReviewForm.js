import React, { useState, useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import DestinationContext from "../../DestinationContext";
import UserContext from "../../UserContext";

function ReviewForm({ updateReviews }){
	const { destination } = useContext(DestinationContext);
	const { user } = useContext(UserContext);  
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = yup.object().shape({
        star: yup.number().required("Must enter the rating").min(0.0, "Rating must be between 0 and 5").max(5.0, "Rating must be between 0 and 5"),
        comment: yup.string().required("Must enter the comment").max(100, "Comment must be at most 100 characters"),
        user_id: yup.number().integer().required("User_id is must"),
        destination_id: yup.number().integer().required("Destination_id is must"),
      });

      
    const formik = useFormik({
        initialValues: {
            star: "",
            comment: "",
            user_id: user.id,
            destination_id: destination.id,
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
          setIsLoading(true);
          fetch("/reviews", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
          })
          .then((r) => {
            setIsLoading(false);
            if (r.ok) {
              r.json().then((review) => {
                updateReviews(review);
                resetForm();
                });
            } else {
              r.json().then((err) => setError(err.error));
            }
          })
        }
      })
	  if (!destination || !user) {
		return <p>Loading...</p>;  // or a more appropriate loading indicator
	  }

      return (
        <div>
            <h3>Add Review </h3>
            <form className="ReviewForms" onSubmit={formik.handleSubmit}>
              <p>Please fill out all the information below:</p>
                <label htmlFor="star">Star:  </label>
                <input
                type="number"
                id="star"
                autoComplete="off"
                step="0.1"
                value={formik.values.star}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.star && formik.errors.star ? (
                  <div style={{ color: 'red' }}>{formik.errors.star}</div>
                ) : null}
                <br/>
                <label htmlFor="comment">  Comment:  </label>
                <input
                type="text"
                id="comment"
                autoComplete="off"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.comment && formik.errors.comment ? (
                    <div style={{ color: 'red' }}>{formik.errors.comment}</div>
                  ) : null}                
                <br/>
                <br/>
                <input type="submit" className="buttons"/>
                {isLoading ? "Loading..." : ""}    
                <p>{error}</p>
            </form>            
        </div>
    )
}

export default ReviewForm;