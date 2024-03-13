import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Card, Col, FloatButton, Space, Statistic, Table } from "antd";
import { Flex, Progress, Tooltip } from "antd";
import { BarChartOutlined, EditOutlined, LikeOutlined, PlusCircleFilled, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
const dataSource = [
  {
    key: "1",
    name: "Nmap",
    size: "32MB",
    numberOfDownloads: "128",
  },
  {
    key: "2",
    name: "WireShark",
    size: "42MB",
    numberOfDownloads: "295",
  },
];

const columns = [
  {
    title: "#",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Number of downloads",
    dataIndex: "numberOfDownloads",
    key: "numberOfDownloads",
  },
];
function Dashboard() {
  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" size="large" style={{ display: "flex",flexDirection:"row",flexWrap:"wrap" }}>
          <Card title="Hit/Miss rate" hoverable={true} style={{  width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}>
            <Tooltip title="20% miss rate">
              <Progress
                percent={80}
                success={{ percent: 80 }}
                style={{ background: "white" }}
                type="dashboard"
              />
            </Tooltip>
          </Card>
          <Card
            title="Total Repositories"
            hoverable={true}
            style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)"}}
          >
            <Statistic
              title="Repositories"
              value={1128}
              prefix={<BarChartOutlined />}
            />
          </Card>
          <Card
            title="Total Packages"
            hoverable={true}
            style={{  width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
          >
            <Statistic
              title="Packages"
              value={5369}
              prefix={<BarChartOutlined />}
            />
          </Card>
          <Card
            title="Total Packages"
            hoverable={true}
            style={{  width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
          >
            <Statistic
              title="Users"
              value={125}
              prefix={<UserOutlined />}
            />
          </Card>
          <Card style={{ width:"calc(((90vw - 280px) / 2)" }} title="Recently Fetched Packages">
            <Table
              dataSource={dataSource}
              pagination={false}
              columns={columns}
              bordered
            />
          </Card>
          <Card style={{width:"calc(((90vw - 280px) / 2)" }} title="Top Fetched Packages">
            <Table
              dataSource={dataSource}
              pagination={false}
              columns={columns}
            />
          </Card>

          
      </Space>
      <Tooltip title="Customize">
      <FloatButton 
    icon={<EditOutlined style={{fontSize: '20px',textAlign:"center"}}/>} 
    type="primary" 
    style={{  height: 50, width: 50,  }} 
/>
      </Tooltip>
    </div>
  );
}

export default Dashboard;
