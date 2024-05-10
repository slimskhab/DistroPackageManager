import { DeleteOutlined, DownOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Input, Progress, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import newRequest from "../../utils/newRequest";
import { Repository } from "../repository-list/RepositoryList";

export interface Package {
  id: number;
  packageName: string;
  packageSize: number;
  createdAt: Date;
  numberOfDownloads: number;
  status: string;
  hitMissRate: number;
  packageRepository: string;
}

const columns: TableColumnsType<Package> = [
  {title:"ID",dataIndex:"id",},
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
    title: "Fetch Date",
    dataIndex: "createdAt",
    sorter: {
      compare: (a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      },
      multiple: 3,
    },
    render: (_, { createdAt }) => (
      <>{createdAt ? new Date(createdAt).toLocaleString() : ""}</>
    ),
  },
  {
    title: "Number of Downloads",
    dataIndex: "numberOfDownloads",
    sorter: {
      compare: (a, b) => a.numberOfDownloads - b.numberOfDownloads,
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    filterDropdown: true,
    render: (_, { status }) => (
      <>
        {status === "Available" ? (
          <Tag color="green">Available</Tag>
        ) : status === "Unavailable" ? (
          <Tag color="volcano">Unavailable</Tag>
        ) : (
          <Tag color="blue">Unknown</Tag>
        )}
      </>
    ),
  },

  {
    title: "Hit/Miss Ratio",
    dataIndex: "hitMissRate",
    filterDropdown: true,
    render: (e) => (
      <>
        {e < 0.2 ? (
          <Progress percent={e * 100} size="small" strokeColor={"#52C41A"} />
        ) : e < 0.7 ? (
          <Progress percent={e * 100} size="small" strokeColor={"yellow"} />
        ) : (
          <Progress percent={e * 100} size="small" strokeColor={"#FF4D4F"} />
        )}
      </>
    ),
  },
];
export  const bytesToSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};
function PackageList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const onChangeSort: TableProps<Package>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

 
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const [data, setData] = useState<Package[]>([]);

  const [filteredData, setFilteredData] = useState<Package[]>([]);

  const onRefrech = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const [repository, setRepository] = useState<string>("All");
  const [repositoryItems, setRepositoryItems] = useState<MenuProps["items"]>([
    { label: "All", key: "-1" },
  ]);

  const handleRepositoryMenuClick: MenuProps["onClick"] = (e) => {
    if (!repositoryItems) {
      return;
    }
    const repoName = repositoryItems.find((item: any) => item.key === e.key);

    if (e.key === "-1") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((element) => {
          if (!repoName) {
            return;
          }
          if (repoName && "label" in repoName) {
            const label = repoName.label as string; // Type assertion
            return element.packageRepository === label;
          }
        })
      );
    }
    if (!repoName) {
      return;
    }
    if (repoName && "label" in repoName) {
      const label = repoName.label as string; // Type assertion

      setRepository(label);
    }
  };

  useEffect(() => {
    setLoading(true);

    // Fetch packages
    newRequest
      .get("/package")
      .then((response) => {
        setData(response.data.packages.map((e:Package)=>{
          return {...e,key:e.id}
        }));
        setFilteredData(response.data.packages.map((e:Package)=>{
          return {...e,key:e.id}
        }));
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);

    // Fetch repositories
    newRequest
      .get("/repository")
      .then((response) => {
        const newRepositoryItems = response.data.repositories.map(
          (e: Repository, i: number) => {
            return { label: e.repositoryTitle, key: i.toString() };
          }
        );

        // Check if repositoryItems is defined, if not, initialize it
        if (repositoryItems) {
          setRepositoryItems([...newRepositoryItems, ...repositoryItems]);
        } else {
          setRepositoryItems(newRepositoryItems);
        }
      })
      .finally(() => {
        setRepository("All");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        width: "calc(100% - 300px)",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Card
      loading={loading}
        title={"Packages"}
        style={{ width: "100%", height: "80%" }}
        extra={
          <Space style={{ display: "flex", flexWrap: "wrap" }}>
            <Dropdown
              menu={{
                items: repositoryItems,
                onClick: handleRepositoryMenuClick,
              }}
              trigger={["click"]}
            >
              <Button style={{ textAlign: "start" }}>
                {repository}
                <DownOutlined />
              </Button>
            </Dropdown>
            {hasSelected && (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {}}
              >
                Delete
              </Button>
            )}
            <Input placeholder="Search..." />
            <Button
              onClick={onRefrech}
              loading={loading}
              icon={<RedoOutlined />}
            >
              Refrech
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          rowSelection={rowSelection}
          onChange={onChangeSort}
        />
      </Card>
    </div>
  );
}

export default PackageList;
