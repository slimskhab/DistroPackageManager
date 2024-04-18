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

interface Repository {
  id:number;
  repositoryTitle: string;
  numberOfPackages: number;
  repositorySize: string;
  repostioryStatus: number;
  statuses: string[];
}

const columns: TableColumnsType<Repository> = [
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
    title: "Creation Date",
    dataIndex: "creationDate",
    sorter: {
      compare: (a, b) => {
        const dateA = new Date(a.creationDate).getTime();
        const dateB = new Date(b.creationDate).getTime();
        return dateA - dateB;
      },
      multiple: 3,
    },
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
    dataIndex: "status",
    filterDropdown: true,
    render: (_, { statuses }) => (
      <>
        {statuses.map((status) => {
          switch (status) {
            case "Active":
              return <Tag color="green">Active</Tag>;
            case "Inactive":
              return <Tag color="volcano">Inactive</Tag>;
            default:
              return <Tag color="blue">Unknown</Tag>;
          }
        })}
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
    setPurgingPolicy(
      purgingPolicyItems.find((item) => item.key === e.key).label
    );
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
    setRetentionPolicy(
      retentionPolicyItems.find((item) => item.key === e.key).label
    );
  };

  const formatter = (value?: number | undefined): React.ReactNode => {
    if (value !== undefined) {
      return `${value}%`;
    }
    return null;
  };

useEffect(()=>{
  newRequest.get("repository").then((res)=>{
    setData(res.data.repositories);
    
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

          <div>
            <label>Back-end URL:</label>
            <LinkInput />
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
