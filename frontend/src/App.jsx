import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "devextreme/dist/css/dx.material.blue.light.css";

import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </Router>
  );
};

export default App;
