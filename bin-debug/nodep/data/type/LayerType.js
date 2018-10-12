var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 层级常量
 *@author nodep
 */
var LayerType = (function () {
    function LayerType() {
    }
    /**場景層*/
    LayerType.LAYER_GROUND = "LAYER_GROUND";
    /**导航界面层 */
    LayerType.LAYER_MENU = "LAYER_MENU";
    /**UI层*/
    LayerType.LAYER_UI = "LAYER_UI";
    /**弹出层*/
    LayerType.LAYER_POP = "LAYER_POP";
    return LayerType;
}());
__reflect(LayerType.prototype, "LayerType");
