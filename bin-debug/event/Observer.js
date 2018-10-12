var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Observer = (function () {
    /**
     * 构造函数
     */
    function Observer() {
        this.dict = null;
        this.type = 0;
        this.dict = {};
        this.eVec = new Array();
    }
    Object.defineProperty(Observer, "instance", {
        get: function () {
            return Observer._instance ? Observer._instance : (Observer._instance = new Observer());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     *
     */
    Observer.prototype.addListener = function (type, listener, listenerObj) {
        var arr = this.dict[type];
        if (arr == null) {
            arr = new Array();
            this.dict[type] = arr;
        }
        //检测是否已经存在
        var i = 0;
        var len = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                return;
            }
        }
        arr.push([listener, listenerObj]);
    };
    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    Observer.prototype.removeListener = function (type, listener, listenerObj) {
        var arr = this.dict[type];
        if (arr == null) {
            return;
        }
        var i = 0;
        var len = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.dict[type] = null;
            delete this.dict[type];
        }
    };
    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    Observer.prototype.removeAll = function (listenerObj) {
        var keys = Object.keys(this.dict);
        for (var i = 0, len = keys.length; i < len; i++) {
            var type = keys[i];
            var arr = this.dict[type];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }
            if (arr.length == 0) {
                this.dict[type] = null;
                delete this.dict[type];
            }
        }
    };
    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     *
     */
    Observer.prototype.dispatch = function (type) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (this.dict[type] == null) {
            return;
        }
        var vo = new MessageVo();
        vo.type = type;
        vo.param = param;
        if (this.type == 0) {
            this.eVec.push(vo);
        }
        else if (this.type == 1) {
            this.dealMsg(vo);
        }
        else {
            console.log("Observer未实现的类型");
        }
    };
    /**
     * 处理一条消息
     * @param msgVo
     */
    Observer.prototype.dealMsg = function (msgVo) {
        var listeners = this.dict[msgVo.type];
        var i = 0;
        var len = listeners.length;
        var listener = null;
        while (i < len) {
            listener = listeners[i];
            listener[0].apply(listener[1], msgVo.param);
            if (listeners.length != len) {
                len = listeners.length;
                i--;
            }
            i++;
        }
        msgVo.dispose();
        msgVo = null;
    };
    Observer._instance = null;
    return Observer;
}());
__reflect(Observer.prototype, "Observer");
var MessageVo = (function () {
    function MessageVo() {
        this.type = null;
        this.param = null;
    }
    MessageVo.prototype.dispose = function () {
        this.type = null;
        this.param = null;
    };
    return MessageVo;
}());
__reflect(MessageVo.prototype, "MessageVo");
