var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DeviceUtils = (function () {
    /**
     * 构造函数
     */
    function DeviceUtils() {
        this.deviceTypeArr = ["iPhone", "Android", "Windows", "Linux", "Symbian", "Macintosh"];
        //windows版本
        this.windows0s = {
            "Windows NT 6.4": "Windows 10",
            "Windows NT 6.3": "Windows 8.1",
            "Windows NT 6.2": "Windows 8",
            "Windows NT 6.0": "Windows 8",
            "Windows NT 6.1": "Windows 7",
            "Windows NT 5.1": "Windows XP"
        };
    }
    Object.defineProperty(DeviceUtils.prototype, "IsHtml5", {
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsNative", {
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsMobile", {
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsPC", {
        /**
         * 是否是在PC上
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.MainContext.deviceType == egret.MainContext.DEVICE_PC;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsQQBrowser", {
        /**
         * 是否是QQ浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsIEBrowser", {
        /**
         * 是否是IE浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsFirefoxBrowser", {
        /**
         * 是否是Firefox浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsChromeBrowser", {
        /**
         * 是否是Chrome浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsSafariBrowser", {
        /**
         * 是否是Safari浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "IsOperaBrowser", {
        /**
         * 是否是Opera浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "DeviceOs", {
        /**
         * 得到设备系统 如：iOS/Android/WP7
         */
        get: function () {
            var os = "";
            var ua;
            ua = this.IsHtml5 ? navigator.userAgent.toLowerCase() : egret.Capabilities.os.toLowerCase();
            if (ua.indexOf("ipod") != -1 || ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("macintosh") != -1 || ua.indexOf("ios") != -1) {
                os = "ios";
            }
            else if (ua.indexOf("windows") != -1) {
                os = "windows";
            }
            else if (ua.indexOf("android") != -1) {
                os = "android";
            }
            else if (ua.indexOf("symbian") != -1) {
                os = "symbian";
            }
            else if (ua.indexOf("linux") != -1) {
                os = "linux";
            }
            return os;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isAndroid", {
        get: function () {
            return this.DeviceOs == "android";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "DeviceUA", {
        /**
         * 得到UA
         */
        get: function () {
            var ua = "";
            if (this.IsHtml5) {
                ua = navigator.userAgent;
            }
            return ua;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "DeviceID", {
        /**
         * 得到设备egretDeviceId
         */
        get: function () {
            var id = "";
            if (this.IsNative) {
                id = egret.getOption('egret.runtime.egretDeviceId');
            }
            return id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils.prototype, "isMirco", {
        /**
         * 判断是否是微端登录
         */
        get: function () {
            return egret.getOption("egretTag") != "" || egret.getOption("egret.native.type") == "android_app";
        },
        enumerable: true,
        configurable: true
    });
    DeviceUtils.OS_IOS = "ios";
    DeviceUtils.OS_Android = "android";
    return DeviceUtils;
}());
__reflect(DeviceUtils.prototype, "DeviceUtils");
