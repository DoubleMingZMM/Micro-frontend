import { routerRedux } from 'dva/router';
import { postToken } from '@/services/auth';
import store from 'store';
import { getPageQuery } from '@/utils/utils';

const initialState = () => ({});

export default {
  namespace: 'login',
  state: initialState(),
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(postToken, payload);
      yield put({
        type: 'changeAuthData',
        payload: res,
      });
      if (res) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        // url 中有重定向地址
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          // 重定向地址与鉴权站点同域
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            // 重定向地址为哈希路由
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
  },
  reducers: {
    changeAuthData(state, action) {
      const { payload } = action;
      store.set('authData', payload);
      return { ...state, ...payload };
    },
  },
};
