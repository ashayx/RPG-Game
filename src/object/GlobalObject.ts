class GlobalObject {

	private static _instance:GlobalObject;
	public static get instance():GlobalObject{
		if(!this._instance) this._instance = new GlobalObject();
		return this._instance;
	}

	public constructor() {	}

	public get isNative():boolean{
		return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
	}

	public get isWeb():boolean{
		return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
	}

	/**
	 *  针对小游戏做此次修改
	 *	注：目前版本所有皮肤中使用<ns1:/>标签引用的对象都要暴露到全局下
	 */
	public initObject():void{
		if(this.isNative) return;

	}

	/**
	 *  添加window全局对象 小游戏
	 */
	public addGlobalObj(cls:any):void{
		if(this.isNative) return;
		let str:string = egret.getQualifiedClassName(cls);
		window[str] = cls;
	}

	private _pos: egret.Point;
	/**
	 * 获取一个坐标转换的point对象
	 */
	public get tempPos(): egret.Point{
		if (!this._pos) this._pos = new egret.Point();
		return this._pos;
	}

}