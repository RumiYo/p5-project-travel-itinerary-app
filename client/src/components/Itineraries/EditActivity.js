import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";

function EditActivity(){
    const { activities, updateActivities, itinerary } = useOutletContext(); 
    const { activityId } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        fetch(`/activities/${activityId}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((activity) => formik.setValues(activity));
            } else {
                formik.setErrors({ submit: 'Failed to load itinerary.' });
            }
        });
    }, [activityId]);

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
            destination_id: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const formattedDate = new Date(values.date).toISOString().split('T')[0]; 
            console.log(values)
            fetch(`/activities/${activityId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    date: formattedDate
                }),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((updatedActivity) => { 
                        updateActivities(updatedActivity)
                        navigate(`/itineraries/${itinerary.id}`) 
                });
                } else {
                    formik.setErrors({ submit: 'Failed to update itinerary.' });
                }
            });
        },
    });

    const { handleChange, handleBlur, handleSubmit, touched, errors, values } = formik;

    return (
        <div>
            <h2>Edit Activity</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <label htmlFor="name">Activity Name:</label>
                <input
                type="text"
                id="name"
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
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                {touched.date && errors.date && (
                <div style={{ color: 'red' }}>{errors.date}</div>
                )}
                <br />
                <label htmlFor="description">Description:</label>
                <textarea
                type="text"
                id="description"
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
                <input type="submit" className="buttons" />
                {errors.submit ? <p>{errors.submit}</p> : null}      
            </form>
        </div>
    );
}

export default EditActivity;