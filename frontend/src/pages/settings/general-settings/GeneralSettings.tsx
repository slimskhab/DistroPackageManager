import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Input } from "antd";
import React, { useState } from "react";

function GeneralSettings() {
  const [language, setLanguage] = useState<string>("English");
  const languageItems: MenuProps["items"] = [
    {
      label: "English",
      key: "1",
    },
    {
      label: "French",
      key: "2",
    },
    {
      label: "Spanish",
      key: "3",
    },
    {
      label: "Arabic",
      key: "4",
    },
  ];

  const handleLanguageMenuClick: MenuProps["onClick"] = (e) => {
    setLanguage(languageItems.find((item) => item.key === e.key).label);
  };

  const [dateFormat, setDateFormat] = useState<string>("ISO 8601");
  const dateFormatItems: MenuProps["items"] = [
    {
      label: "ISO 8601",
      key: "iso",
    },
    {
      label: "Short Date Format (MM/DD/YYYY)",
      key: "short",
    },
    {
      label: "Long Date Format",
      key: "long",
    },
    {
      label: "Time Format (HH:MM:SS)",
      key: "time",
    },
    {
      label: "Custom Format (MMM DD, YYYY)",
      key: "custom",
    },
    {
      label: "Unix Timestamp",
      key: "timestamp",
    },
  ];

  const handleDateFormatMenuClick: MenuProps["onClick"] = (e) => {
    setDateFormat(dateFormatItems.find((item) => item.key === e.key).label);
  };


  const [userAuthentication, setUserAuthentication] = useState<string>("Mandatory");
  const userAuthenticationItems: MenuProps["items"] = [
    {
      label: "Mandatory",
      key: "1",
    },
    {
      label: "Optional",
      key: "2",
    },

  ];

  const handleUserAuthenticationMenuClick: MenuProps["onClick"] = (e) => {
    setUserAuthentication(userAuthenticationItems.find((item) => item.key === e.key).label);
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
      <Card title={"General Settings"} style={{ width: "95%", height: "80%" }}>
        <div style={{width:"20%"}}>
            <h2>General</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <b>Language:</b>
          </label>
          <Dropdown
            overlayStyle={{
              maxHeight: 200,
              overflowX: "auto",
              overflowY: "auto",
              width: "200px",
              scrollbarWidth: "thin",
            }} // Added style for scrollable dropdown
            menu={{
              items: languageItems,
              onClick: handleLanguageMenuClick,
            }}
            trigger={["click"]}
          >
            <Button style={{ textAlign: "start" }}>
              {language}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <br></br>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <b>Date Format:</b>
          </label>
          <Dropdown
            overlayStyle={{
              maxHeight: 200,
              overflowX: "auto",
              overflowY: "auto",
              width: "200px",
              scrollbarWidth: "thin",
            }} // Added style for scrollable dropdown
            menu={{
              items: dateFormatItems,
              onClick: handleDateFormatMenuClick,
            }}
            trigger={["click"]}
          >
            <Button style={{ textAlign: "start" }}>
              {dateFormat}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        </div>
        
        <br></br>

        <div style={{width:"30%"}}>
            <h2>User Authentication</h2>

          <Dropdown
            overlayStyle={{
              maxHeight: 200,
              overflowX: "auto",
              overflowY: "auto",
              width: "200px",
              scrollbarWidth: "thin",
            }} 
            menu={{
              items: userAuthenticationItems,
              onClick: handleUserAuthenticationMenuClick,
            }}
            trigger={["click"]}
          >
            <Button style={{ textAlign: "start" }}>
              {userAuthentication}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        <br></br>

        <div style={{width:"30%",display:"flex",flexDirection:"column",alignItems:"start"}}>
            <h2>Input Fields</h2>
            <div style={{marginLeft:20}}>
                <h3>Cache Server</h3>
                <div style={{marginLeft:20}}>
                    <div>
                        <label>Hostname:</label>
                        <Input placeholder="host" defaultValue={"host"}/>
                    </div>
                    <div>
                        <label>Port Number:</label>
                        <Input placeholder="5001" defaultValue={"5001"}/>
                    </div>
                </div>
            </div>
            <div style={{marginLeft:20}}>
                <h3>Administration UI</h3>
                <div style={{marginLeft:20}}>
                    <div>
                        <label>Hostname:</label>
                        <Input placeholder="host" defaultValue={"host"}/>
                    </div>
                    <div>
                        <label>Port Number:</label>
                        <Input placeholder="5002" defaultValue={"5002"}/>
                    </div>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
}

export default GeneralSettings;
