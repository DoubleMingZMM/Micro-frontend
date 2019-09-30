/**
 * title: 用户组
 */
import React from 'react';
import { Tag } from 'antd';
import Tablex from '@/components/Tablex';
import { getRoles } from '@/services/upms';

export const groupTypeMap = new Map([
  ['organization', { color: 'blue', text: '组织' }],
  ['project', { color: 'cyan', text: '项目' }],
]);

const Page = props => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '分组类型',
      dataIndex: 'groupType',
      key: 'groupType',
      render: groupType => {
        if (!groupType) return;
        const { color, text } = groupTypeMap.get(groupType);
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];
  const searchOptions = [
    {
      title: '角色名',
      type: 'input',
      keyword: 'name',
      predicates: ['等于'],
      defaultPredicate: '等于',
    },
    {
      title: '分组类型',
      type: 'select',
      keyword: 'code',
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
        service={getRoles}
        actions={actions}
        tableProps={{
          rowSelection: rowSelection,
        }}
      />
    </>
  );
};

export default Page;
