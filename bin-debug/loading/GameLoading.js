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
var GameLoading = (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        return _super.call(this) || this;
    }
    GameLoading.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameLoading.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Object.defineProperty(GameLoading, "instance", {
        get: function () {
            return GameLoading._instance ? GameLoading._instance : (GameLoading._instance = new GameLoading());
        },
        enumerable: true,
        configurable: true
    });
    GameLoading.prototype.show = function () {
        log('show');
        DisplayUtility.addChild(App.LayerManager.GUIDE_LAYER, this);
    };
    GameLoading.prototype.hide = function () {
        log('hide');
        DisplayUtility.removeFromParent(this);
    };
    GameLoading._instance = null;
    return GameLoading;
}(BaseComponent));
__reflect(GameLoading.prototype, "GameLoading");
