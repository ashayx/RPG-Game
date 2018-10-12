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
 * 游戏登陆
 */
var MenuWindow = (function (_super) {
    __extends(MenuWindow, _super);
    function MenuWindow() {
        var _this = _super.call(this) || this;
        _this.typeName = WorWindowType.MENU_WINDOW;
        _this.layerType = LayerType.LAYER_UI;
        return _this;
    }
    MenuWindow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.newGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this);
        this.oldGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.optionHandler, this);
        this.reOpen();
    };
    MenuWindow.prototype.reOpen = function () {
        this.newGame.visible = false;
        this.oldGame.visible = false;
        //请求玩家历史数据
        ProxyManager.getIns().send(ModuleType.USER, ProxyType.USER_GETHISTORY);
    };
    MenuWindow.prototype.update = function (updateType, updateObject) {
        switch (updateType) {
            case UpdateType.USER_HISTORY_BACLL://玩家历史数据返回
                this.updatePanel();
                break;
        }
    };
    //刷新整个界面
    MenuWindow.prototype.updatePanel = function () {
        this.newGame.visible = true;
        this.oldGame.visible = GameData.historyData.hasData;
    };
    MenuWindow.prototype.optionHandler = function (evt) {
        switch (evt.currentTarget["name"]) {
            case "newGame":
                if (GameData.historyData.hasData)
                    AlertWindow.alertShow("确定要开始新的冒险吗?这将覆盖原有存档!", this.startNewGame, this);
                else
                    this.startNewGame(true);
                break;
            case "oldGame":
                this.startOldGame();
                break;
        }
    };
    //开始一个新游戏
    MenuWindow.prototype.startNewGame = function (flag) {
        if (flag) {
            LogTrace.log("startGame for new!");
            GameManager.getIns().isNewGame = true;
            GameManager.getIns().startNewGame();
        }
    };
    //读取以前的档案
    MenuWindow.prototype.startOldGame = function () {
        LogTrace.log("startGame for old");
        GameManager.getIns().isNewGame = false;
        GameManager.getIns().startOldGame();
    };
    return MenuWindow;
}(GameWindow));
__reflect(MenuWindow.prototype, "MenuWindow", ["eui.UIComponent", "egret.DisplayObject"]);
