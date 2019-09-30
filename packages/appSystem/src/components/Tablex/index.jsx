import React, { useState, useEffect } from 'react';
import Tablex from 'hbasic-tablex';
import { Menu, Dropdown, Icon } from 'antd';

/**
 * 遍历操作列配置,渲染出操作列
 * @param {*} actions 操作列配置
 * @param {*} record 数据行
 */
const renderActions = (actions, record) => {
  return (
    <span>
      {actions.map((action, i) => {
        if (action.children) {
          const menu = (
            <Menu>
              {action.children.map(child => {
                const onClick = () => {
                  child.action && child.action(record);
                };
                return (
                  <Menu.Item key={Math.random()}>
                    <a onClick={onClick}>{child.label}</a>
                  </Menu.Item>
                );
              })}
            </Menu>
          );
          return (
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                {action.label} <Icon type="down" />
              </a>
            </Dropdown>
          );
        } else {
          const onClick = () => {
            action.action && action.action(record);
          };
          return [
            <a onClick={onClick}>{action.label}</a>,
            i === 0 && <span className="ant-divider" />,
          ];
        }
      })}
    </span>
  );
};
/**
 * 生成操作列组件
 */
const generateActionColumns = actions => {
  return {
    key: 'actions',
    title: '操作',
    render: record => {
      return renderActions(actions, record);
    },
  };
};

export default props => {
  const { service, actions, locale = 'zhCN' } = props;
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(10);

  const columns = actions ? [...props.columns, generateActionColumns(actions)] : props.columns;

  const handleOnchange = async (searchQuery, pagination, filters, sorter, extra) => {
    setLoading(true);
    const { currentPage, pageSize } = pagination;
    const queryObj = {};
    if (searchQuery && searchQuery.length) {
      const reducer = (acc, cur) => {
        const { keyword, value } = cur;
        acc[keyword] = value;
      };
      searchQuery.reduce(reducer, queryObj);
    }
    try {
      const res = await service(pageSize, currentPage, queryObj);
      setDataSource(res.data);
      setTotal(res.pagination.total);
    } catch (err) {}

    setLoading(false);
  };

  useEffect(() => {
    handleOnchange([], { currentPage: 1, pageSize: 10, total });
  }, []);

  return (
    <Tablex
      {...props}
      dataSource={dataSource}
      onChange={handleOnchange}
      locale={locale}
      loading={loading}
      total={total}
      columns={columns}
    />
  );
};
