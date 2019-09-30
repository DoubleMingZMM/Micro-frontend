import React, { useEffect } from 'react';
import { connect } from 'dva';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';

import Link from 'umi/link';
import history from 'umi/router';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.png';
import GlobalFooter from '@/components/GlobalFooter';
import IFrameChildren from './components/IFrameChildren';

const BasicLayout = props => {
  const { children, dispatch, apps, settings } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'menu/fetchMenuTree' });
      dispatch({ type: 'settings/fetchSettings' });
      window.messenger.sendSettings(settings);
    }
  }, []);

  const setSettings = config => {
    dispatch({ type: 'settings/postSettings', payload: config });
  };

  return (
    <>
      <ProLayout
        disableMobile
        menuProps={{
          mode: 'vertical',
        }}
        logo={logo}
        menuItemRender={(menuItemProps, defaultDom) =>
          menuItemProps.isUrl ? defaultDom : <Link to={menuItemProps.path}>{defaultDom}</Link>
        }
        rightContentRender={rightProps => <RightContent {...rightProps} {...settings} />}
        menuDataRender={() => apps}
        onMenuHeaderClick={() => history.push('/')}
        footerRender={GlobalFooter}
        {...props}
        {...settings}
      >
        {/* {iframeChildren(children, apps)} */}
        <IFrameChildren children={children} apps={apps} />
      </ProLayout>
      <SettingDrawer settings={settings} onSettingChange={config => setSettings(config)} />
    </>
  );
};

export default connect(({ menu, settings }) => ({
  apps: menu.apps,
  settings,
}))(BasicLayout);
