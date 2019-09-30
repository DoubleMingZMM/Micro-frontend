import Target from './Target';

declare var window: any;
export default class Messenger {
  // 窗口名称
  frame: string;
  // 监听的目标窗口对象映射
  targets: {[key: string]: Target};
  // 监听的队列
  listenFunc: Function[]

  constructor(frame: string) {
    this.frame = frame;
    this.targets = {};
    this.listenFunc = [];
    this.initListen();
  }
  /**
   * 初始化监听
   * 这是消息发送的关键
   */
  initListen() {
    const generalCallback = (event: any) => {
      // 拆箱操作, 所有通过 postMessage 的data 结构都走的 target.send 方法, 装箱有 project 和 frame, message 三个属性
      const { frame, message} = event.data;
      for(let i = 0; i < this.listenFunc.length; i++) {
        if(frame === this.frame) {
          this.listenFunc[i](message);
        }
      }
    }
    window.addEventListener('message', generalCallback, false);
  }
  /**
   * 监听
   * @param callback 回调函数
   */
  listen(callback: Function) {
    let i =0;
    let len = this.listenFunc.length;
    let cbIsExist=false;
    for(;i<len;i++) {
      if(this.listenFunc[i] == callback) {
        cbIsExist = true;
        break;
      }
    }
    if(!cbIsExist) {
      this.listenFunc.push(callback);
    }
  }
  /**
   * 清除监听
   * 谨慎操作, 一旦执行, postMessage 就没有监听,这个消息通道就失去作用
   */
  clear() {
    this.listenFunc = [];
  }
  /**
   * 添加连接创投
   * @param contentWindow 窗口上下文
   * @param frame 窗口名称
   */
  addTarget(contentWindow: any, frame: string){
    const target = new Target(contentWindow, frame)
    this.targets[frame] = target;
  }
  /**
   * 发送消息
   * @param message 消息体
   */
  send(message: any) {
    let targets = this.targets, target;
    for(target in targets) {
      if(targets.hasOwnProperty(target)){
        targets[target].send(message);
      }
    }
  }
}
