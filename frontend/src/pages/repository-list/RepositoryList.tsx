import { DeleteOutlined, DownOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Input,
  Slider,
  Space,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import LinkInput from "../../components/linkInput/LinkInput";
import newRequest from "../../utils/newRequest";
import { Backend } from "../backend-list/BackEndList";
import { bytesToSize } from "../package-list/PackageList";

export interface Repository {
  id:number;
  repositoryTitle: string;
  numberOfPackages: number;
  repositorySize: number;
  repositoryStatus: string;
  createdAt:Date;
}

const columns: TableColumnsType<Repository> = [
  {title:"ID",dataIndex:"id",},

  {
    title: "Name",
    dataIndex: "repositoryTitle",
  },
  {
    title: "Size",
    dataIndex: "repositorySize",
    sorter: {
      compare: (a, b) => a.repositorySize - b.repositorySize,
      multiple: 2,
    },
    render: (size) => bytesToSize(size),

  },
  {
    title: "Creation Date",
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
    title: "Number of Packages",
    dataIndex: "numberOfPackages",
    sorter: {
      compare: (a, b) => a.numberOfPackages - b.numberOfPackages,
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "repositoryStatus",
    filterDropdown: true,
    render: (_, { repositoryStatus }) => (
      <>
      {repositoryStatus==="Active"?<Tag color="green">Active</Tag>:<Tag color="blue">Unknown</Tag>}
       
      </>
    ),
  },
];



function RepositoryList() {
  const [data, setData] = useState<Repository[]>([]);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const onChangeSort: TableProps<Repository>["onChange"] = (
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

  const onRefrech = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onChangeSlider = (newValue: number | null) => {
    if (newValue !== null) {
      setInputValue(newValue);
    }
  };

  const [inputValue, setInputValue] = useState(15);

  const [purgingPolicy, setPurgingPolicy] = useState<string>(
    "None"
  );
  const purgingPolicyItems: MenuProps["items"] = [
    {
      label: "None",
      key: "1",
    },
    {
      label: "Least Recently Used (LRU)",
      key: "2",
    },
    {
      label: "Sized Based",
      key: "3",
    },
    {
      label: "Age Based",
      key: "4",
    },
  ];
  const handlePurgingPolicyMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = purgingPolicyItems.find((item:any) => item.key === e.key);
    if (selectedItem && 'label' in selectedItem) {
      const label = selectedItem.label as string; // Type assertion
      setPurgingPolicy(label);
    }
  };

  const [retentionPolicy, setRetentionPolicy] = useState<string>(
    "None"
  );
  const retentionPolicyItems: MenuProps["items"] = [
    {
      label: "None",
      key: "1",
    },
    {
      label: "Size Based",
      key: "2",
    },
    {
      label: "Miss Rate Based",
      key: "3",
    },
  ];
  const handleRetentionPolicyMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = retentionPolicyItems.find((item:any) => item.key === e.key);
    if (selectedItem && 'label' in selectedItem) {
      const label = selectedItem.label as string; // Type assertion
      setRetentionPolicy(label);
    }
  };


  const [backEnd, setBackEnd] = useState<string>(
  );
  const [backEndItems,setBackEndItems] =useState<MenuProps["items"]>([])
  const handleBackEndMenuClick: MenuProps["onClick"] = (e) => {
    if(!backEndItems){
      return;
    }
    const selectedItem = backEndItems.find((item:any) => item.key === e.key);
    if (selectedItem && 'label' in selectedItem) {
      const label = selectedItem.label as string; // Type assertion
      setBackEnd(label);
    }
  };

  const formatter = (value?: number | undefined): React.ReactNode => {
    if (value !== undefined) {
      return `${value}%`;
    }
    return null;
  };

useEffect(()=>{
  setLoading(true);
  newRequest.get("/repository").then((res)=>{
    setData(res.data.repositories.map((repository:Repository)=>{
      return {...repository,key:repository.id}
    }));
    console.log(res.data.repositories)
  }).finally(()=>{
    setLoading(false);
  })

  setLoading(true);
  newRequest.get("/backend").then((res)=>{
    console.log(res.data)
    setBackEndItems(res.data.backEnds.map((e:Backend,i:number)=>{
      setBackEnd(e.backEndUrl)

      return {label:e.backEndUrl,key:i.toString()}
    }))
    console.log(backEndItems)
  }).finally(()=>{
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
        title={"Repositories"}
        style={{ width: "100%", height: "80%" }}
        loading={loading}
        extra={
          <Space style={{ display: "flex", flexWrap: "wrap" }}>
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

            <Button
              type="primary"
              onClick={() => {
                showDrawer();
              }}
            >
              Add New Repository
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
      <Drawer title="Add New Repository" onClose={onClose} open={open}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div>
            <label>Repository Name:</label>
            <Input placeholder="Repository Name" />
          </div>
          <div>
            <label>Repository URL:</label>
            <LinkInput />
          </div>

          <div  style={{ display: "flex", flexDirection: "column" }}>
            <label>Back-end URL:</label>
            <Dropdown
              menu={{
                items: backEndItems,
                onClick: handleBackEndMenuClick,
              }}
              trigger={["click"]}
            >
              <Button style={{ textAlign: "start" }}>
                {backEnd}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Purging Policy:</label>
            <Dropdown
              menu={{
                items: purgingPolicyItems,
                onClick: handlePurgingPolicyMenuClick,
              }}
              trigger={["click"]}
            >
              <Button style={{ textAlign: "start" }}>
                {purgingPolicy}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>

{
  purgingPolicy!=="None"&&
  <div>
            <label>Purging Policy Threshold:</label>
            <Slider
              min={1}
              max={100}
              onChange={onChangeSlider}
              value={inputValue}
              tooltip={{ formatter }}
            />
          </div>
}
          

          {
            purgingPolicy!=="None"&& <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Retention Policy:</label>
            <Dropdown
              menu={{
                items: retentionPolicyItems,
                onClick: handleRetentionPolicyMenuClick,
              }}
              trigger={["click"]}
            >
              <Button style={{ textAlign: "start" }}>
                {retentionPolicy}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          }
{
  retentionPolicy!=="None"&&<div>
  <label>Retention Policy Threshold:</label>
 
 {
    retentionPolicy==="Size Based"?
    <Input></Input>
    :<Slider
    min={1}
    max={100}
    onChange={onChangeSlider}
    value={inputValue}
    tooltip={{ formatter }}
  />

 } 
</div>
}
          

          <Button type="primary">Submit</Button>
        </Space>
      </Drawer>
    </div>
  );
}

export default RepositoryList;
