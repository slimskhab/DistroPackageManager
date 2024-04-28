import { Input, Select } from 'antd';

function LinkInput() {
    const { Option } = Select;

    const selectBefore = (
        <Select defaultValue="http://">
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
        </Select>
      );
  return (

    <Input addonBefore={selectBefore} addonAfter=":5001" defaultValue="distropackagemanager" />

  )
}

export default LinkInput
