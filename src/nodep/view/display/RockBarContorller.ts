/**
 * 游戏摇杆控制器
 * 该类所控制的摇杆整个游戏只允许存在一个
 * @author nodep
 * @version 1.0
 */
class RockBarContorller {
	public static multX:number = 0;
	public static multY:number = 0;
	public static offset:number = 0;

	private static _instance:RockerBar = null;
    public static get instance():RockerBar {
        return RockBarContorller._instance ? RockBarContorller._instance : (RockBarContorller._instance = new RockerBar());
	}
	constructor() {}
}