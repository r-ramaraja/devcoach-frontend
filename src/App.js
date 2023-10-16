import logo from "./logo.svg";
import "./App.css";
import MainMenu from "./components/main-nav";
import ProjectMenu from "./components/project-menu";
import { Outlet, useParams } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-fa flex flex-row">
      <Outlet />
    </div>
  );
}

export default App;
