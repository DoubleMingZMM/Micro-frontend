/*
 * @Author: liuchao
 * @since: 2019-09-17 14:22:30
 * @LastAuthor: liuchao
 * @lastTime: 2019-09-18 15:58:19
 * @Description: 用户列表模型
 * @Email: liuchao@hua-cloud.com.cn
 * @Company: hua-cloud.com.cn
 */
import { getUsers } from '@/services/upms';

const initialState = () => {
  return {
    list: [],
    pagination: {
      size: 10,
      current: 1,
      total: 0,
    },
    detail: {},
  };
};

const model = {
  namespace: 'users',
  state: initialState(),
  effects: {
    *fetchList(payload, { put, call }) {
      const { data, pagination } = yield call(getUsers);
      yield put({ type: 'saveList', payload: { list: data, pagination } });
    },
  },
  reducers: {
    saveList(state, action) {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default model;
