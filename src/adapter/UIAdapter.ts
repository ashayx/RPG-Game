class UIAdapter {

	private static _instance: UIAdapter;
	private _preinstallWidth: number;
	private _preinstallHeight: number;

	public constructor($preinstallWidth, $preinstallHeight) {
		this._preinstallWidth = $preinstallWidth;
		this._preinstallHeight = $preinstallHeight;
	}

	/**
	 * 获取一个实例化的适配工具单例
	 * @param $preinstallWidth:number 游戏舞台预设宽度
	 * @param $preinstallHeight:number 游戏舞台预设高度
	 */
	public static instance($preinstallWidth = 1136,$preinstallHeight = 640): UIAdapter{
		if (!this._instance)  this._instance = new UIAdapter($preinstallWidth,$preinstallHeight);
		return this._instance;
	}

	/** 游戏预设宽度 */
	public get PreinstallWidth(): number{
		return this._preinstallWidth;
	}

	/**舞台预设高度 */
	public get PreinstallHeight(): number{
		return this._preinstallHeight;
	}

	/** 舞台 */
	public get Stage(): egret.Stage{
		return egret.MainContext.instance.stage;
	}

	/** 是否禁用舞台 */
	public stageEnable(boo: boolean): void{
		this.Stage.touchChildren = boo;
	}

	/** 舞台宽度（实际） */
	public get StageWidth():number {
		return this.Stage.stageWidth;
	} 

	/** 舞台高度（实际） */
	public get StageHeight(): number{
		return this.Stage.stageHeight;
	}

	/** 主内容显示宽度 */
	public get MainShowWidth(): number{
		return this.StageWidth;
	}

	/** 主内容显示高度 */
	public get MainShowHeight(): number{
		let ratio: number = this.getWHRatio();
		let height: number = this.StageHeight;
		//iphoneX 去除上额头和下额头所占百分比
		// if (ratio == 0.46 && App.DeviceUtils.DeviceOs == DeviceUtils.OS_IOS) {
		// 	height -= Math.ceil(height*(0.049+0.027));
		// }
		return height;
	}

	/** 获取偏移量 */
	public get MainOffsetY(): number{
		let ratio: number = this.getWHRatio();
		let offset: number = 0;
		// if (ratio == 0.46 && App.DeviceUtils.DeviceOs == DeviceUtils.OS_IOS) {
		// 	offset = Math.ceil(this.StageHeight*0.049);
		// }
		return offset;
	}

	/**
	 * @param component 要缩放的控件
	 * @param type 适配类型  AdaptiveType
	 */
	public adaptiveComponent(component, type): void{
		if (!component) return;
		if (type == AdaptiveType.CenterAdaptive) {
			this.adaptiveScreen(component);
		} else if (type == AdaptiveType.StretchAdaptive) {
			this.bgAdaptiveScreen(component);
		} else if (type == AdaptiveType.MinScaleAdaptive) {
			this.adaptiveMinScale(component);
		} else if (type == AdaptiveType.ScaleXAdaptive) {
			component.scaleX = component.scaleY = this.getScaleX();
		} else if (type == AdaptiveType.ScaleYAdaptive) {
			component.scaleX = component.scaleY = this.getScaleY();
		}
	}

	/**适配屏幕 */
    private adaptiveScreen(contentGroup: eui.Group | egret.Sprite): void {
        if (!contentGroup) return;
        contentGroup.x = this.StageWidth / 2;
        contentGroup.y = this.StageHeight / 2;
        contentGroup.anchorOffsetX = contentGroup.width / 2;
        contentGroup.anchorOffsetY = contentGroup.height / 2;
        this.adaptiveMinScale(contentGroup);
    }

    /**背景适配 */
    private bgAdaptiveScreen(bg: eui.Image | eui.Rect | eui.Button) {
        if (!bg) return;
        bg.width = this.StageWidth;
        bg.height = this.StageHeight;
    }

    /**适配最小缩放值 */
    private adaptiveMinScale(obj: egret.DisplayObjectContainer): void{
        if (!obj) return;
        obj.scaleX = obj.scaleY = this.getMinScale();
    }

    private getScaleX(): number {
		return this.MainShowWidth / this.PreinstallWidth;
        // return Math.floor(this.MainShowWidth / this.PreinstallWidth * 10) / 10;
    }

	private getScaleY(): number {
		return this.MainShowHeight / this.PreinstallHeight;
        // return Math.floor(this.MainShowHeight / this.PreinstallHeight * 10) / 10;
    }

    private getMinScale(): number {
        return Math.min(this.getScaleX(), this.getScaleY(), 1);
	}

	/**
	 * 获取实际宽高比 保留两位小数
	 * @param 
	 */
	public getWHRatio(fractionDigits:number = 2): number{
		let ratio: number = this.StageWidth / this.StageHeight;
		let value: number = Math.pow(10,fractionDigits);
		ratio = ~~(ratio*value)/value;
		return ratio;
	}

	/**
	 * 获取屏幕兑换比例
	 */
	public get ratioValue():number{
		return window.innerWidth/this.StageWidth;
	}
	
}

/**
 * 适配类型
 */
enum AdaptiveType{

	/** 内容完整适配并居中 1 */
	CenterAdaptive = 1,

	/** 全屏拉伸适配 2 */
	StretchAdaptive = 2,

	/** 从宽高中取最小缩放比缩放 3 */
	MinScaleAdaptive = 3,

	/** 按照宽度缩放比进行缩放 4 */
	ScaleXAdaptive = 4,

	/** 按照高度缩放比尽心缩放 5 */
	ScaleYAdaptive = 5

}