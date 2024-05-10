import { Card,  FloatButton, Space, Statistic, Table, TableColumnsType } from "antd";
import {  Progress, Tooltip } from "antd";
import { BarChartOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Package, bytesToSize } from "../package-list/PackageList";
import newRequest from "../../utils/newRequest";
import { useEffect, useState } from "react";
interface Notification{
    notificationContent:string,
    notificationType:String,
}

function Notifications() {

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setLoading(true);

    // Fetch packages
    newRequest
      .get("/notification")
      .then((response) => {
        setNotifications(response.data.notifications);

      })
      .finally(() => {
        setLoading(false);
      });

   
  }, []);

  return (
    <div style={{ width: "100%",paddingTop:"30px" }}>
      <Space direction="vertical" size="large" style={{ display: "flex",flexDirection:"column" }}>
          {
            notifications&& notifications.map((notification:Notification) =>{
                return (<Card title={notification.notificationType} hoverable={true} style={{  width: "90%" }}>
               {notification.notificationContent}
              </Card>)
            })
          }
      </Space>

    </div>
  );
}

export default Notifications;
