class GlobalFun {
    /** 定时执行 */
	public static async wait(time: number) {
		return new Promise((resolve, reject) => {
			const index: number = egret.setTimeout(() => {
				egret.clearTimeout(index);
				resolve();
			}, this, time);
		});
	}

}