/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';
import { notification } from 'antd';
// import store from 'store';

export const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
// eslint-disable-next-line no-restricted-globals

const errorHandler = async error => {
  const parentWindow = window.parent;
  const { location } = parentWindow;
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    await notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    // 用户token 过期调登录
    if (response.status === 401) {
      let redirect = window.location.href;
      if (redirect.indexOf('redirect') === -1) {
        redirect = location.origin;
        console.error('不能多重重定向');
      }
      location.href = `${location.origin}/auth/login?redirect=${redirect}`;
      return response;
    }
  } else if (!response) {
    await notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};
/**
 * 请求拦截
 */
request.interceptors.request.use((url, options) => {
  const { params, headers } = options;
  // const parentWindow = window.parent;
  const { localStorage } = window;
  const authData = JSON.parse(localStorage.getItem('authData')) || {};
  if (authData.access_token && !headers.Authorization) {
    headers.Authorization = `Bearer ${authData.access_token}`;
  }
  // 分页参数名称修改
  if (params && (params.currentPage || params.pageSize)) {
    options.page = params.currentPage;
    options.size = params.pageSize;
    delete options.currentPage;
    delete options.pageSize;
  }

  return {
    url,
    options,
  };
});

/**
 * 配置 extendRequest 请求时的默认参数
 */

const headers = { 'Content-Type': 'application/json', Authorization: '' };
const extendRequest = extend({
  prefix: process.env.API_PREFIX,
  // errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers,
});

/**
 * 刷新 token 的请求 service
 * @param {*} token refresh_token
 */
const refreshToken = async () => {
  // const parentWindow = window.parent;
  const { localStorage } = window;
  const authData = JSON.parse(localStorage.getItem('authData')) || {};
  await extendRequest.post('/auth/oauth/token', {
    params: {
      grant_type: 'token',
      scope: 'web',
      refresh_token: authData.refresh_token,
    },
  });
};
/**
 * 对于状态码实际是 200 的错误
 */
export const TOKEN_TIMEOUT_STATUS = 1002;
request.interceptors.response.use(async (response, options) => {
  let localResponse = await response.clone().json();
  let localOptions = JSON.parse(JSON.stringify(options));

  if (response.status !== 200) {
    return await errorHandler({ response });
  }
  // token 过期刷新 token
  if (localResponse) {
    // 分页参数统一处理成 antd 标准参数
    const localData = localResponse.data;
    if (localData && localData.pagination) {
      const { total, current, size } = localData.pagination;
      localData.pagination = {
        total,
        currentPage: current,
        pageSize: size,
      };
    }
    // 刷新 token
    if (localResponse.code === TOKEN_TIMEOUT_STATUS) {
      const { url } = localResponse;
      const { data } = await refreshToken();
      const parentWindow = window.parent;
      const { localStorage } = parentWindow;
      localStorage.setItem('authData', JSON.stringify(data));
      return await extendRequest(url, localOptions);
    }
  }
  return localResponse;
});

export default extendRequest;
