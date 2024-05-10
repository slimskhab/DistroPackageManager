import { Card,  FloatButton, Space, Statistic, Table, TableColumnsType } from "antd";
import {  Progress, Tooltip } from "antd";
import { BarChartOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Package, bytesToSize } from "../package-list/PackageList";
import newRequest from "../../utils/newRequest";
import { useEffect, useState } from "react";
const columns: TableColumnsType<Package> = [
  {title:"#",dataIndex:"id",},
  {
    title: "Name",
    dataIndex: "packageName",
  },
  {
    title: "Size",
    dataIndex: "packageSize",
    sorter: {
      compare: (a, b) => a.packageSize - b.packageSize,
      multiple: 2,
    },
    render: (size) => bytesToSize(size),

  },
  {
    title: "N° of Downloads",
    dataIndex: "numberOfDownloads",

  },

];
interface Stats {
  totalMissRate: number;
  totalPackages: number;
  averagePackageSize: number;
  mostActiveRepository: string;
  averageHitRate: number;
  activePackages: number;
  largestRepository: string;
  totalRepositories: number;
  biggestPackage: { packageName: string; packageSize: number };
  smallestPackage: { packageName: string; packageSize: number };
  biggestRepo: { repositoryTitle: string; repositorySize: number };
  smallestRepo: { repositoryTitle: string; repositorySize: number };
}

function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [recentPackages, setRecentPackages] = useState<Package[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalMissRate: 0,
    totalPackages: 0,
    averagePackageSize: 0,
    mostActiveRepository: "",
    averageHitRate: 0,
    activePackages: 0,
    largestRepository: "",
    totalRepositories: 0,
    biggestPackage: { packageName: "", packageSize: 0 },
    smallestPackage: { packageName: "", packageSize: Infinity },
    biggestRepo: { repositoryTitle: "", repositorySize: 0 },
    smallestRepo: { repositoryTitle: "", repositorySize: Infinity }
  });
  const [topPackages, setTopPackages] = useState<Package[]>([]);


  useEffect(() => {
    setLoading(true);

    // Fetch packages
    newRequest
      .get("/package/recent")
      .then((response) => {
        setRecentPackages(response.data.packages.map((e:Package,index:number)=>{
          return {...e,key:e.id,id:index+1}
        }));

      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);
    newRequest
    .get("/package/top")
    .then((response) => {
      setTopPackages(response.data.packages.map((e:Package,index:number)=>{
        return {...e,key:e.id,id:index+1}
      }));

    })
    .finally(() => {
      setLoading(false);
    });

    setLoading(true);
    newRequest
    .get("/package/stats")
    .then((response) => {
      setStats(response.data.stats)

    })
    .finally(() => {
      setLoading(false);
    });
  
  }, []);

  return (
    <div style={{ width: "100%",paddingTop:"30px" }}>
      <Space direction="vertical" size="large" style={{ display: "flex",flexDirection:"row",flexWrap:"wrap" }}>
          <Card title="Hit/Miss rate" hoverable={true} style={{  width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}>
            <Tooltip title={`${(100-(stats.totalMissRate*100)).toFixed(2)} miss rate`}>
              <Progress
percent={Number((stats.totalMissRate * 100).toFixed(2))}
success={{ percent: Number((stats.totalMissRate*100).toFixed(2)) }}
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
              value={stats.totalRepositories}
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
              value={stats.totalPackages}
              prefix={<BarChartOutlined />}
            />
          </Card>
          <Card
            title="Total Users"
            hoverable={true}
            style={{  width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
          >
            <Statistic
              title="Users"
              value={1}
              prefix={<UserOutlined />}
            />
          </Card>
          <Card style={{ width:"calc(((90vw - 280px) / 2)" }} title="Recently Fetched Packages">
            <Table
              dataSource={recentPackages}
              pagination={false}
              columns={columns}
              bordered
              style={{width:"100%"}}
            />
          </Card>
          <Card style={{width:"calc(((90vw - 280px) / 2)" }} title="Top Fetched Packages">
            <Table
              dataSource={topPackages}
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
