class GameController {
	public gameUI: GameUI;

	private static _instance: GameController;
	public static get instance(): GameController{
		if (!this._instance) this._instance = new GameController();
		return this._instance;
	}

	public constructor() {
		
	}

	/**
	 * 开始游戏
	 */
	public startGame(_gameSceneLayer: egret.DisplayObjectContainer, _gameUILayer: egret.DisplayObjectContainer): void{
		if (!this.gameUI) {
			this.gameUI = new GameUI();
			_gameUILayer.addChild(this.gameUI);
		}
	}
}