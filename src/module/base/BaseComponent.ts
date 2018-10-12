/**
 * Created by Ink on 2018/1/8
 */
class BaseComponent extends eui.Component implements eui.UIComponent{

	public isCreate: boolean = false;	
	private componentArr: Array<Array<any>>;//用于适配
	private addEventBtnArr: Array<any>;//添加事件的按钮数组
	private effectArr: Array<number>;//添加按钮特效的hashCode数组
	protected readonly waitTime: number = 0;//按钮点击等待的时间
	
	public constructor() {
		super();
		egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onUIChange, this);
		this.width = App.UIAdapter.MainShowWidth;
		this.height = App.UIAdapter.MainShowHeight;//App.UIAdapter.StageHeight;
		//App.MessageCenter.addListener(App.UI_EVENT_CHANGE, this.onUIChange, this);
	}

	protected partAdded(partName:string,instance:any): void{
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void{
		super.childrenCreated();
		this.isCreate = true;
		this.initData();
		this.initUI();
		this.initListener();
	}

	/**
	 * 添加需要适配的控件
	 * @param type 适配类型  AdaptiveType
	 */
	protected adapComponent(component,type): void{
		if (!this.componentArr) this.componentArr = [];
		if (!this.componentArr[type]) this.componentArr[type] = [];
		let index: number = this.componentArr[type].indexOf(component);
		if (index == -1) this.componentArr[type].push(component);
		App.UIAdapter.adaptiveComponent(component, type);
	}

	protected onUIChange(): void{
		this.width = App.UIAdapter.MainShowWidth;
		this.height = App.UIAdapter.MainShowHeight;
		log(this.componentArr, this.width, this.height);
		if (!this.componentArr) return;
		this.componentArr.forEach((arr, type) => {
			arr.forEach((comp, j) => {
				this.adapComponent(comp, type);
			}, this);
		}, this);
	}

	protected initData(): void{
		this.addEventBtnArr = [];
		this.effectArr = [];
	}

	protected initUI(): void{}

	protected initListener(): void{ }

	protected removeListener(): void{
		egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onUIChange, this);
		while (this.addEventBtnArr && this.addEventBtnArr.length > 0) {
			let btn: any = this.addEventBtnArr.shift();
			if (btn) this.removeBtnClick(btn);
		}
	}

	/**
	 * 添加按钮点击事件
	 * @param btn 要添加事件的对象
	 * @param isEffect 是否启用特效
	 */
	protected addBtnClick(btn: egret.DisplayObject, isEffect:boolean = false): void{
		if (btn && this.addEventBtnArr.indexOf(btn) == -1) {
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.addEventBtnArr.push(btn);
			if (isEffect) {
				this.effectArr.push(btn.hashCode);
				btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
				btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
				btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
				const w: number = btn.width;
				const h: number = btn.height;
				const w_half: number = w >> 1;
				const h_half: number = h >> 1;
				btn.x += w_half - btn.anchorOffsetX;
				btn.y += h_half - btn.anchorOffsetY;
				btn.anchorOffsetX = w_half;
				btn.anchorOffsetY = h_half;
			}
		}
	}

	protected removeBtnClick(btn: any): void{
		if (!btn) return;
		let index: number = this.addEventBtnArr.indexOf(btn);
		if (index != -1) {
			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.addEventBtnArr.splice(index, 1);
		}
		index = this.effectArr.indexOf(btn.hashCode);
		if (index != -1) {
			egret.Tween.removeTweens(btn);
			btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
			btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
			btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
			this.effectArr.splice(index, 1);
		}
	}

	protected onClick(evt: egret.TouchEvent, waitTime: number = this.waitTime): void{
		const btn: any = evt.currentTarget;
		if (waitTime > 0) {
			btn.touchEnabled = false;
			// App.GlobalFun.wait(waitTime).then(() => { btn.touchEnabled = true });
		}
		// App.SoundManager.playEffect(SoundResConst.click);
	}

	protected onBtnEffect(evt: egret.TouchEvent): void{
		const btn: any = evt.currentTarget;
		egret.Tween.removeTweens(btn);
		if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
			egret.Tween.get(btn).to({ scaleX: 0.8, scaleY: 0.8 }, 200, egret.Ease.quadOut);
		} else if (evt.type == egret.TouchEvent.TOUCH_END || evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
			egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		}
	}
	
	public updateView(...param): void{ }
	
	public destroy(): void{
		this.removeListener();
		this.componentArr = null;
		this.effectArr = null;
	}

	public close(): void{
		if (this.parent) this.parent.removeChild(this);
	}

}