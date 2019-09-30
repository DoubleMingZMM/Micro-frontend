import { getMenuTree } from '@/services/upms';
import _ from 'lodash';

const Status = {
  hidden: 'hidden',
  show: 'show',
  disabled: 'disabled',
};
const Type = {
  system: 'system',
  menu: 'menu',
  element: 'element',
};
const translateApps = tree => {
  const apps = _.cloneDeep(tree)
    .filter(item => item.type === Type.system && item.status === Status.show)
    .map(item => {
      const { icon, path, route, name, sort, routeName } = item;
      return {
        icon,
        path: route,
        url: path,
        name,
        sort,
        isUrl: false,
        key: routeName,
      };
    });
  return _.sortBy(apps, ['sort']);
};
export default {
  namespace: 'menu',
  state: {
    tree: [],
    apps: [],
  },
  effects: {
    *fetchMenuTree(_, { call, put }) {
      const { data } = yield call(getMenuTree);
      yield put({
        type: 'saveMenu',
        payload: data,
      });
    },
  },
  reducers: {
    saveMenu(state, action) {
      const { payload } = action;
      return {
        ...state,
        tree: payload,
        apps: translateApps(payload),
      };
    },
  },
};
