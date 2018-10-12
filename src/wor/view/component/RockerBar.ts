/**
 * 游戏基础摇杆
 */
class RockerBar extends eui.Component implements eui.UIComponent {

	private _contorller: RockBarContorller;
	private _bgShape: egret.Shape;//背景圆圈图
	public barBtn: eui.Button;

	private _startPoint: egret.Point;//开始的位置
	private _movePoint: egret.Point = new egret.Point();//移动的位置
	private _restPoint: egret.Point;//重置的位置
	private _px: number;
	private _py: number;

	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this._px = this.x;
		this._py = this.y;
		this._restPoint = new egret.Point(this.barBtn.x, this.barBtn.y);
		this.barBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
	}

	//按下摇杆
	private touchBeginHandler(evt: egret.TouchEvent): void {
		if (this._startPoint == null) {
			this._startPoint = new egret.Point();
		}
		this._startPoint.x = evt.stageX;
		this._startPoint.y = evt.stageY;
		this.barBtn.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
		this.barBtn.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
		this.barBtn.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
	}

	//摇杆移动
	private touchMoveHandler(evt: egret.TouchEvent): void {
		this._movePoint.x = evt.stageX;
		this._movePoint.y = evt.stageY;
		var dist: number = egret.Point.distance(this._startPoint, this._movePoint);
		if (dist <= GameConfig.rocker_bar_sensitivity) { //没有超出范围
			this.barBtn.x = this._restPoint.x + this._movePoint.x - this._startPoint.x;
			this.barBtn.y = this._restPoint.y + this._movePoint.y - this._startPoint.y;
		} else {//超出范围了,计算弧度
			var toPoint: egret.Point = egret.Point.interpolate(this._movePoint, this._startPoint, GameConfig.rocker_bar_sensitivity / dist);
			this.barBtn.x = toPoint.x - this._px;
			this.barBtn.y = toPoint.y - this._py;
		}
		//计算X和Y方向上的分速度倍数
		RockBarContorller.multX = (this._movePoint.x - this._startPoint.x) / dist;//x分量
		RockBarContorller.multY = (this._movePoint.y - this._startPoint.y) / dist;//y分量
		RockBarContorller.offset = dist / GameConfig.rocker_bar_sensitivity;//力度分量
	}

	//取消摇杆
	private cancelHandler(evt: egret.TouchEvent): void {
		this.barBtn.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
		this.barBtn.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
		this.barBtn.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
		egret.Tween.removeTweens(this.barBtn);
		egret.Tween.get(this.barBtn).to({ x: this._restPoint.x, y: this._restPoint.y }, 50, egret.Ease.backOut);
		RockBarContorller.multX = 0;
		RockBarContorller.multY = 0;
		RockBarContorller.offset = 0;
	}


}