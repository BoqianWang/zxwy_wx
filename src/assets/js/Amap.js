/**
 * 地图模块
 * author wzh
 * created 2018-5-23 15:58
 * 
 */
/**
 * 输入提示功能
 * @param  {[type]} value 		  关键字
 * @param  {[type]} callBack      回调函数
 * @return {[type]}       [description]
 */
export function autoComplete(value, callBack) {
	AMap.plugin('AMap.Autocomplete', () => {
		let autoOptions = {
		};
		let searchTipsHandle = new AMap.Autocomplete(autoOptions);
		searchTipsHandle.search(value, (status, result) => {
			callBack(status, result);
		})
	});
}

/**
 * 地理位置定位
 * @param  {[type]} callBack 回调函数
 * @return {[type]}          [description]
 */
export function getCurrentPosition(callBack) {
	AMap.plugin(['AMap.Geolocation', 'AMap.CitySearch'], () => {
		let geolocation = new AMap.Geolocation({
			timeout: 10000,
		});
		geolocation.getCurrentPosition((status, result) => {
			if(status == 'complete') {
				callBack('gps', result)
			} else {
				geolocation.getCityInfo((status, result) => {
					callBack('ip', result)
				})
			}
		})
	})
}
