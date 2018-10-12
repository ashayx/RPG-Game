var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "showLog", {
        get: function () {
            return this._showLog;
        },
        set: function (boo) {
            this._showLog = boo;
            log = Utils.showLog ? console.log.bind(console) : function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Utils._showLog = true;
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
var log = Utils.showLog ? console.log.bind(console) : function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
};
