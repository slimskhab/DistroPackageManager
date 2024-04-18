import { DeleteOutlined, DownOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Input,
  Progress,
  Space,
  Tag,
} from "antd";
import React, { useState } from "react";
import { Table } from "antd";
import type {  TableColumnsType, TableProps } from "antd";

interface Package {
  key: React.Key;
  name: string;
  size: number;
  fetchDate: string;
  numberOfDownloads: number;
  statuses: string[];
  hitMissRate:number;
}

const columns: TableColumnsType<Package> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Size",
    dataIndex: "size",
    sorter: {
      compare: (a, b) => a.size - b.size,
      multiple: 2,
    },
  },
  {
    title: "Fetch Date",
    dataIndex: "fetchDate",
    sorter: {
      compare: (a, b) => {
        const dateA = new Date(a.fetchDate).getTime();
        const dateB = new Date(b.fetchDate).getTime();
        return dateA - dateB;
      },
      multiple: 3,
    },
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
    render: (_, { statuses }) => (
      <>
        {statuses.map((status) => {
          switch (status) {
            case "Available":
              return <Tag color="green">Available</Tag>;
            case "Unavailable":
              return <Tag color="volcano">Unavailable</Tag>;
            default:
              return <Tag color="blue">Unknown</Tag>;
          }
        })}
      </>
    ),
  },
  {
    title: "Hit/Miss Ratio",
    dataIndex: "hitMissRate",
    filterDropdown: true,
    render: (e,) => (
        <>
        {
          e<0.2?            <Progress percent={e*100} size="small" strokeColor={"#52C41A"}/>
          :e<0.7?<Progress percent={e*100} size="small" strokeColor={"yellow"}/>:            <Progress percent={e*100} size="small" strokeColor={"#FF4D4F"}/>

        }
        </>
      ),
  },
];

const data: Package[] = [
  {
    key: "1",
    name: "Wireshark",
    numberOfDownloads: 50,
    statuses: ["Available"],
    fetchDate: new Date(2000, 0, 1).toLocaleDateString(), 
    size: 90,
    hitMissRate:0.5
  },
  {
    key: "2",
    name: "Nmap",
    size: 98,
    fetchDate: new Date(2000, 0, 1).toLocaleDateString(), // Month is zero-based index (0 for January)
    statuses: ["Unavailable"],
    numberOfDownloads: 99,
    hitMissRate:0.3
  },
  {
    key: "3",
    name: "Tshark",
    size: 112,
    fetchDate: new Date(2000, 0, 1).toLocaleDateString(), // Month is zero-based index (0 for January)
    statuses: ["Unavailable"],
    numberOfDownloads: 99,
    hitMissRate:0.9
  },{
    key: "4",
    name: "IpRoute",
    size: 206,
    fetchDate: new Date(2000, 0, 1).toLocaleDateString(), // Month is zero-based index (0 for January)
    statuses: ["Unavailable"],
    numberOfDownloads: 99,
    hitMissRate:0.1
  },

];

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
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onRefrech = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };


  const [repository, setRepository] = useState<string>(
    "All"
  );
  const repositoryItems: MenuProps["items"] = [
    {
      label: "All",
      key: "1",
    },
    {
      label: "Repo 1",
      key: "2",
    },
    {
      label: "Repo 2",
      key: "3",
    },
    {
      label: "Repo 3",
      key: "4",
    },
  ];
  const handleRepositoryMenuClick: MenuProps["onClick"] = (e) => {
    setRepository(
      repositoryItems.find((item) => item.key === e.key).label
    );
  };


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
          dataSource={data}
          rowSelection={rowSelection}
          onChange={onChangeSort}
        />
      </Card>

    </div>
  );
}

export default PackageList;
