import { Input, Select } from 'antd';
import React from 'react'

function LinkInput() {
    const { Option } = Select;

    const selectBefore = (
        <Select defaultValue="http://">
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
        </Select>
      );
  return (

    <Input addonBefore={selectBefore} addonAfter=".com" defaultValue="distropackagemanager" />

  )
}

export default LinkInput
