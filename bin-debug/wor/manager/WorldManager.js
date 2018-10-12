var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 世界与场景相关的逻辑类
 * @author nodep
 * @version 1.0
 */
var WorldManager = (function () {
    function WorldManager() {
        this.focusOptionRole = null; //当前与主角互动的
    }
    WorldManager.getIns = function () {
        if (WorldManager._ins == null)
            WorldManager._ins = new WorldManager();
        return WorldManager._ins;
    };
    /**设置当前操作对象 */
    WorldManager.prototype.setOptionRole = function (role) {
        if (role != this.focusOptionRole) {
            this.focusOptionRole = role;
            //通知界面更新
            WinsManager.getIns().updateWin(UpdateType.MAP_OPT_CHANGE, [WorWindowType.CURB_BAR]);
        }
    };
    /**尝试与场景进行互动 */
    WorldManager.prototype.actOptionRole = function () {
        if (this.focusOptionRole == null)
            return;
        switch (this.focusOptionRole.getOptType()) {
            case RoleType.PLANT_TREE://树木,需要判断斧子
                break;
            case RoleType.PLANT_COLL://采集物,需要判断是否成熟
                break;
            case RoleType.GROUND_ITEM://掉落物
                break;
            case RoleType.ROLE_NPC://NPC,对话
                break;
            case RoleType.ROLE_ANIMAL://动物,可以喂食等
                break;
            case RoleType.ROLE_WILD://野兽,驯服
                break;
            case RoleType.ORE://矿物,需要铁锹
                break;
            case RoleType.TRAP://陷阱,可以收起
                break;
        }
    };
    return WorldManager;
}());
__reflect(WorldManager.prototype, "WorldManager");
