import { DownOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, Input, MenuProps, Space } from 'antd'
import { useState } from 'react';


function CacheAdministration() {
    const [purgingPolicy, setPurgingPolicy] = useState<string>("Least Recently Used (LRU)");
    const handleMenuClick: MenuProps["onClick"] = (e) => {
        setPurgingPolicy(items.find(item => item.key===e.key).label);
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

      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
  return (
    <div style={{display:"flex",flexDirection:"column",width:"80%",justifyContent:"center",alignItems:"center"}}>
    <div style={{ padding: 20,  width: "80%",height:"80%" }}>
        <Card>
      <h2>Cache Administration Settings</h2>
      <div style={{ width: "70%" ,display:"flex",flexDirection:"column",gap:"10px"}}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ width: "50%" }}>
            <label>Eviction Policy:</label>
          </div>

          <div style={{ width: "50%" }}>
          <Dropdown menu={menuProps} trigger={["click"]}>
              <Button style={{textAlign:"start"}}>
                <Space>
                  {purgingPolicy}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>



        <Button type="primary">Save</Button>

      </div>
      </Card>
    </div>
    </div>
  )
}

export default CacheAdministration
