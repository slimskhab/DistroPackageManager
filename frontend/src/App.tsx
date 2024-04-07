
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Stats from "./pages/stats/Stats";
import RepositoryList from "./pages/repository-list/RepositoryList";
import ProxyServerSettings from "./pages/settings/proxy-server-settings/ProxyServerSettings";
import CacheAdministration from "./pages/settings/cache-administration/CacheAdministration";
import Shell from "./pages/shell/Shell";
import PackageList from "./pages/package-list/PackageList";

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
        <Route path="/package-list" element={<PackageList />} />

        <Route path="/proxy-server-settings" element={<ProxyServerSettings />} />
        <Route path="/cache-administration" element={<CacheAdministration />} />
        <Route path="/shell" element={<Shell />} />


      </Routes>
    </div>
  );
}

export default App;
