import { useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
import ItineraryContext from "../../ItineraryContext"; 

function EditItinerary(){
    const { itinerary, setItinerary, updateItinerary } = useContext(ItineraryContext); 

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/itineraries/${id}`)
        .then((r) => {
            if (r.ok) {
                r.json().then((itinerary) => formik.setValues(itinerary));
            } else {
                formik.setErrors({ submit: 'Failed to load itinerary.' });
            }
        });
    }, [id]);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter Itinerary name").max(40, "Itinerary name must be at most 40 characters long"),
        start_date: yup.date().required("Must enter Start Date").min(new Date(), "Start date cannot be in the past"),
        end_date: yup.date().required("Must enter End Date").min(yup.ref('start_date'), "End Date cannot be before start date"),
        description: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            start_date: "",
            end_date: "",
            description: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const formattedStartDate = new Date(values.start_date).toISOString().split('T')[0]; 
            const formattedEndDate = new Date(values.end_date).toISOString().split('T')[0]; 
            fetch(`/itineraries/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                }),
            })
            .then((r) => {
                if (r.ok) {
                    r.json().then((updatedItinerary) => { 
                    updateItinerary(updatedItinerary) 
                    setItinerary(updatedItinerary)
                    navigate(`/itineraries/${id}`);
                });
                } else {
                    formik.setErrors({ submit: 'Failed to update itinerary.' });
                }
            });
        },
    });

    const { handleChange, handleBlur, handleSubmit, touched, errors, values } = formik;

    return (
        <div className="addItem">
            <p>Please update the information you want to change:</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.name && errors.name ? (
                        <div style={{ color: 'red' }}>{errors.name}</div>
                    ) : null}
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        type="date"
                        id="start_date"
                        value={values.start_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.start_date && errors.start_date ? (
                        <div style={{ color: 'red' }}>{errors.start_date}</div>
                    ) : null}
                </label>
                <br />
                <label>
                    End Date:
                    <input
                        type="date"
                        id="end_date"
                        value={values.end_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.end_date && errors.end_date ? (
                        <div style={{ color: 'red' }}>{errors.end_date}</div>
                    ) : null}
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        id="description"
                        value={values.description || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.description && errors.description ? (
                        <div style={{ color: 'red' }}>{errors.description}</div>
                    ) : null}
                </label>
                <br />
                <button type="submit" className="buttons">Update Itinerary</button>
                {errors.submit ? <p>{errors.submit}</p> : null}
            </form>
            <br />
            <Link to={`/itineraries/${itinerary.id}`}>Go back to Itinerary</Link>
        </div>
    );
}

export default EditItinerary;