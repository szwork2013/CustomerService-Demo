// RongIMClient.setOnReceiveMessageListener({
//     onReceived: function (message) {}
// })


// imclient.ts : 
//     RongIMClient.setOnReceiveMessageListener
//     RongIMClient.bridge.setListener(listener);
// connect_client.ts:
//     export class Bridge
//     setListener(_changer: any)
//     Channel._ReceiveMessageListener = _changer;

//     export class Channel 
//     this.socket.on("message", self.handler.handleMessage);
//     this.self = self;
//     this.socket = Socket.getInstance().createServer();
//     constructor(address: any, cb: any, self: Client)

//     export class Client
//     this.channel = new Channel(Navigation.Endpoint, function() {
//                     Transportations._TransportType == Socket.WEBSOCKET && me.keepLive();
//                 }, this);
//     this.handler = new MessageHandler(this);

//     export class MessageHandler
//     this._onReceived = Channel._ReceiveMessageListener.onReceived;
//     onReceived(msg: any, pubAckItem?: any, offlineMsg?: boolean): void
//     RongIMClient._storageProvider.setItem(this._client.userId, MessageUtil.int64ToTimestamp(entity.dataTime));

一、SDK 接口
    // 初始化 制定存储方式
    RongIMClient.init(WebSQLDataProvider);

    // 设置连接状态监听器
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {}
    });

    // 设置消息监听器
    RongIMClient.setOnReceiveMessageListener({
        onReceived: function (message) {}
    });

    // socket 连接
    RongIMClient.connect(url, {
        onSuccess: function(userId) {},
        onError: function(errorCode){}
      });

    // 发送消息
    RongIMClient.sendMessage(conversationtype, targetId, msg, {
            onSuccess: function (message) {},
            onError: function (errorCode,message) {}
        }
    );

    // 获取指定消息
    RongIMClient.getMessage(msgId,{
        onSuccess:function(msg){},
        onError:function(){}
    });


    // 获取历史消息
    var conversationType = RongIMLib.ConversationType.PRIVATE; //私聊,其他会话选择相应的消息类型即可。
    var targetId = "xxx"; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
    var timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
    var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
    RongIMClient.getHistoryMessages(conversationType, targetId, timestrap, count, {
        // list => Message 数组。 
        // hasMsg => 是否还有历史消息可以获取 
        onSuccess: function(list, hasMsg) {},
        onError: function(error) {}
    });



    // 获取会话列表
    RongIMClient.getConversationList({
        // list => 会话列表集合。
        onSuccess: function(list) {},
        onError: function(error) {}
    },options);

    // 修改会话  获取-更新
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = "xxx";
    RongIMClient.getConversation(conversationType,targetId,{
        onSuccess:function(con){
            if (con) {
              con.conversationTitle="我是会话的Title";
              RongIMClient.updateConversation(con);
            }
        }
    });

    // 删除会话
    RongIMClient.removeConversation( ConversationType, targetId,{
        onSuccess:function(bool){},
        onError:function(error){}
    });

    // 清除会话列表
    RongIMClient.clearConversations(callback,[conversationTypes]);

    // 清除所有会话：
    RongIMClient.clearConversations({
        onSuccess:function(){},
        onError:function(error){}
    });

    // 清除指定会话：
    var conversationTypes = [RongIMLib.ConversationType.PRIVATE,RongIMLib.ConversationType.GROUP];
    RongIMClient.getInstance().clearConversations({
        onSuccess:function(){},
        onError:function(error){}
    },conversationTypes);


二、 Socket 接口


三、 消息处理接口


四、 消息、对话存储接口