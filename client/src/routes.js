import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import DestinationsIndex from "./pages/DestinationsIndex";
import DestinationDetails from "./pages/DestinationDetails";
import Itineraries from "./pages/Itineraries";
import UserPage from "./pages/UserPage";


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
                element: <DestinationsIndex />,
                children: [
                    {
                        path: "/destinations/:id",
                        element: <DestinationDetails />
                    },
                ]
            },
            {
                path: "/itineraries",
                element: <Itineraries />,
            },
            {
                path: "/profile",
                element: <UserPage />,
            }
        ]
    }
];

export default routes;