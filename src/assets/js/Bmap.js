/**
 * 百度地图模块
 *
 * author wzh
 * created 2018-6-22 11:51
 */



/**
 * 定位
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
export function getCurrentPosition(callback) {
	var geolocation = new BMap.Geolocation();
	var geoc = new BMap.Geocoder();
	var addressInfo = {} 
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
				geoc.getLocation(r.point, function(res) {
					let addressComponents = res.addressComponents
					addressInfo = {
						district: addressComponents.district,
						street: addressComponents.street,
						streetNumber: addressComponents.streetNumber,
						lng: res.point.lng,
						lat: res.point.lat
					}
					setPositionInfo(addressInfo);
					callback('ip', 'success');
				})
			// }
			
		}
		else {
			alert('failed' + this.getStatus());
		}        
	},{ enableHighAccuracy: true });
}
//百度坐标转成高德坐标
function bd_decrypt(bd_lng, bd_lat) {  
    var X_PI = Math.PI * 3000.0 / 180.0;  
    var x = bd_lng - 0.0065;  
    var y = bd_lat - 0.006;  
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);  
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);  
    var gg_lng = z * Math.cos(theta);  
    var gg_lat = z * Math.sin(theta); 
    return {
    	lng: gg_lng, 
    	lat: gg_lat
    };
}  

//保存地址都本地
function setPositionInfo(res) {
	let longitude = '',
		latitude = '',
		address = '',
		positionInfo = {};
		address = res['district'] + res['street'] + 
				  res['streetNumber'],
		//百度坐标转成高德坐标
		bd_decrypt = bd_decrypt(res['lng'], res['lat']);
		longitude = bd_decrypt['lng'];
		latitude = bd_decrypt['lat'];
	positionInfo = {
		address,
		longitude,
		latitude
	};
	Tools.setLocalStorage('positionInfo', positionInfo);
}
