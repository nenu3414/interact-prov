import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Home/Landing";
import CreateProv from "./pages/CreateProv/CreateProv";

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
    </div>
  );
}

export default App;
