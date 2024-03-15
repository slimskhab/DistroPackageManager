import {
  DeleteOutlined,
  DownOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Input,
  InputNumber,
  Row,
  Slider,
  Space,
  Tag,
  message,
} from "antd";
import React, { useState } from "react";
import { Table } from "antd";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import LinkInput from "../../components/linkInput/LinkInput";

interface Repository {
  key: React.Key;
  name: string;
  size: number;
  creationDate: string;
  numberOfPackages: number;
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

const data: Repository[] = [
  {
    key: "1",
    name: "Nmap",
    numberOfPackages: 50,
    statuses: ["Active"],
    creationDate: new Date(2000, 0, 1).toLocaleDateString(), // Month is zero-based index (0 for January)
    size: 90,
  },
  {
    key: "2",
    name: "WireShark",
    size: 98,
    creationDate: new Date(2000, 0, 1).toLocaleDateString(), // Month is zero-based index (0 for January)
    statuses: ["Inactive"],
    numberOfPackages: 99,
  },
];

function RepositoryList() {
    // Drawer
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

  const [inputValue, setInputValue] = useState(15);
  const [purgingPolicy, setPurgingPolicy] = useState<string>("Least Recently Used (LRU)");


  const onChangeSlider = (newValue: number | null) => {
    if (newValue !== null) {
      setInputValue(newValue);
    }
  };
  const items: MenuProps["items"] = [
    {
      label: "Least Recently Used (LRU)",
      key: "1",
    },
    {
      label: "Sized Based",
      key: "2",
    },
    {
      label: "Age Based",
      key: "3",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setPurgingPolicy(items.find(item => item.key===e.key).label);
  };



  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const formatter = (value?: number | undefined): React.ReactNode => {
    if (value !== undefined) {
      return `${value}%`;
    }
    return null; 
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
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button style={{textAlign:"start"}}>
                <Space>
                  {purgingPolicy}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>


          
          
          <div>
            <label>Threshold</label>
            <Slider
              min={1}
              max={100}
              onChange={onChangeSlider}
              value={inputValue}
              tooltip={{ formatter }}
            />
            
          </div>

          <Button type="primary">Submit</Button>
        </Space>
      </Drawer>
    </div>
  );
}

export default RepositoryList;
