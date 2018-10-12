var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "Observer", {
        get: function () {
            return Observer.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "UIAdapter", {
        get: function () {
            return UIAdapter.instance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "GlobalObject", {
        get: function () {
            return GlobalObject.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "GameController", {
        get: function () {
            return GameController.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerManager", {
        get: function () {
            return LayerManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    return App;
}());
__reflect(App.prototype, "App");
