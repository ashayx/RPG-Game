var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * EventConst
 */
var EventConst = (function () {
    function EventConst() {
    }
    /** 开始 */
    EventConst.Event_start = "start";
    return EventConst;
}());
__reflect(EventConst.prototype, "EventConst");
