import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Itineraries from "./pages/Itineraries";
import AddItinerary from "./components/Itineraries/AddItinerary";
import Profile from "./pages/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ProfileDelete from "./components/Profile/ProfileDelete";
import ItineraryDetails from "./pages/ItineraryDetails";
import AddActivities from "./components/Itineraries/AddActivities";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
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
                element: <DestinationDetails />
            },
            {
                path: "/itineraries",
                element: <Itineraries />,
                children: [
                    {
                        path: "/itineraries/add",
                        element: <AddItinerary />,                         
                    }
                ]
            },
            {
                path: "/itineraries/:id",
                element: <ItineraryDetails />,
                children: [
                    {
                        path: "/itineraries/:id/activities",
                        element: <AddActivities />,  
                    }
                ]
            },
            {
                path: "/profile",
                element: <Profile />,
                children: [
                    {
                        path: "/profile/edit",
                        element: <ProfileEdit />
                    },
                    {
                        path: "/profile/delete",
                        element: <ProfileDelete />
                    }
                ]
            }
        ]
    }
];

export default routes;