/**
 * title: 菜单管理
 */
import React, { useEffect } from 'react';
import { Avatar, Badge, Icon } from 'antd';
import Tablex from '@/components/Tablex';
import { getMenus } from '@/services/upms';

export const enabledMap = new Map([
  [true, { status: 'success', text: '可用' }],
  [false, { status: 'error', text: '不可用' }],
]);

const Page = props => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标志',
      dataIndex: 'routeName',
      key: 'routeName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      render: icon => <Icon type={icon} />,
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
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
        service={getMenus}
        actions={actions}
        tableProps={{
          rowSelection: rowSelection,
          pagination: false,
        }}
      />
    </>
  );
};

export default Page;
