/**
 * title: 用户管理
 * icon: smile
 */
import React from 'react';
import { Avatar, Badge } from 'antd';
import Tablex from '@/components/Tablex';
import { getUsers } from '@/services/upms';

export const enabledMap = new Map([
  [true, { status: 'success', text: '可用' }],
  [false, { status: 'error', text: '不可用' }],
]);

const Page = props => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: url => <Avatar src={url} alt="头像" icon="user" />,
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: enabled => {
        const { status, text } = enabledMap.get(enabled);
        return <Badge status={status} text={text} />;
      },
    },
  ];
  const searchOptions = [
    {
      title: '用户名',
      type: 'input',
      keyword: 'username',
      predicates: ['等于'],
      defaultPredicate: '等于',
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const actions = [
    {
      label: '编辑',
      key: 'edit',
      action(record) {
        console.log(record);
      },
    },
    {
      label: '更多',
      children: [
        {
          label: '删除',
          key: 'delete',
          action(record) {
            console.log('删除', record);
          },
        },
      ],
    },
  ];

  return (
    <>
      <Tablex
        name="userList"
        rowKey="username"
        columns={columns}
        searchOptions={searchOptions}
        service={getUsers}
        actions={actions}
        tableProps={{
          rowSelection: rowSelection,
        }}
      />
    </>
  );
};

export default Page;
