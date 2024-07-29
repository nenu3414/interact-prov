import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/Home/Landing";

function App() {
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-full min-h-screen max-w-[1600px] mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
