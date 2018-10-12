var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏摇杆控制器
 * 该类所控制的摇杆整个游戏只允许存在一个
 * @author nodep
 * @version 1.0
 */
var RockBarContorller = (function () {
    function RockBarContorller() {
    }
    Object.defineProperty(RockBarContorller, "instance", {
        get: function () {
            return RockBarContorller._instance ? RockBarContorller._instance : (RockBarContorller._instance = new RockerBar());
        },
        enumerable: true,
        configurable: true
    });
    RockBarContorller.multX = 0;
    RockBarContorller.multY = 0;
    RockBarContorller.offset = 0;
    RockBarContorller._instance = null;
    return RockBarContorller;
}());
__reflect(RockBarContorller.prototype, "RockBarContorller");
