<template>
	<div class="search-address bg-white">
		<router-script @load-finsh="AmapFinsh" src="https://webapi.amap.com/maps?v=1.4.6&key=e50ead2320592e7db5bb32cb484c180b"></router-script>
		<div class="p-ten">
			<div class="search-title p-ten bg-white">
				<div class="fixed-wrap flex-box align-center p-l-ten">
					<span class="iconfont icon-search font-b"></span>
					<input autofocus="autofocus" class="search-input white-f p-l-ten" placeholder="请输入地址名称" v-model="address">
				</div>
			</div>
			<div class="address-list font-15">
				<li class="p-t-ten p-b-ten" v-for="item in addressList" @click="comfirmAddress(item)">
					<p class="color-3">{{item.name}}</p>
					<p class="color-9" v-show="item.address.length > 0">{{item.address}}</p>
				</li>
<!-- 				<li class="p-t-ten p-b-ten">
					<p class="color-3">中民时代广场</p>
					<p class="color-9">笋岗东路2377号</p>
				</li>
				<li class="p-t-ten p-b-ten">
					<p class="color-3">中民时代广场</p>
					<p class="color-9">笋岗东路2377号</p>
				</li> -->
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.search-address {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
		.search-title {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			.fixed-wrap {
				background: rgba(0, 0 , 0, .4);
				border-radius: 20px;
				color: #fffbfb;
				height: 36px;
			}
		}
		.search-input::-webkit-input-placeholder {
			color: #fffbfb;
		}
		.search-input {
			width: 100%;
			height: 100%;
			background: none;
			font-size: 16px;
		}
		.address-list {
			padding-top: .4rem;
		}
		.address-list > li {
			border-bottom: 1px solid #eee;
		}
	}
</style>
<script>
	import routerScript from '@/components/routerScript.vue';
	import { autoComplete } from '@/assets/js/AMap.js';
	export default {
		components: {
			routerScript
		},
		data() {
			return {
				address: '',
				addressList: {}
			}
		},
		watch: {
			address(currenValue) {
				this.toSearch(currenValue);
			}
		},

		mounted() {
			this.$store.commit('editAddress', null);
			// this.autoComplete();
		},

		methods: {
			AmapFinsh() {
				this.toSearch(this.address);
			},
			comfirmAddress(info) {
				let addressInfo = {
					recipientAddress: `${info['address']}(${info['name']})`,
					// recipientAddress: `${info['district']}${info['address']}(${info['name']})`,
					recipientLon: info['location']['lng'],
					recipientLat: info['location']['lat']
				}
				this.$store.commit('recordAddress', addressInfo);
				this.$router.go(-1);
			},
			//初始化输入提示地址插件
			// autoComplete() {
			// 	AMap.plugin('AMap.Autocomplete', () => {
			// 		let autoOptions = {
			// 		};
			// 		this.searchTipsHandle = new AMap.Autocomplete(autoOptions);
			// 	});
			// },
			//搜索地址关键字
			toSearch(value) {
				if(value == '') {
					return;
				}
				autoComplete(value, (status, result) => {
					// console.log(status, result);
					if(status == 'complete') {
						this.addressList = result.tips;
					} else {
						// this.$toast(`${status}: 解析地址出错`);
					}
				})
				// this.searchTipsHandle.search(value, (status, result) => {
				// 	console.log(status, result);
				// 	if(status == 'complete') {
				// 		this.addressList = result.tips;
				// 	} else {
				// 		// this.$toast(`${status}: 解析地址出错`);
				// 	}
				// })
			}
		}
	}
</script>