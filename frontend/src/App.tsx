
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Stats from "./pages/stats/Stats";
import RepositoryList from "./pages/repository-list/RepositoryList";

import Shell from "./pages/shell/Shell";
import PackageList from "./pages/package-list/PackageList";
import BackEndList from "./pages/backend-list/BackEndList";
import Security from "./pages/settings/security/Security";
import GeneralSettings from "./pages/settings/general-settings/GeneralSettings";
import Notifications from "./pages/notifications-list/Notifications";
import { BellOutlined } from "@ant-design/icons";

function App() {


const navigate=useNavigate();

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
        <Route path="/statistics" element={<Stats />} />
        <Route path="/repository-list" element={<RepositoryList />} />
        <Route path="/package-list" element={<PackageList />} />
        <Route path="/backend-list" element={<BackEndList />} />

        <Route path="/general-settings" element={<GeneralSettings />} />
        <Route path="/security" element={<Security/>} />
        <Route path="/shell" element={<Shell />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <div style={{ position: "absolute", top: 20, right: 20,cursor:"pointer" }}>
      <BellOutlined  style={{ fontSize: '24px' }} onClick={()=>{
        navigate("/notifications");
      }}/>
      </div>
    </div>
  );
}

export default App;
