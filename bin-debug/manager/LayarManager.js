var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
    }
    Object.defineProperty(LayerManager, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new LayerManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    LayerManager.prototype.initLayer = function (_container) {
        this.container = _container;
        this.gameSceneLayer = new egret.DisplayObjectContainer();
        this.gameSceneLayer.name = "gameSceneLayer";
        this.gameUILayer = new egret.DisplayObjectContainer();
        this.gameUILayer.name = "gameUILayer";
        this.panelLayer = new egret.DisplayObjectContainer();
        this.panelLayer.name = "panelLayer";
        this.tipsLayer = new egret.DisplayObjectContainer();
        this.tipsLayer.name = "tipsLayer";
        this.guideLayer = new egret.DisplayObjectContainer();
        this.guideLayer.name = "guideLayer";
        this.effectLayer = new egret.DisplayObjectContainer();
        this.effectLayer.name = "effectLayer";
        this.container.addChild(this.gameSceneLayer);
        this.container.addChild(this.gameUILayer);
        this.container.addChild(this.panelLayer);
        this.container.addChild(this.tipsLayer);
        this.container.addChild(this.guideLayer);
        this.container.addChild(this.effectLayer);
    };
    Object.defineProperty(LayerManager.prototype, "GAME_SCENE_LAYER", {
        /**
         * 游戏场景层
         */
        get: function () {
            return this.gameSceneLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "GAME_UI_LAYER", {
        /**
         * 游戏UI层
         */
        get: function () {
            return this.gameUILayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "PANEL_LAYER", {
        /**
         * 弹出界面层
         */
        get: function () {
            return this.panelLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "TIPS_LAYER", {
        /**
         * 提示层
         */
        get: function () {
            return this.tipsLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "GUIDE_LAYER", {
        /**
         * 引导层
         */
        get: function () {
            return this.guideLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "EFFECT_LAYER", {
        /**
         * 特效层
         */
        get: function () {
            return this.effectLayer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加对象到制定层级
     */
    LayerManager.prototype.addChildToLayer = function (layer, child) {
        if (!layer || !child) {
            console.warn("显示容器不存在");
            return;
        }
        layer.addChild(child);
    };
    /**
     * 添加对象到制定层级索引位置
     */
    LayerManager.prototype.addChildAtToLayer = function (layer, child, index) {
        if (!layer || child) {
            console.warn("显示容器不存在");
            return;
        }
        layer.addChildAt(child, index);
    };
    /**
     * 移除对从到制定层级
     */
    LayerManager.prototype.removeChildToLayer = function (layer, child) {
        if (!layer || !child) {
            console.warn("显示容器不存在");
            return;
        }
        if (child.parent)
            layer.removeChild(child);
    };
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
