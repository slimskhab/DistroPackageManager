import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Checkbox, CheckboxProps, Input, Space } from "antd";
import React from "react";

function ProxyServerSettings() {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",width:"80%",justifyContent:"center",alignItems:"center"}}>
    <div style={{ padding: 20,  width: "80%",height:"80%" }}>
        <Card>
      <h2>Proxy Server Settings</h2>
      <div style={{ width: "70%" ,display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <label>Hostname:</label>
          </div>

          <div style={{ width: "50%" }}>
            <Input placeholder="hostname" defaultValue={"hostname"}/>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <label>Port number:</label>
          </div>

          <div style={{ width: "50%" }}>
            <Input placeholder="port number"  defaultValue={"4241"}/>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <label>Protocol:</label>
          </div>

          <div style={{ width: "50%" }}>
            <Input placeholder="protocol" defaultValue={"HTTP"}/>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <label>Username:</label>
          </div>

          <div style={{ width: "50%" }}>
            <Input placeholder="username" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <label>Password:</label>
          </div>

          <div style={{ width: "50%" }}>
            <Input.Password
              placeholder="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />{" "}
          </div>
        </div>

        <Checkbox onChange={onChange}>HTTPS Support</Checkbox>
        <Button type="primary">Save</Button>

      </div>
      </Card>
    </div>
    </div>
  );
}

export default ProxyServerSettings;
