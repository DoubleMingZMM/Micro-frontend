export default class Target {
  // 窗口上下文
  contentWindow: any;
  // 窗口名称
  frame: string;

  constructor(contentWindow: any, frame: string) {
    this.contentWindow = contentWindow;
    this.frame = frame;
  }

  /**
   * 发送消息
   * 装箱操作, 将消息
   * @param message 消息内容
   */
  send(message: any) {
    this.contentWindow.postMessage({
      frame: this.frame,
      message
    }, '*');
  }
}
