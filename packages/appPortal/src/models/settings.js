export const Layout = {
  topmenu: 'topmenu',
  sidemenu: 'sidemenu',
};

export const NavTheme = {
  light: 'light',
  dark: 'dark',
};

export const ContentWidth = {
  Fluid: 'Fluid',
  Fixed: 'Fixed',
};

export default {
  namespace: 'settings',
  state: {
    navTheme: NavTheme.dark,
    primaryColor: '#1890FF',
    layout: Layout.topmenu,
    contentWidth: ContentWidth.Fluid,
    fixedHeader: true,
    autoHideHeader: false,
    fixSiderbar: false,
    menu: {
      locale: true,
    },
    title: '微前端门户',
    pwa: false,
    iconfontUrl: '',
    collapse: true,
    language: 'zh-CN',
  },
  effects: {
    *fetchSettings(_, { call, put }) {
      // TODO 从后台请求数据
      let data = JSON.parse(yield localStorage.getItem('settings'));
      if (!data) return;
      yield put({ type: 'save', payload: data });
    },
    *postSettings({ payload }, { call, put }) {
      yield put({ type: 'save', payload });
    },
  },
  reducers: {
    save(state, action) {
      localStorage.setItem('settings', JSON.stringify(action.payload));
      const { payload } = action;
      const settings = {
        ...state,
        ...payload,
      };
      // const { store } = window.appPortal;
      // store.settings = settings;
      window.messenger.sendSettings({
        ...settings,
        layout: settings.layout === Layout.topmenu ? Layout.sidemenu : Layout.topmenu,
      });
      return settings;
    },
  },
};
