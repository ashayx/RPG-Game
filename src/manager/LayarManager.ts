class LayerManager {

	private static _instance: LayerManager;
	public static get instance(): LayerManager{
		if (!this._instance) this._instance = new LayerManager;
		return this._instance;
	}

	private container: egret.DisplayObjectContainer;
	private gameSceneLayer: egret.DisplayObjectContainer;
	private gameUILayer: egret.DisplayObjectContainer;
	private panelLayer: egret.DisplayObjectContainer;
	private tipsLayer: egret.DisplayObjectContainer;
	private guideLayer: egret.DisplayObjectContainer;
	private effectLayer: egret.DisplayObjectContainer;

	public constructor() { }

	public initLayer(_container: egret.DisplayObjectContainer): void{
		this.container = _container;
		this.gameSceneLayer = new egret.DisplayObjectContainer();
		this.gameSceneLayer.name = "gameSceneLayer";
		this.gameUILayer = new egret.DisplayObjectContainer();
		this.gameUILayer.name = "gameUILayer"
		this.panelLayer = new egret.DisplayObjectContainer();
		this.panelLayer.name = "panelLayer";
		this.tipsLayer = new egret.DisplayObjectContainer();
		this.tipsLayer.name = "tipsLayer";
		this.guideLayer = new egret.DisplayObjectContainer();
		this.guideLayer.name = "guideLayer";
		this.effectLayer = new egret.DisplayObjectContainer();
		this.effectLayer.name = "effectLayer";
		this.container.addChild(this.gameSceneLayer);
		this.container.addChild(this.gameUILayer)
		this.container.addChild(this.panelLayer);
		this.container.addChild(this.tipsLayer);
		this.container.addChild(this.guideLayer);
		this.container.addChild(this.effectLayer);
	}

	/**
	 * 游戏场景层
	 */
	public get GAME_SCENE_LAYER(): egret.DisplayObjectContainer{
		return this.gameSceneLayer;
	}
	/**
	 * 游戏UI层
	 */
	public get GAME_UI_LAYER(): egret.DisplayObjectContainer{
		return this.gameUILayer;
	}

	/**
	 * 弹出界面层
	 */
	public get PANEL_LAYER(): egret.DisplayObjectContainer{
		return this.panelLayer;
	}

	/**
	 * 提示层
	 */
	public get TIPS_LAYER(): egret.DisplayObjectContainer{
		return this.tipsLayer;
	}

	/**
	 * 引导层
	 */
	public get GUIDE_LAYER(): egret.DisplayObjectContainer{
		return this.guideLayer;
	}

	/**
	 * 特效层
	 */
	public get EFFECT_LAYER(): egret.DisplayObjectContainer{
		return this.effectLayer;
	}

	/**
	 * 添加对象到制定层级
	 */
	public addChildToLayer(layer: egret.DisplayObjectContainer, child: egret.DisplayObject): void{
		if (!layer || !child) {
			console.warn("显示容器不存在");
			return;
		}
		layer.addChild(child);
	}

	/**
	 * 添加对象到制定层级索引位置
	 */
	public addChildAtToLayer(layer: egret.DisplayObjectContainer, child: egret.DisplayObject,index:number): void{
		if (!layer || child) {
			console.warn("显示容器不存在");
			return;
		}
		layer.addChildAt(child,index);
	}

	/**
	 * 移除对从到制定层级
	 */
	public removeChildToLayer(layer: egret.DisplayObjectContainer, child: egret.DisplayObjectContainer): void{
		if (!layer || !child) {
			console.warn("显示容器不存在");
			return;
		}
		if(child.parent) layer.removeChild(child);
	}


}