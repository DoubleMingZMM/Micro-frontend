import React, { useEffect } from 'react';
import IFrame from 'react-iframe';
const IFrameChildren = props => {
  const { children, apps } = props;
  const { location } = children.props;

  const { pathname } = location;
  const app = apps.find(item => item.path === pathname);
  const { messenger } = window;
  useEffect(() => {
    if (app) {
      const id = `app-${app.key}`;
      const iframeEl = document.getElementById(id);
      messenger.addTarget(iframeEl.contentWindow, id);
    }
  }, [app, messenger]);
  if (!app) return <>{children}</>;
  const { url, key } = app;
  const id = `app-${key}`;
  return (
    <IFrame url={url} width="100%" id={id} display="block" allowFullScreen={true} frameBorder="0" />
  );
};

export default IFrameChildren;
