import "antd/es/notification/style";
import _notification from "antd/es/notification";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';
// import store from 'store';
export var codeMessage = {
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
  504: '网关超时。'
};
/**
 * 异常处理程序
 */
// eslint-disable-next-line no-restricted-globals

var errorHandler =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(error) {
    var parentWindow, location, response, errorText, status, url, redirect;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parentWindow = window.parent;
            location = parentWindow.location;
            response = error.response;

            if (!(response && response.status)) {
              _context.next = 15;
              break;
            }

            errorText = codeMessage[response.status] || response.statusText;
            status = response.status, url = response.url;
            _context.next = 8;
            return _notification.error({
              message: "\u8BF7\u6C42\u9519\u8BEF ".concat(status, ": ").concat(url),
              description: errorText
            });

          case 8:
            if (!(response.status === 401)) {
              _context.next = 13;
              break;
            }

            redirect = window.location.href;

            if (redirect.indexOf('redirect') === -1) {
              redirect = location.origin;
              console.error('不能多重重定向');
            }

            location.href = "".concat(location.origin, "/auth/login?redirect=").concat(redirect);
            return _context.abrupt("return", response);

          case 13:
            _context.next = 18;
            break;

          case 15:
            if (response) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return _notification.error({
              description: '您的网络发生异常，无法连接服务器',
              message: '网络异常'
            });

          case 18:
            return _context.abrupt("return", response);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function errorHandler(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 请求拦截
 */


request.interceptors.request.use(function (url, options) {
  var params = options.params,
      headers = options.headers; // const parentWindow = window.parent;

  var _window = window,
      localStorage = _window.localStorage;
  var authData = JSON.parse(localStorage.getItem('authData')) || {};

  if (authData.access_token && !headers.Authorization) {
    headers.Authorization = "Bearer ".concat(authData.access_token);
  } // 分页参数名称修改


  if (params && (params.currentPage || params.pageSize)) {
    options.page = params.currentPage;
    options.size = params.pageSize;
    delete options.currentPage;
    delete options.pageSize;
  }

  return {
    url: url,
    options: options
  };
});
/**
 * 配置 extendRequest 请求时的默认参数
 */

var headers = {
  'Content-Type': 'application/json',
  Authorization: ''
};
var extendRequest = extend({
  prefix: process.env.API_PREFIX,
  // errorHandler, // 默认错误处理
  credentials: 'include',
  // 默认请求是否带上cookie
  headers: headers
});
/**
 * 刷新 token 的请求 service
 * @param {*} token refresh_token
 */

var refreshToken =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var _window2, localStorage, authData;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // const parentWindow = window.parent;
            _window2 = window, localStorage = _window2.localStorage;
            authData = JSON.parse(localStorage.getItem('authData')) || {};
            _context2.next = 4;
            return extendRequest.post('/auth/oauth/token', {
              params: {
                grant_type: 'token',
                scope: 'web',
                refresh_token: authData.refresh_token
              }
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function refreshToken() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 对于状态码实际是 200 的错误
 */


export var TOKEN_TIMEOUT_STATUS = 1002;
request.interceptors.response.use(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(response, options) {
    var localResponse, localOptions, localData, _localData$pagination, total, current, size, url, _ref4, data, parentWindow, localStorage;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return response.clone().json();

          case 2:
            localResponse = _context3.sent;
            localOptions = JSON.parse(JSON.stringify(options));

            if (!(response.status !== 200)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return errorHandler({
              response: response
            });

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
            if (!localResponse) {
              _context3.next = 23;
              break;
            }

            // 分页参数统一处理成 antd 标准参数
            localData = localResponse.data;

            if (localData && localData.pagination) {
              _localData$pagination = localData.pagination, total = _localData$pagination.total, current = _localData$pagination.current, size = _localData$pagination.size;
              localData.pagination = {
                total: total,
                currentPage: current,
                pageSize: size
              };
            } // 刷新 token


            if (!(localResponse.code === TOKEN_TIMEOUT_STATUS)) {
              _context3.next = 23;
              break;
            }

            url = localResponse.url;
            _context3.next = 15;
            return refreshToken();

          case 15:
            _ref4 = _context3.sent;
            data = _ref4.data;
            parentWindow = window.parent;
            localStorage = parentWindow.localStorage;
            localStorage.setItem('authData', JSON.stringify(data));
            _context3.next = 22;
            return extendRequest(url, localOptions);

          case 22:
            return _context3.abrupt("return", _context3.sent);

          case 23:
            return _context3.abrupt("return", localResponse);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}());
export default extendRequest;