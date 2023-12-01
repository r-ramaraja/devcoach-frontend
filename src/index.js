import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./views/error-page";
import HomePage from "./views/home-page";
import Chats from "./components/chats";
import { projectsLoader } from "./routes/phaseLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        exact: true,
        element: <HomePage />,
      },
      {
        path: "phase/:phaseId",
        element: <Chats />,
        loader: projectsLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
