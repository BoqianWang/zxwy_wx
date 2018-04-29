<template>
	<div>
		<mt-button type="default" @click="toLocation">点击获取Code</mt-button>
		<mt-button type="default" @click="commitCode">点击提交code</mt-button>
	</div>
</template>
<style>
	
</style>
<script>
	// import axios from 'axios';
	import api from '../../../config/api'
	export default {
		date() {
			return {

			}
		},
		mounted() {
			// this.commitCode();
		},
		methods: {
			toLocation() {
				let ol = encodeURIComponent('http://testpage.zhongxiang51.com/#/pay/test');
				let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx089be09ad25f90c0&redirect_uri=${ol}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
				location.href = url;
			},

			commitCode() {
				if(this.getUrlParmas('code')) {
					api.commitCode(this.getUrlParmas('code')).then(res => {
						console.log(res);
					}).catch(error => {
						console.log(error)
					})
				}
			},
			getUrlParmas: function(param) {
				var url = window.location.href;
				// var url = 'http://testpage.zhongxiang51.com/?code=003j9yzp1tnsdr0QjyDp1XrGzp1j9yzx&state=123#/pay/test'
				if(url.indexOf('?') > 0) {
					var arrParams = url.split('?')[1].split('&'),
						json = {};

					for(var i = 0, len = arrParams.length; i < len; i++) {
						var arr = arrParams[i].split('=');
						json[arr[0]] = arr[1];
					}
					if(param) {
						return json[param];
					} else {
						return json;
					}
				} else {
					return null;
				}
			}
			
		}
	}
</script>