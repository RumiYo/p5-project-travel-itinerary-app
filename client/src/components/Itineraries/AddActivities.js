import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";

function AddActivities() {
  const { itinerary, addNewActivity } = useOutletContext(); 
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  const [destinations, setDestinations] = useState([]);
  const [sortedDestinations, setSortedDestinations] = useState([]);

  useEffect(() => {
    fetch('/destinations')
      .then((response) => response.json())
      .then((destinations) => {
        const sorted = destinations.sort((a, b) => a.city.localeCompare(b.city));
        setDestinations(sorted);
        setSortedDestinations(sorted);
      });
  }, []);

  const formSchema = yup.object().shape({
    name: yup.string()
      .required("Must enter Activity name")
      .max(40, "Activity name must be at most 40 characters long"),
    date: yup.date()
      .required("Must enter the activity date and time")
      .min(new Date(itinerary.start_date), `Date must be on or after the start date (${itinerary.start_date})`)
      .max(new Date(itinerary.end_date), `Date must be on or before the end date (${itinerary.end_date})`)
      .typeError("Invalid date format"),
    description: yup.string()
      .required("Must enter the activity description"),
    itinerary_id: yup.number()
      .integer()
      .required("Itinerary ID is required"),
    destination_id: yup.number()
      .integer()
      .required("Destination ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      description: "",
      itinerary_id: itinerary.id,
      destination_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      const formattedDate = new Date(values.date).toISOString().split('T')[0]; 
      fetch("/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...values,
            date: formattedDate
          }),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            response.json().then((newActivity) => {
              addNewActivity(newActivity);
              setMessage("Activity added successfully!");
              navigate(`/itineraries/${itinerary.id}`);
            });
          } else {
            response.json().then((error) => {
              setMessage(error.error);
            });
          }
        });
    },
  });

  const { handleChange, handleBlur, handleSubmit, touched, errors, values } = formik;

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="addItem">
      <form onSubmit={handleSubmit}>
        <p>Please fill out all the information below:</p>
        <br />
        <label htmlFor="name">Activity Name:</label>
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
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          autoComplete="off"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.date && errors.date && (
          <div style={{ color: 'red' }}>{errors.date}</div>
        )}
        <br />
        <label htmlFor="description">Description:</label>
        <input
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
        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          value={values.destination_id}
          onChange={(e) => formik.setFieldValue('destination_id', e.target.value)}
          onBlur={handleBlur}
        >
          <option value="">Select a destination</option>
          {sortedDestinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.city}
            </option>
          ))}
        </select>
        {touched.destination_id && errors.destination_id && (
          <div style={{ color: 'red' }}>{errors.destination_id}</div>
        )}
        <br />
        <input type="submit" className="buttons" disabled={isLoading} />
        {message && <div style={{ color: 'green' }}>{message}</div>}
      </form>
    </div>
  );
}

export default AddActivities;