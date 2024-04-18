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
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import newRequest from "../../utils/newRequest";
import { Repository } from "../repository-list/RepositoryList";

interface Package {
  key: React.Key;
  packageName: string;
  packageSize: number;
  createdAt: Date;
  numberOfDownloads: number;
  status: string;
  hitMissRate: number;
  packageRepository: string;
}

const columns: TableColumnsType<Package> = [
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
      <>{<div>{createdAt.toLocaleString()}</div>}</>
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
  const [repositoryItems,setRepositoryItems] =useState<MenuProps["items"]>([
    {label:"All",key:"-1"}
  ])

  const handleRepositoryMenuClick: MenuProps["onClick"] = (e) => {
    const repoName=repositoryItems.find((item) => item.key === e.key)

    if(e.key==="-1"){
      setFilteredData(data);
    }else{
      setFilteredData(data.filter((element,index)=>{
        console.log(repoName.label);
        console.log(element.packageRepository)
        return element.packageRepository===repoName.label
      }))
    }
    setRepository(repoName.label);

  };

  useEffect(()=>{
    setLoading(true);
    newRequest.get("/package").then((response) => {
      setData(response.data.packages)
      setFilteredData(response.data.packages)
    }).finally(()=>{
      setLoading(false);
    })

    setLoading(true)
    newRequest.get("/repository").then((response) => {
      setRepositoryItems([...response.data.repositories.map((e:Repository,i:number)=>{
  
        return {label:e.repositoryTitle,key:i.toString()}
      }),...repositoryItems])
    }).finally(()=>{
      setRepository("All")

      setLoading(false);
    })
  },[])

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
          dataSource={filteredData}
          rowSelection={rowSelection}
          onChange={onChangeSort}
        />
      </Card>
    </div>
  );
}

export default PackageList;
