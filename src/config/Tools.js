(function() {
/**
 * JavaScript的工具库,方便使用
 * author   a_boy
 * created  2018-4-7 18:06
 * update   2018-4-17 
 */
	var Tools = {
		/**
		 * 日期时间换成Unix时间戳
		 * data  	时间戳    必填
		 * @param {[type]} data [description]
		 */
		DateToTimestamp: function(data) {
			return Date.parse(data) / 1000;
		},
		/**
		 * Unix时间戳转成时间
		 * @param {[type]} format     格式: 	 			必填
		 * 如: YY/MM/DD hh:mm:ss   
		 *     YY年MM月DD日 hh时mm分ss秒
		 *     Y-M-D h:m:s
		 * @param {[type]} timestamp '时间戳: 1525147931'	可填(默认当前时间)
		 */
		TimestampToDate: function(format, timestamp) {
			var date = timestamp ? new Date(parseInt(timestamp) * 1000) : new Date(+new Date());
			var	year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours(),
				minute = date.getMinutes(),
	            second = date.getSeconds();
			var str = format.replace(/[YyMmDdHhSs]+/g, function(w) {
				if(w == 'yy' || w == 'YY' || w == 'y' || w == 'Y') {
					return year.toString().substring(2);

				} else if(w == 'yyyy' || w == 'YYYY') {
					return year;

				} else if(w == 'MM') {
					return month >= 10 ? month : '0' + month; 

				} else if(w == 'M') {
					return month;

				} else if(w == 'DD' || w == 'dd') {
					return day >= 10 ? day : '0' + day;

				} else if(w == 'D' || w == 'd') {
					return day;

				} else if(w == 'HH' || w == 'hh') {
					return hour >= 10 ? hour : '0' + hour;

				} else if(w == 'H' || w == 'h') {
					return hour;

				} else if(w == 'mm') {
					return minute >= 10 ? minute : '0' + minute;

				} else if(w == 'm') {
					return minute;

				} else if(w == 'ss' || w == 's') {
					return second >= 10 ? second : '0' + second;
				}
			});
			return str;
		},

		/**
		 * 精确到两位小数
		 * @param {[type]} money 数值         必填
		 * @param {[type]} num   精确多少位   可填(默认两位)
		 */
		ToCurrency: function(money, num = 2) {
			return parseFloat(money).toFixed(num);
		},

		/**
		 * 设置cookies
		 * @param {[type]} name    cookie名称    必填
		 * @param {[type]} value   cookie值		 必填
		 * @param {[type]} expires 缓存多少秒	 可填
		 * @param {[type]} options 对象          可填(默认设置根目录)
		 */
		setCookies: function(name, value, expires, options = {}) {
			var cookieText = name + '=' + value;
			options.path = options.path || '/';
			if(expires) {
				var timestamp = (new Date().getTime()) / 1000 + expires;
				var dateObj = new Date(timestamp * 1000);
				cookieText += '; expires=' + dateObj.toGMTString();
			}

			if(options.path) {
				cookieText += '; path=' + options.path;
			}
			if(options.domain) {
				cookieText += '; domain=' + options.domain;
			}
			document.cookie = cookieText;
		},
		/**
		 * 获取cookie的值
		 * @param  {[type]} name cookie值
		 * @return {[type]}      [description]
		 */
		getCookie: function(name) {
			var value = document.cookie,
				cookieName = name + '=';
				cookieStart = value.indexOf(cookieName),
				cookieValue = null;
			if(cookieStart > -1) {
				var cookieEnd = value.indexOf(';', cookieStart);
				cookieEnd = cookieEnd > -1 ? cookieEnd : value.length;
				cookieValue = value.substring(cookieStart + cookieName.length, cookieEnd)
			}
			return cookieValue;
		},
		/**
		 * 清除cookies
		 * 
		 * @return {[type]} [description]
		 */
		clearCookies: function(name,options = {}) {
			this.setCookies(name, '', -1, options);
		}
		
	};
	// export default Tools;
	window.Tools = Tools;
})();