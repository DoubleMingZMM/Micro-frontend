import Messenger from '@hbasic-mfe/lib-messenger';

const messenger = new Messenger.Master();

messenger.listen(msg => {
  console.log('父应用收到消息:', msg);
});

window.messenger = messenger;
