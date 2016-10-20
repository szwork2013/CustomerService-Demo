RongIMClient.setOnReceiveMessageListener({
    onReceived: function (message) {}
})


imclient.ts : 
    RongIMClient.setOnReceiveMessageListener
    RongIMClient.bridge.setListener(listener);
connect_client.ts:
    export class Bridge
    setListener(_changer: any)
    Channel._ReceiveMessageListener = _changer;

    export class Channel 
    this.socket.on("message", self.handler.handleMessage);
    this.self = self;
    this.socket = Socket.getInstance().createServer();
    constructor(address: any, cb: any, self: Client)

    export class Client
    this.channel = new Channel(Navigation.Endpoint, function() {
                    Transportations._TransportType == Socket.WEBSOCKET && me.keepLive();
                }, this);
    this.handler = new MessageHandler(this);

    export class MessageHandler
    this._onReceived = Channel._ReceiveMessageListener.onReceived;
    onReceived(msg: any, pubAckItem?: any, offlineMsg?: boolean): void
    RongIMClient._storageProvider.setItem(this._client.userId, MessageUtil.int64ToTimestamp(entity.dataTime));
    





