var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DisplayUtility = (function () {
    function DisplayUtility() {
    }
    DisplayUtility.addChild = function (container, child) {
        if (!container || !child)
            return;
        container.addChild(child);
    };
    DisplayUtility.addChildAt = function (container, child, index) {
        if (!container || !child)
            return;
        container.addChildAt(child, index);
    };
    DisplayUtility.removeAllChildren = function (displayContainer) {
        while (displayContainer.numChildren) {
            displayContainer.removeChildAt(0);
        }
    };
    DisplayUtility.clearChildren = function (child) {
        if (child instanceof egret.DisplayObjectContainer) {
            var container = child;
            while (container.numChildren > 0) {
                var temp = container.removeChildAt(0);
                DisplayUtility.clearChildren(temp);
            }
        }
    };
    DisplayUtility.removeFromParent = function (child) {
        if (child && child.parent) {
            child.parent.removeChild(child);
        }
    };
    DisplayUtility.isVisible = function (child) {
        while (child.visible && child.parent) {
            child = child.parent;
        }
        return child.visible;
    };
    DisplayUtility.getChildIndex = function (child) {
        var index = undefined;
        if (child && child.parent) {
            index = child.parent.getChildIndex(child);
        }
        return index;
    };
    return DisplayUtility;
}());
__reflect(DisplayUtility.prototype, "DisplayUtility");
