class GameUI extends BaseComponent {
	public contentGroup:eui.Group;
	public newGame:eui.Button;
	public oldGame:eui.Button;
	public mapBtn:eui.Button;
	public rockerBar:RockerBar;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void{
		super.partAdded(partName,instance);
		if (instance == this.contentGroup) this.adapComponent(instance,AdaptiveType.CenterAdaptive);
		log(instance)
	}

	protected childrenCreated():void{
		super.childrenCreated();
		this.addBtnClick(this.newGame, true);
		this.addBtnClick(this.oldGame, true);
		this.addBtnClick(this.mapBtn, true);
	}
	
	protected onClick(evt: egret.TouchEvent): void{
		const btn: any = evt.currentTarget;
		switch (btn) {
			case this.newGame:
				log('新游戏')
				this.currentState = "game"
				GameManager.getIns().isNewGame = true;
				GameManager.getIns().startNewGame();
				break;
			case this.oldGame:
				log('读取存档')
				this.currentState = "game"
				GameManager.getIns().isNewGame = false;
				GameManager.getIns().startOldGame();
				break;
			case this.mapBtn:
				log('切换地图')
				WinsManager.getIns().switchWin(MiniMap);
				break;
			default:
				break;
		}
		
	}
}