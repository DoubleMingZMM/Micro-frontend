import React, { useState, useEffect } from 'react';
import ProLayout, { PageHeaderWrapper } from '@ant-design/pro-layout';
import Link from 'umi/link';
import history from 'umi/router';

const BasicLayout = props => {
  const { children } = props;

  const [collapsed, handleMenuCollapse] = useState(true);
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')));

  useEffect(() => {
    window.addEventListener('sendSettings', e => {
      setSettings(e.detail);
    });
  }, []);
  return (
    <>
      <ProLayout
        disableMobile
        logo={() => <></>}
        menuProps={{
          mode: 'vertical',
        }}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '系统管理',
          },
          ...routers,
        ]}
        menuItemRender={(menuItemProps, defaultDom) =>
          menuItemProps.isUrl ? defaultDom : <Link to={menuItemProps.path}>{defaultDom}</Link>
        }
        onMenuHeaderClick={() => history.push('/')}
        footerRender={() => <></>}
        {...props}
        {...settings}
      >
        <PageHeaderWrapper>{children}</PageHeaderWrapper>
      </ProLayout>
    </>
  );
};

export default BasicLayout;
