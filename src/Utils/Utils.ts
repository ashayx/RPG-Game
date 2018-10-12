class Utils {
    private static _showLog = true;
    
    public static get showLog() {
        return this._showLog;
    }

    public static set showLog(boo: boolean) {
        this._showLog = boo;
        log = Utils.showLog ? console.log.bind(console) : (...args) => {};
    }
}
let log = Utils.showLog ? console.log.bind(console) : (...args) => {};