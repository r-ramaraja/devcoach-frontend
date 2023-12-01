import "./App.css";
import { Outlet } from "react-router-dom";
import MainMenu from "./components/main-nav";
function App() {
  return (
    <div className="h-screen bg-fa flex flex-row">
      <MainMenu className="w-2/12 h-full" />
      <div className="w-10/12 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
