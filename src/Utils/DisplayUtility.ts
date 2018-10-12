class DisplayUtility {

    public static addChild(container:egret.DisplayObjectContainer, child:egret.DisplayObject):void{
        if(!container || !child) return;
        container.addChild(child);
    }

    public static addChildAt(container:egret.DisplayObjectContainer, child:egret.DisplayObject, index:number):void{
        if(!container || !child) return;
         container.addChildAt(child,index);
    }

    public static removeAllChildren(displayContainer:egret.DisplayObjectContainer):void {
        while (displayContainer.numChildren) {
            displayContainer.removeChildAt(0);
        }
    }

    public static clearChildren(child:egret.DisplayObject):void {
        if (child instanceof egret.DisplayObjectContainer) {
            var container:egret.DisplayObjectContainer = <egret.DisplayObjectContainer>child;
            while (container.numChildren > 0) {
                var temp:egret.DisplayObject = container.removeChildAt(0);
                DisplayUtility.clearChildren(temp);
            }
        }
    }

    public static removeFromParent(child:egret.DisplayObject) {
        if (child && child.parent) {
            child.parent.removeChild(child);
        }
    }

    public static isVisible(child:egret.DisplayObject):boolean {
        while (child.visible && child.parent) {
            child = child.parent;
        }
        return child.visible;
    }

    public static getChildIndex(child: egret.DisplayObject): number{
        let index: number = undefined;
        if (child && child.parent) {
            index = child.parent.getChildIndex(child);
        }
        return index;
    }
}