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
 * 基于位图的地砖
 * @author nodep
 * @version 1.0
 */
var TiledFloorBase = (function (_super) {
    __extends(TiledFloorBase, _super);
    function TiledFloorBase() {
        return _super.call(this) || this;
    }
    TiledFloorBase.prototype.getType = function () {
        return this.fType;
    };
    TiledFloorBase.prototype.removeFloor = function () {
        this.parent.removeChild(this);
        return this;
    };
    TiledFloorBase.prototype.standOn = function () {
        this.alpha = 0.5;
    };
    TiledFloorBase.prototype.setPosition = function (px, py) {
        this.posx = px;
        this.posy = py;
        if (py % 2 == 0) {
            this.x = px * TiledFloorBase.GW - TiledFloorBase.GW / 2;
            this.y = py / 2 * TiledFloorBase.GH - TiledFloorBase.GH / 2;
        }
        else {
            this.x = px * TiledFloorBase.GW;
            this.y = (py - 1) / 2 * TiledFloorBase.GH;
        }
    };
    TiledFloorBase.prototype.createFloor = function (p, px, py) {
        this.setPosition(px, py);
        this.fType = Tiled_Ground.getIns().getFloorType(this.x + TiledFloorBase.GW_HALF, this.y + TiledFloorBase.GH_HALF);
        // this.$bitmapData = TiledFloorBase.getBitmapData(this.fType);
        var texture = new egret.Texture();
        var bitmapData = TiledFloorBase.getBitmapData(this.fType);
        if (bitmapData) {
            TiledFloorBase.lastBitMap = bitmapData;
            // texture.bitmapData = TiledFloorBase.lastBitMap ; //先这样写
            // texture.bitmapData = bitmapData;
        }
        texture.bitmapData = TiledFloorBase.lastBitMap;
        // log('bitmapData',this.fType , '----',texture.bitmapData)
        this.texture = texture;
        p.addChild(this);
    };
    /**重新构建 */
    TiledFloorBase.prototype.reCreate = function (ct) {
        this.fType = ct;
        this.$bitmapData = TiledFloorBase.getBitmapData(this.fType);
    };
    //获取地板贴图
    TiledFloorBase.getBitmapData = function (cType) {
        if (cType < 0)
            return null;
        //LogTrace.log(npx+"x"+npy+"_"+px+"x"+py+"创建颜色"+cType);
        if (this._floorDic.get(cType) == null) {
            var tx = new egret.RenderTexture();
            var shape = new egret.Shape();
            shape.graphics.beginFill(cType);
            shape.graphics.lineStyle(1, cType, 1);
            shape.graphics.moveTo(GameConfig.GRID_W / 2, 0);
            shape.graphics.lineTo(GameConfig.GRID_W, GameConfig.GRID_H / 2);
            shape.graphics.lineTo(GameConfig.GRID_W / 2, GameConfig.GRID_W / 2);
            shape.graphics.lineTo(0, GameConfig.GRID_H / 2);
            shape.graphics.lineTo(GameConfig.GRID_W / 2, 0);
            shape.graphics.endFill();
            tx.drawToTexture(shape);
            this._floorDic.set(cType, tx.bitmapData);
        }
        return this._floorDic.get(cType);
    };
    TiledFloorBase._floorDic = new Map();
    return TiledFloorBase;
}(egret.Bitmap));
__reflect(TiledFloorBase.prototype, "TiledFloorBase", ["IFloor"]);
