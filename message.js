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

// 一、SDK 接口

    RongIMClient.getUserInfo();

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


// 二、 Socket 接口


// 三、 消息处理接口


// 四、 消息、对话存储接口








// 五、场景介绍
/*
------------------------------------------------------------------------
客服第一次进入，显示客服头像、昵称、在线状态。对话列表为空，无正在对话聊天框
客服切换在线状态

客服第一次进入，无对话，第一个客户A接入，左侧会话列表显示一条会话，并有未读提示，客服点击该条会话，右侧显示聊天窗口，显示客户发送的内容，并可以进行正常聊天。

这时，又有一个客户B接入，左侧会话列表，再次添加一个会话，并有未读提示，客服点击该消息，与客户B进行聊天。

客户A发送过来消息，左侧会话列表提示客户A有新消息，客服正与客户B聊天，客户A又发送多条消息给客服，客服点击用户A的对话，查看消息。并与客户A进行交谈。

工作结束，客服切换在线状态为下线，关闭浏览器

------------------------------------------------------------------------

第二天，客服登录，状态为离线，切换状态为在线
左侧会话列表中，正在聊天页面选项卡下没有会话，切换至历史记录中，可以看到客户A和客户B两个会话，点击，可以看到昨天的聊天内容。
用户C发送消息过来，在左侧会话列表提示有新消息，用户切回，正在聊天选项卡，点击用户C的会话，查看消息，进行聊天。
用户B发来消息，客服进行查看，聊天，切回历史消息，用户B的会话在历史记录中不显示。
在历史记录中，点击客户A的会话，发送消息，客户A的会话从历史记录中移除，显示在正在聊天的会话列表中。


正在聊天过程中，客服误点关闭，重新登录，正在进行的会话，显示，历史记录，显示

客服转接，转接成功以后，移除正在进行的对话，移除历史记录

*/









// q
