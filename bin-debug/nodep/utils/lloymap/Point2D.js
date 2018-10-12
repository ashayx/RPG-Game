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
 * 用于地图创建的点
 * @author nodep
 * @version 1.0
 */
var Point2D = (function (_super) {
    __extends(Point2D, _super);
    function Point2D(tx, ty) {
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        var _this = _super.call(this, tx, ty) || this;
        _this.tris = [];
        _this.id = ++Point2D._tid;
        return _this;
    }
    Point2D._tid = 0;
    return Point2D;
}(egret.Point));
__reflect(Point2D.prototype, "Point2D");
