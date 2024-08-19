import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Home/Landing";
import CreateProv from "./pages/CreateProv/CreateProv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="w-full h-full bg-white">
      <div className="w-full h-full min-h-screen max-w-[1600px] mx-auto">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create-prov" element={<CreateProv />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}

export default App;
