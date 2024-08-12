import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Itineraries from "./pages/Itineraries";
import AddItinerary from "./components/Itineraries/AddItinerary";
import EditItinerary from "./components/Itineraries/EditItinerary";
import Profile from "./pages/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ProfileDelete from "./components/Profile/ProfileDelete";
import ItineraryDetails from "./pages/ItineraryDetails";
import AddActivities from "./components/Itineraries/AddActivities";
import EditActivity from "./components/Itineraries/EditActivity";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/destinations",
                element: <Destinations />,
            },
            {
                path: "/destinations/:id",
                element: <DestinationDetails />,
            },
            {
                path: "/itineraries",
                element: <Itineraries />,
                children: [
                    {
                        path: "add",
                        element: <AddItinerary />,
                    },
                ],
            },
            {
                path: "/itineraries/:id",
                element: <ItineraryDetails />,
                children: [
                    {
                        path: "edit",
                        element: <EditItinerary />,
                    },
                    {
                        path: "activities",
                        element: <AddActivities />,
                    },
                    {
                        path: "activities/:activityId",
                        element: <EditActivity />,
                    },
                ],
            },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    {
                        path: "edit",
                        element: <ProfileEdit />,
                    },
                    {
                        path: "delete",
                        element: <ProfileDelete />,
                    },
                ],
            },
        ],
    },
];

export default routes;