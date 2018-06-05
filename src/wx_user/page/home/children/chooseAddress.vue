<template lang="html">
  <div class="choose-address">
  	 <router-script @load-finsh="AmapFinsh" src="https://webapi.amap.com/maps?v=1.4.6&key=e50ead2320592e7db5bb32cb484c180b"></router-script>
     <div class="search-title-wrap p-ten bg-white">
     	<div class="search-title flex-box p-t-ten p-b-ten">
	     	<span class="iconfont icon-search font-b color-7"></span>
	     	<input class="flex-1 color-7 font-15" type="text" placeholder="请输入地址" v-model="keyword">
     	</div>
     </div>
     <div class="search-location p-ten bg-white flex-box align-center m-t-ten" @click="locationPosition" v-show="showMyAddress">
     	<span class="iconfont icon-miaozhun color-main p-r-ten"></span>
     	<span class="color-3 font-15 text_over">{{currentAddress}}</span>
     </div>
	 <!-- 我的收货地址 -->
     <section v-show="showMyAddress">
		 <div class="p-ten">
		 	<span class="iconfont icon-task-management"></span>
		 	<span class="color-7 font-15">我的收货地址</span>
		 </div>
		 <div class="chose-list-wrap p-l-ten p-r-ten bg-white">
		 	<li class="font-15 p-t-ten p-b-ten" v-for="item in addressList" @click="choseAddress(item)">
		 		<p class="color-3 text_over">{{item.recipientAddress}}</p>
		 		<p class="color-7">
		 			<span>{{item.recipientName}}</span> 
		 			<span>{{item.recipientPhone}}</span>
		 		</p>
		 	</li>
		 	<!-- <li class="font-15 p-t-ten p-b-ten">
		 		<p class="color-3 text_over">广东省深圳市罗湖区中民时代广场B座2013楼三点发水电费</p>
		 		<p class="color-7">
		 			<span>小仙女</span> 
		 			<span>18924298774</span>
		 		</p>
		 	</li> -->
		 </div>
     </section>
	 <!-- 输入提示功能 -->
     <section v-show="!showMyAddress">
     	<div class="chose-list-wrap p-l-ten p-r-ten bg-white">
     		<li class="font-15 p-t-ten p-b-ten" v-for="item in autoCompleteAddress" @click="choseAutoCompleteAddress(item)">
		 		<p class="color-3 text_over font-b">{{item.name}}</p>
		 		<p class="color-7 font-12">
		 			{{item.district + item.address}}
		 		</p>
		 	</li>
		 	
		 	<!-- <li class="font-15 p-t-ten p-b-ten">
		 		<p class="color-3 text_over font-b">中民时代广场</p>
		 		<p class="color-7 font-12">
		 			广东省深圳市罗湖区中民时代广场B座2
		 		</p>
		 	</li> -->

     	</div>
     </section>

	 <router-link to="/takeOut/addAddress">
		 <footer class="add-address bg-white text-center">
				<span class="iconfont icon-add"></span>
				<span class="color-3 font-15">新增收货地址</span>
		 </footer>
	 </router-link>
  </div>
</template>
<style lang="scss" scoped>
	@import "../../../style/mixin";
	.add-address {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: .4rem;
		line-height: .4rem;
		.icon-add {
			/*padding: .02rem;*/
			border: 1px solid $mainColor;
			border-radius: 50%;
			color: $mainColor;
			width: 22px;
			height: 22px;
		}
	}
	.choose-address {
		.chose-list-wrap {
			margin-bottom: .6rem;
		}
		.chose-list-wrap li {
			line-height: .26rem;
			border-bottom: 1px solid #eee;
		}
	 	.search-title {
	 		background: #F9F9F9;
	 		span {
	 			padding: 0 .05rem;
	 		}
	 		input {
	 			background: none;
	 		}
	 	}
	 	.search-location {
			justify-content: center;
			height: .5rem;
	 	}
	}
	.search-title-wrap {
 		/*position: fixed;
 		width: 100%;
 		left: 0;
 		top: 0;*/
	}
</style>

<script>
import routerScript from '@/components/routerScript.vue';
import {autoComplete, getCurrentPosition} from '@/assets/js/Amap.js';
import fetch from '@/config/fetch.js';
export default {
	components: {
			routerScript
	},
	data() {
		return {
			addressList: [],
			params: {},
			keyword: '',
			currentAddress: '定位到当前位置',
			showMyAddress: true,
			autoCompleteAddress: [],
			scirptIsLoad: false
		}
	},
	watch: {
		keyword(currentValue) {
			if(currentValue == '') {
				this.showMyAddress = true;
				return;
			}

			this.showMyAddress = false;
			autoComplete(currentValue, (status, res) => {
				if(status == 'complete') {
					this.autoCompleteAddress = res.tips;
				}
			})
		}
	},
	mounted() {
		this.getAddressList();
	},
	methods: {
		AmapFinsh() {
			this.scirptIsLoad = true;
		},
		//选择提示的收货地址
		choseAutoCompleteAddress(info) {
			this.setPositionInfo(info['district'] + info['address'], info['location']['lng'], info['location']['lat']);
		},
		//选择已有的收货地址
		choseAddress(info) {
			this.setPositionInfo(info['recipientAddress'], info['recipientLon'], info['recipientLat']);
		},
		//本地缓存地址
		setPositionInfo(address, longitude, latitude) {
			let positionInfo = {
				address: address,
				longitude: longitude,
				latitude: latitude
			};
			Tools.setLocalStorage('positionInfo', positionInfo);
			this.$router.go(-1);
		},
		//定位
		locationPosition() {
			if(!this.scirptIsLoad) {
				this.$toast('地图资源加载中...');
				return;
			}
			this.currentAddress = '正在定位中...';
			getCurrentPosition((type, res) => {
				if(res == 'success') {
					setTimeout(() => {
						this.$router.go(-1);
					}, 500)
				}
			})
		},
		//获取用户地址列表
		getAddressList() {
			let positionInfo = Tools.getLocalStorage('positionInfo');
			this.params['longitude'] = positionInfo['longitude'];
			this.params['latitude'] = positionInfo['latitude'];
			fetch.fetchPost('/address/list',this.params).then(res => {
				this.addressList = res.data;
			}).catch(res => {

			})
		}
	}
}
</script>

