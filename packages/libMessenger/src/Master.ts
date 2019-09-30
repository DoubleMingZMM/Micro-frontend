import Messenger from "./model/Messenger";
import constant from "./model/constant";
// import historyEvent from './events/history';

declare var window: any;
export default class Master extends Messenger {
  constructor() {
    super("master");
    this.onhashchange();
    this.listenGetAuthData();
    this.listenFrameRouterChange();
    // historyEvent();
  }
  // 父路由 hash 变更事件广播给子路由
  onhashchange() {
    window.addEventListener(
      "hashchange",
      (event: any) => {
        const childrenPathName = location.hash.replace("#", "") || "/";
        this.send({
          type: constant.masterRouteChange,
          payload: childrenPathName
        });
      },
      false
    );
  }
  /**
   * 获取鉴权数据
   */
  listenGetAuthData() {
    this.listen((message: any) => {
      if (message.type && message.type === constant.getAuthData) {
        const authData = window.localStorage.getItem("authData");
        this.send({
          type: constant.sendAuthData,
          payload: JSON.parse(authData)
        });
      }
    });
  }
  /**
   * 监听子窗口路由变化
   */
  listenFrameRouterChange() {
    this.listen((message: any) => {
      if (
        message &&
        message.type &&
        message.type === constant.frameRouteChange
      ) {
        window.location.hash = message.payload;
      }
    });
  }
  /**
   * 广播配置
   */
  sendSettings(settings: any) {
    this.send({ type: "sendSettings", payload: settings });
  }
}
