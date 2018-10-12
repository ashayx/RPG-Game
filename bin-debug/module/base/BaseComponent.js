var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by Ink on 2018/1/8
 */
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super.call(this) || this;
        _this.isCreate = false;
        _this.waitTime = 0; //按钮点击等待的时间
        egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, _this.onUIChange, _this);
        _this.width = App.UIAdapter.MainShowWidth;
        _this.height = App.UIAdapter.MainShowHeight; //App.UIAdapter.StageHeight;
        return _this;
        //App.MessageCenter.addListener(App.UI_EVENT_CHANGE, this.onUIChange, this);
    }
    BaseComponent.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseComponent.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.isCreate = true;
        this.initData();
        this.initUI();
        this.initListener();
    };
    /**
     * 添加需要适配的控件
     * @param type 适配类型  AdaptiveType
     */
    BaseComponent.prototype.adapComponent = function (component, type) {
        if (!this.componentArr)
            this.componentArr = [];
        if (!this.componentArr[type])
            this.componentArr[type] = [];
        var index = this.componentArr[type].indexOf(component);
        if (index == -1)
            this.componentArr[type].push(component);
        App.UIAdapter.adaptiveComponent(component, type);
    };
    BaseComponent.prototype.onUIChange = function () {
        var _this = this;
        this.width = App.UIAdapter.MainShowWidth;
        this.height = App.UIAdapter.MainShowHeight;
        log(this.componentArr, this.width, this.height);
        if (!this.componentArr)
            return;
        this.componentArr.forEach(function (arr, type) {
            arr.forEach(function (comp, j) {
                _this.adapComponent(comp, type);
            }, _this);
        }, this);
    };
    BaseComponent.prototype.initData = function () {
        this.addEventBtnArr = [];
        this.effectArr = [];
    };
    BaseComponent.prototype.initUI = function () { };
    BaseComponent.prototype.initListener = function () { };
    BaseComponent.prototype.removeListener = function () {
        egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onUIChange, this);
        while (this.addEventBtnArr && this.addEventBtnArr.length > 0) {
            var btn = this.addEventBtnArr.shift();
            if (btn)
                this.removeBtnClick(btn);
        }
    };
    /**
     * 添加按钮点击事件
     * @param btn 要添加事件的对象
     * @param isEffect 是否启用特效
     */
    BaseComponent.prototype.addBtnClick = function (btn, isEffect) {
        if (isEffect === void 0) { isEffect = false; }
        if (btn && this.addEventBtnArr.indexOf(btn) == -1) {
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addEventBtnArr.push(btn);
            if (isEffect) {
                this.effectArr.push(btn.hashCode);
                btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
                btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
                btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
                var w = btn.width;
                var h = btn.height;
                var w_half = w >> 1;
                var h_half = h >> 1;
                btn.x += w_half - btn.anchorOffsetX;
                btn.y += h_half - btn.anchorOffsetY;
                btn.anchorOffsetX = w_half;
                btn.anchorOffsetY = h_half;
            }
        }
    };
    BaseComponent.prototype.removeBtnClick = function (btn) {
        if (!btn)
            return;
        var index = this.addEventBtnArr.indexOf(btn);
        if (index != -1) {
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addEventBtnArr.splice(index, 1);
        }
        index = this.effectArr.indexOf(btn.hashCode);
        if (index != -1) {
            egret.Tween.removeTweens(btn);
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
            btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
            btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
            this.effectArr.splice(index, 1);
        }
    };
    BaseComponent.prototype.onClick = function (evt, waitTime) {
        if (waitTime === void 0) { waitTime = this.waitTime; }
        var btn = evt.currentTarget;
        if (waitTime > 0) {
            btn.touchEnabled = false;
            // App.GlobalFun.wait(waitTime).then(() => { btn.touchEnabled = true });
        }
        // App.SoundManager.playEffect(SoundResConst.click);
    };
    BaseComponent.prototype.onBtnEffect = function (evt) {
        var btn = evt.currentTarget;
        egret.Tween.removeTweens(btn);
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            egret.Tween.get(btn).to({ scaleX: 0.8, scaleY: 0.8 }, 200, egret.Ease.quadOut);
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END || evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        }
    };
    BaseComponent.prototype.updateView = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseComponent.prototype.destroy = function () {
        this.removeListener();
        this.componentArr = null;
        this.effectArr = null;
    };
    BaseComponent.prototype.close = function () {
        if (this.parent)
            this.parent.removeChild(this);
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent", ["eui.UIComponent", "egret.DisplayObject"]);
