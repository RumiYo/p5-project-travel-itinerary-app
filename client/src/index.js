import React from "react";
import ReactDOM from 'react-dom/client'
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes.js";
import { ItineraryProvider } from "./ItineraryContext.js";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ItineraryProvider>
        <RouterProvider router={router} />
    </ItineraryProvider>

);