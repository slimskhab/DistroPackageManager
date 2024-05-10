import {
  Card,
  FloatButton,
  Space,
  Statistic,
  Table,
  TableColumnsType,
} from "antd";
import { Progress, Tooltip } from "antd";
import {
  BarChartOutlined,
  DotChartOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Package, bytesToSize } from "../package-list/PackageList";
import newRequest from "../../utils/newRequest";
import { useEffect, useState } from "react";

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

function Stats() {
  const [loading, setLoading] = useState(false);
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
    smallestRepo: { repositoryTitle: "", repositorySize: Infinity },
  });

  useEffect(() => {
    setLoading(true);
    newRequest
      .get("/package/stats")
      .then((response) => {
        setStats(response.data.stats);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ width: "100%", paddingTop: "30px" }}>
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <Card
          title="Hit/Miss rate"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
          <Tooltip
            title={`${(100 - stats.totalMissRate * 100).toFixed(2)} miss rate`}
          >
            <Progress
              percent={Number((stats.totalMissRate * 100).toFixed(2))}
              success={{
                percent: Number((stats.totalMissRate * 100).toFixed(2)),
              }}
              style={{ background: "white" }}
              type="dashboard"
            />
          </Tooltip>
        </Card>
        <Card
          title="Total Repositories"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
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
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
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
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
          <Statistic title="Users" value={1} prefix={<UserOutlined />} />
        </Card>
        <Card
          title="Average Package Sized"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
          <Statistic
            title="Size"
            value={bytesToSize(stats.averagePackageSize)}
            prefix={<BarChartOutlined />}
          />
        </Card>
        <Card
          title="Biggest Package"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
          <Statistic title={stats.biggestPackage.packageName} value={bytesToSize(stats.biggestPackage.packageSize)} prefix={<BarChartOutlined />} />
        </Card>
        <Card
          title="Smallest Package"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
          <Statistic
            title={stats.smallestPackage.packageName}
            value={bytesToSize(stats.smallestPackage.packageSize)}
            prefix={<BarChartOutlined />}
          />
        </Card>
        <Card
          title="Biggest Repo"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
          <Statistic title={stats.biggestRepo.repositoryTitle} value={bytesToSize(stats.biggestRepo.repositorySize)} prefix={<DotChartOutlined />} />
        </Card>
        <Card
          title="Smallest Repo"
          hoverable={true}
          style={{ width: "calc((90vw - (256px + 50px + 20px)) / 4)" }}
        >
                    <Statistic title={stats.smallestRepo.repositoryTitle} value={bytesToSize(stats.smallestRepo.repositorySize)} prefix={<DotChartOutlined />} />

        </Card>


      </Space>

    </div>
  );
}

export default Stats;
