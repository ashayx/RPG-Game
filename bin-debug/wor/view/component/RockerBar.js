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
 * 游戏基础摇杆
 */
var RockerBar = (function (_super) {
    __extends(RockerBar, _super);
    function RockerBar() {
        var _this = _super.call(this) || this;
        _this._movePoint = new egret.Point(); //移动的位置
        return _this;
    }
    RockerBar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._px = this.x;
        this._py = this.y;
        this._restPoint = new egret.Point(this.barBtn.x, this.barBtn.y);
        this.barBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    //按下摇杆
    RockerBar.prototype.touchBeginHandler = function (evt) {
        if (this._startPoint == null) {
            this._startPoint = new egret.Point();
        }
        this._startPoint.x = evt.stageX;
        this._startPoint.y = evt.stageY;
        this.barBtn.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.barBtn.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        this.barBtn.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
    };
    //摇杆移动
    RockerBar.prototype.touchMoveHandler = function (evt) {
        this._movePoint.x = evt.stageX;
        this._movePoint.y = evt.stageY;
        var dist = egret.Point.distance(this._startPoint, this._movePoint);
        if (dist <= GameConfig.rocker_bar_sensitivity) {
            this.barBtn.x = this._restPoint.x + this._movePoint.x - this._startPoint.x;
            this.barBtn.y = this._restPoint.y + this._movePoint.y - this._startPoint.y;
        }
        else {
            var toPoint = egret.Point.interpolate(this._movePoint, this._startPoint, GameConfig.rocker_bar_sensitivity / dist);
            this.barBtn.x = toPoint.x - this._px;
            this.barBtn.y = toPoint.y - this._py;
        }
        //计算X和Y方向上的分速度倍数
        RockBarContorller.multX = (this._movePoint.x - this._startPoint.x) / dist; //x分量
        RockBarContorller.multY = (this._movePoint.y - this._startPoint.y) / dist; //y分量
        RockBarContorller.offset = dist / GameConfig.rocker_bar_sensitivity; //力度分量
    };
    //取消摇杆
    RockerBar.prototype.cancelHandler = function (evt) {
        this.barBtn.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.barBtn.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        this.barBtn.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
        egret.Tween.removeTweens(this.barBtn);
        egret.Tween.get(this.barBtn).to({ x: this._restPoint.x, y: this._restPoint.y }, 50, egret.Ease.backOut);
        RockBarContorller.multX = 0;
        RockBarContorller.multY = 0;
        RockBarContorller.offset = 0;
    };
    return RockerBar;
}(eui.Component));
__reflect(RockerBar.prototype, "RockerBar", ["eui.UIComponent", "egret.DisplayObject"]);
