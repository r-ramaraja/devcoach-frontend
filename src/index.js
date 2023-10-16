import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./views/error-page";
import ProjectMenu, { projectsLoader } from "./components/project-menu";
import HomePage from "./views/home-page";
import ChatsPage from "./views/chats-page";
import Chats, { chatLoader } from "./components/chats";

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
        element: <ChatsPage />,
        loader: projectsLoader,
        children: [
          {
            path: "chat/:chatId",
            element: <Chats />,
            loader: chatLoader,
          },
        ],
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
