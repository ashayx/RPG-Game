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
 * 游戏可记录的迷雾
 */
var FogForGrid = (function (_super) {
    __extends(FogForGrid, _super);
    function FogForGrid() {
        var _this = _super.call(this) || this;
        _this.autoDraw = false;
        return _this;
    }
    FogForGrid.getIns = function () {
        if (FogForGrid._ins == null)
            FogForGrid._ins = new FogForGrid();
        return FogForGrid._ins;
    };
    FogForGrid.prototype.initBase = function (w, h) {
        this._w = w;
        this._h = h;
        this._fw = 50;
        this._bitmap = new egret.Bitmap();
        this.addChild(this._bitmap);
        this._bgSh = new egret.Shape();
        this._bgSh.graphics.beginFill(0x000000, 1.0);
        this._bgSh.graphics.drawRect(0, 0, w, h); //  创建黑色遮罩覆盖战场
        this._bgSh.graphics.endFill();
        this._con = new egret.DisplayObjectContainer();
        this._con.addChild(this._bgSh);
        this._fogLayer = new egret.DisplayObjectContainer();
        this._con.addChild(this._fogLayer);
        this._fogLayerShape = new egret.Shape();
        this._fogLayer.addChild(this._fogLayerShape);
        this._fogLayer.blendMode = egret.BlendMode.ERASE;
    };
    //加载迷雾
    FogForGrid.prototype.rebuild = function (w, h) {
        this.initBase(w, h);
        //加载之前的迷雾图并添加到fogLayer中
        var base64Str = localStorage.getItem(Server_Map.T_MAP_MINI);
        var btd = egret.BitmapData.create("base64", base64Str);
        var texture = new egret.Texture();
        texture.bitmapData = btd;
        this._fogLayer.addChild(new egret.Bitmap(texture));
        this.reDraw();
    };
    //创建迷雾
    FogForGrid.prototype.init = function (w, h) {
        this.initBase(w, h);
        //保存迷雾图
        this.saveMiniMap();
    };
    //刷新迷雾的显示
    FogForGrid.prototype.updateFogs = function () {
        //计算当前绘制的坐标
        this._fogLayerShape.graphics.beginFill(0x000000, 1);
        this._fogLayerShape.graphics.drawCircle(this._w * PlayerRole.self.x / GameConfig.WORD_W, this._h * PlayerRole.self.y / GameConfig.WORD_H, this._fw);
        this._fogLayerShape.graphics.endFill();
        if (this.autoDraw)
            this.reDraw();
    };
    //自动重新绘制
    FogForGrid.prototype.reDraw = function () {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this._con);
        if (this._bitmap.texture) {
            this._bitmap.texture.dispose();
        }
        this._bitmap.texture = renderTexture;
    };
    //存档
    FogForGrid.prototype.saveMiniMap = function () {
        this._fogLayer.blendMode = egret.BlendMode.NORMAL;
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this._fogLayer);
        var base64Str = renderTexture.toDataURL("image/png");
        if (base64Str.indexOf(",") >= 0)
            base64Str = base64Str.split(",")[1];
        localStorage.setItem(Server_Map.T_MAP_MINI, base64Str);
        renderTexture.dispose();
        this._fogLayer.blendMode = egret.BlendMode.ERASE;
    };
    return FogForGrid;
}(egret.DisplayObjectContainer));
__reflect(FogForGrid.prototype, "FogForGrid");
