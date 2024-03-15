import React from "react";
import {
  MailOutlined,
  SettingOutlined,
  PieChartOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  CodeOutlined


} from "@ant-design/icons";
import "./Sidebar.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '../../assets/logo.webp';

import type { MenuProps } from "antd";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  

  
    getItem(<Link to={'/dashboard'}>Dashboard</Link>, "1",<DashboardOutlined /> ),
    getItem(<Link to={'/repository-list'}>Repository List</Link>, "2",<DatabaseOutlined />),
    getItem(<Link to={'/shell'}>Shell</Link>, "3",<CodeOutlined />),
    getItem(<Link to={'/statistics'}>Statistics</Link>, "4",<PieChartOutlined />),
    getItem("Settings", "sub1", <SettingOutlined />, [
      getItem(<Link to={'/proxy-server-settings'}>Proxy Server Settings</Link>, "5"),
      getItem(<Link to={'/cache-administration'}>Cache Administration</Link>, "6"),
      getItem(<Link to={'/performance'}>Performance</Link>, "7"),
      getItem(<Link to={'/security'}>Security</Link>, "8"),
      getItem(<Link to={'/authentification'}>Authentification</Link>, "9"),
    ]),
 

 
];

const Sidebar: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log("click ", e);
  };

  return (
<Sider
      className="navigation"
      width={256}
      style={{
        alignItems:"start",
        textAlign:"start",
        position:"relative",
        paddingLeft:20,
        marginRight:20,
        height:"100vh"
      }}
      theme={'light'}
      >
                <img src={logoIcon} alt="Logo" style={{ height: '40px',padding:30 }} />

 <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      mode="inline"
    
      items={items}
    />
      </Sider>
     
  );
};

export default Sidebar;
