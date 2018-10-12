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
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        return _super.call(this) || this;
    }
    GameUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.contentGroup)
            this.adapComponent(instance, AdaptiveType.CenterAdaptive);
        log(instance);
    };
    GameUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addBtnClick(this.newGame, true);
        this.addBtnClick(this.oldGame, true);
        this.addBtnClick(this.mapBtn, true);
    };
    GameUI.prototype.onClick = function (evt) {
        var btn = evt.currentTarget;
        switch (btn) {
            case this.newGame:
                log('新游戏');
                this.currentState = "game";
                GameManager.getIns().isNewGame = true;
                GameManager.getIns().startNewGame();
                break;
            case this.oldGame:
                log('读取存档');
                this.currentState = "game";
                GameManager.getIns().isNewGame = false;
                GameManager.getIns().startOldGame();
                break;
            case this.mapBtn:
                log('切换地图');
                WinsManager.getIns().switchWin(MiniMap);
                break;
            default:
                break;
        }
    };
    return GameUI;
}(BaseComponent));
__reflect(GameUI.prototype, "GameUI");
