import React, { useState } from 'react';
import { Dropdown, Icon, Menu, Button, Modal } from 'antd';

const MoreAction = props => {
  const { onDelete, onDisable, onProxy } = props;
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    Modal.confirm({
      title: '警告',
      content: '是否确认删除',
      okText: '确认',
      cancelText: '取消',
      okButtonProps: () => onDelete(true),
    });
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleDelete}>删除</Menu.Item>
      <Menu.Item onClick={onDisable}>冻结</Menu.Item>
      <Menu.Item onClick={onProxy}>代理人</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button type="link">
        更多 <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default MoreAction;
