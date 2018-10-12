var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalObject = (function () {
    function GlobalObject() {
    }
    Object.defineProperty(GlobalObject, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new GlobalObject();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalObject.prototype, "isNative", {
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalObject.prototype, "isWeb", {
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  针对小游戏做此次修改
     *	注：目前版本所有皮肤中使用<ns1:/>标签引用的对象都要暴露到全局下
     */
    GlobalObject.prototype.initObject = function () {
        if (this.isNative)
            return;
    };
    /**
     *  添加window全局对象 小游戏
     */
    GlobalObject.prototype.addGlobalObj = function (cls) {
        if (this.isNative)
            return;
        var str = egret.getQualifiedClassName(cls);
        window[str] = cls;
    };
    Object.defineProperty(GlobalObject.prototype, "tempPos", {
        /**
         * 获取一个坐标转换的point对象
         */
        get: function () {
            if (!this._pos)
                this._pos = new egret.Point();
            return this._pos;
        },
        enumerable: true,
        configurable: true
    });
    return GlobalObject;
}());
__reflect(GlobalObject.prototype, "GlobalObject");
