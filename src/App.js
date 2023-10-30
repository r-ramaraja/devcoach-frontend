import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-fa flex flex-row">
      <Outlet />
    </div>
  );
}

export default App;
