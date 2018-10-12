var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameController = (function () {
    function GameController() {
    }
    Object.defineProperty(GameController, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new GameController();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 开始游戏
     */
    GameController.prototype.startGame = function (_gameSceneLayer, _gameUILayer) {
        if (!this.gameUI) {
            this.gameUI = new GameUI();
            _gameUILayer.addChild(this.gameUI);
        }
    };
    return GameController;
}());
__reflect(GameController.prototype, "GameController");
