import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Stats from "./pages/stats/Stats";
import RepositoryList from "./pages/repository-list/RepositoryList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        width:"100%"
      }}
    >
      <Sidebar />
      
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/repository-list" element={<RepositoryList />} />


      </Routes>
    </div>
  );
}

export default App;
