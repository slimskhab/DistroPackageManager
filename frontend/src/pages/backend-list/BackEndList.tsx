import { DeleteOutlined, RedoOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Drawer,
  Input,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type {  TableColumnsType, TableProps } from "antd";
import LinkInput from "../../components/linkInput/LinkInput";
import newRequest from "../../utils/newRequest";

interface Backend {
  id: Number;
  backEndTitle: string;
  backEndUrl:string;
  associatedNumberOfRepos: number;
}

const columns: TableColumnsType<Backend> = [
  {title:"ID",dataIndex:"id",},
  {
    title: "Backend Title",
    dataIndex: "backEndTitle",
  },
  {
    title: "Backend Url",
    dataIndex: "backEndUrl",
  },
  {
    title: "Associated Repositories",
    dataIndex: "associatedNumberOfRepos",
    sorter: {
      compare: (a, b) => a.associatedNumberOfRepos - b.associatedNumberOfRepos,
      multiple: 2,
    },
  },
];



function BackEndList() {


  const [data, setData] = useState<Backend[]>([]);


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const onChangeSort: TableProps<Backend>["onChange"] = (
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

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
    newRequest.get("backend").then((res)=>{
      setData(res.data.backEnds);
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
        title={"Backends"}
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
              Add New Backend
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
      <Drawer title="Add New Backend" onClose={onClose} open={open}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div>
            <label>Backend Name:</label>
            <Input placeholder="Backend Name" />
          </div>
          <div>
            <label>Backend URL:</label>
            <LinkInput />
          </div>


          <Button type="primary">Submit</Button>
        </Space>
      </Drawer>
    </div>
  );
}

export default BackEndList;
