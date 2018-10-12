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
 * 设置界面
 */
var OptWindow = (function (_super) {
    __extends(OptWindow, _super);
    function OptWindow() {
        var _this = _super.call(this) || this;
        _this.typeName = WorWindowType.OPT_MAP;
        _this.layerType = LayerType.LAYER_UI;
        _this.align(AlignType.CENTER, 0, 0);
        _this.pop = true;
        return _this;
    }
    OptWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return OptWindow;
}(GameWindow));
__reflect(OptWindow.prototype, "OptWindow", ["eui.UIComponent", "egret.DisplayObject"]);
