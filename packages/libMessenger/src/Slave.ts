import Messenger from './model/Messenger';
import constant from './model/constant';

declare var window: any;
export default class Slave extends Messenger {
  private _oldUrl = window.location.href;

  constructor(frame: string) {
    super(frame);
    if(!window.app) window.app = {}
    // 自动注册监听父窗口
    this.addTarget(window.parent, 'master');
    this.onFrameHashChange();
    this.dispatchGetAuthData();
    this.listenMasterHashChange();
    this.listenSendAuthData();
    this.listenSendSettings();
    // historyEvent();
  }
  /**
   * 子窗口 hash 变更向父窗口广播
   */
  onFrameHashChange(){

    const checkURLChange = (currentLength: string) =>{
          if(currentLength !== this._oldUrl){
              this._oldUrl = currentLength;
              const {hash, pathname} = window.location;
              this.send({type: constant.frameRouteChange, payload: `${pathname}${hash}`})
          }
          setInterval(function() {
              checkURLChange(window.location.href);
          }, 0);
      }
      checkURLChange(window.location.href);
  }
  /**
   * 触发获取鉴权信息
   */
  dispatchGetAuthData(){
    this.send({type: constant.getAuthData})
  }
  /**
   * 监听父窗口的哈希路由变化, 改变路由
   */
  listenMasterHashChange(){
    this.listen((message: any) => {
      if(message && message.type && message.type === constant.masterRouteChange && message.payload) {
        if(window.location.pathname !== message.payload)window.location.pathname = message.payload;
        this.dispatchGetAuthData();
      }
    })
  }
  /**
   * 监听父组件发送的 authData 存到本地
   */
  listenSendAuthData(){
    this.listen((message: any) => {
      console.log(message);
      if(message && message.type && message.type === constant.sendAuthData) {
        window.localStorage.setItem('authData', JSON.stringify(message.payload))
      }
    })
  }
  /**
   * 监听父窗口发送的setting 配置
   */
  listenSendSettings() {
    this.listen((message: any) => {
      if(message && message.type && message.type === constant.sendSettings) {
        window.localStorage.setItem('settings', JSON.stringify(message.payload))
        window.app.settings=message.payload;
        window.dispatchEvent(new CustomEvent('sendSettings', {'detail': message.payload}))
      }
    })
  }

}
