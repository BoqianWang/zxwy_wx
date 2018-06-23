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
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			console.log(r);
			if(r.accuracy) {
				addressInfo = {
					district: r.address.district,
					street: r.address.street,
					streetNumber: r.address.streetNumber,
					lng: r.point.lng,
					lat: r.point.lat
				}
				setPositionInfo(addressInfo);
				callBack('gps', 'success')
			} else {
				geoc.getLocation(r.point, function(res) {
					console.log(res);
					let addressComponents = res.addressComponents
					addressInfo = {
						district: addressComponents.district,
						street: addressComponents.street,
						streetNumber: addressComponents.streetNumber,
						lng: res.point.lng,
						lat: res.point.lat
					}
					setPositionInfo(addressInfo);
					callBack('ip', 'success');
				})
			}
			
		}
		else {
			alert('failed' + this.getStatus());
		}        
	},{ enableHighAccuracy: true });
}
//保存地址都本地
function setPositionInfo(res) {
	let longitude = '',
		latitude = '',
		address = '',
		positionInfo = {};
		address = res['district'] + res['street'] + 
				  res['streetNumber'];
		longitude = res['lng'];
		latitude = res['lat'];
	positionInfo = {
		address,
		longitude,
		latitude
	};
	Tools.setLocalStorage('positionInfo', positionInfo);
}
