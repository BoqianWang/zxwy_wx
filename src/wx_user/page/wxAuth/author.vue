<template>
	
</template>
<script>
	import fetch from '@/config/fetch.js';
	export default {
		data() {
			return {

			}
		},
		/**
		 * 组件有参数变化时调用
		 * 主要是为了兼容某些手机跳转的时候出现了to.path和from.path一样,
		 * vue认为是组件复用了,没有执行该组件代码,也导致了白屏的出现
		 * @param  {[type]} to   [description]
		 * @param  {[type]} from [description]
		 * @return {[type]}      [description]
		 */
		beforeRouteUpdate (to, from) {
			this.init(to.query.openid);
		},
		mounted() {
			this.init(this.$route.query.openid);
		},
		methods: {
			init(openid) {
				if(openid) {
					Tools.setCookies('zx_token', openid);
					this.$router.push({
						path: Tools.getCookie('beforeLoginUrl')
					});
				} else {
					this.toLogin()
				}
			},
			toLogin() {
				// console.log(this.$route)
				// setTimeout(() => {
				// 	window.location.href = 'http://localhost:8080/#/pay/author?openid=oV3Y2s_Wi_GMbZnEN7x0rRFuKov8';
				// }, 50000)
				 // window.location.replace('http://localhost:8080/#/author?openid=oV3Y2s_Wi_GMbZnEN7x0rRFuKov8')
				let url = this.$route.fullPath;
				fetch.fetchPost('/grant/auth', {
					authorUrl: url
				}).then(res => {
					window.location.href = res.data;
				}).catch(res => {

				})
			}
		}
	}
</script>