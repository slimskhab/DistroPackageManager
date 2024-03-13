import { DeleteOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Input, Space, Tag } from "antd";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const onChange: TableProps<Repository>["onChange"] = (
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
          onChange={onChange}
        />
      </Card>
      <Drawer title="Add New Repository" onClose={onClose} open={open}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div>
          <label>Repository Name:</label>
          <Input placeholder="Repository Name" />
        </div>
        <div>
          <label>Repository URL:</label>
          <LinkInput/>
        </div>

        <div>
          <label>Back-end URL:</label>
          <LinkInput />

        </div>
        <Space style={{ display: "flex" }}>
          <Input />
          <Input />
        </Space>
        <Button type="primary">Submit</Button>
        </Space>
      </Drawer>
    </div>
  );
}

export default RepositoryList;
