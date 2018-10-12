class GameLoading extends BaseComponent  {
	public loadingTip:eui.Label;
	public contentGroup:eui.Group;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void{
		super.childrenCreated();
	}

	private static _instance:GameLoading = null;
    public static get instance():GameLoading {
        return GameLoading._instance ? GameLoading._instance : (GameLoading._instance = new GameLoading());
    }

	public show() {
		log('show')
		DisplayUtility.addChild(App.LayerManager.GUIDE_LAYER, this);
	}

	public hide() {
		log('hide')
		DisplayUtility.removeFromParent(this);
	}
	
}