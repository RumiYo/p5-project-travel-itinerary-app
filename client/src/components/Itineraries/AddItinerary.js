import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import ItineraryContext from '../../ItineraryContext';
import UserContext from "../../UserContext";

function AddItinerary(){
    const navigate = useNavigate();
    const { setItinerary } = useContext(ItineraryContext);
    const { user } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(""); 

    const formSchema = yup.object().shape({
        name: yup.string()
          .required("Must enter Itinerary name")
          .max(40, "Itinerary name must be at most 40 characters long"),
        start_date: yup.date()
          .required("Must enter Start Date")
          .min(new Date(), "Start Date must be in the future")
          .typeError("Invalid date format"),
        end_date: yup.date()
          .required("Must enter End Date")
          .min(yup.ref('start_date'), "End date must be later than start date")
          .typeError("Invalid date format"),
        description: yup.string(),
        user_id: yup.number()
          .integer()
          .required("User ID is required"),
      });

    
  const formik = useFormik({
    initialValues: {
      name: "",
      start_date: "",
      end_date: "",
      description: "",
      user_id: user.id,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const formattedStartDate = new Date(values.start_date).toISOString().split('T')[0]; 
      const formatteEndDate = new Date(values.end_date).toISOString().split('T')[0]; 
      fetch("/itineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...values,
            start_date: formattedStartDate,
            end_date: formatteEndDate
          }),
      })
        .then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((newItinerary) => {
                setItinerary(newItinerary);
                setMessage("Itinerary added successfully!");
                navigate(`/itineraries/${newItinerary.id}`);
            });
          } else {
            r.json().then((error) => {
              setMessage(error.error);
            });
          }
        });
    },
  });


  const { handleChange, handleBlur, handleSubmit, touched, errors, values } = formik;

    return (
        <div className="addItem">
        <form onSubmit={handleSubmit}>
          <p>Please fill out all the information below:</p>
          <br />
          <label htmlFor="name">Itinerary Name:  </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <div style={{ color: 'red' }}>{errors.name}</div>
          )}
          <br />
          <label htmlFor="start_date">Start Date:  </label>
          <input
            type="date"
            id="start_date"
            autoComplete="off"
            value={values.start_date}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.start_date && errors.start_date && (
            <div style={{ color: 'red' }}>{errors.start_date}</div>
          )}
          <br />
          <label htmlFor="end_date">End Date:  </label>
          <input
            type="date"
            id="end_date"
            autoComplete="off"
            value={values.end_date}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.end_date && errors.end_date && (
            <div style={{ color: 'red' }}>{errors.end_date}</div>
          )}
          <br />
          <label htmlFor="description">Description:  </label>
          <textarea
            type="text"
            id="description"
            autoComplete="off"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.description && errors.description && (
            <div style={{ color: 'red' }}>{errors.description}</div>
          )}
          <br />
          <input type="submit" className="buttons" disabled={isLoading} />
          {message && <div style={{ color: 'green' }}>{message}</div>}
        </form>
        <br/>
        <Link to={'/itineraries'}>Go back to Itineraries</Link>
      </div>
      
    );

}

export default AddItinerary