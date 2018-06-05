<template>
	<div>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom" class="width-100">
		  <div class="order-status">
		  	<div class="order-status-title font-18 color-3 text-center p-ten">
		  		<span>订单追踪</span>
		  	</div>
		  	<div class="order-status-container p-ten">
		  		<ul>
		  			<li class="rel flex-box justify-s-b align-center" 
		  			v-for="(item, index) in processTrack"
		  			:class="{'active': 0 == index}">
	  					<span class="line" v-if="index < processTrack.length - 1"></span>
		  				<p class="flex-box align-center">
		  					<span class="rel cicrle"></span>
			  				<span class="font-15 color-3 p-l-ten">{{item.process}}</span>
		  				</p>
		  				<span class="font-12 color-9">{{TimestampToDate('YYYY-MM-dd hh:mm:ss', item.time)}}</span>
		  			</li>
		  			<!-- <li class="rel flex-box justify-s-b align-center">
	  					<span class="line"></span>
		  				<p class="flex-box align-center color-3">
		  					<span class="rel cicrle"></span>
			  				<span class="font-15 p-l-ten desc">订单已提交</span>
		  				</p>
		  				<span class="font-12 color-9">2017-10-11 12:03</span>
		  			</li>
		  			<li class="rel flex-box justify-s-b align-center active">
		  				<p class="flex-box align-center color-3">
		  					<span class="rel cicrle"></span>
			  				<span class="font-15 p-l-ten">订单已完成</span>
		  				</p>
		  				<span class="font-12 color-9">2017-10-11 12:03</span>
		  			</li> -->
		  		</ul>
		  	</div>
		  	<div class="order-status-footer width-100 text-center" @click="close">
		  		<span class="font-15 white-f">关闭</span>
		  	</div>
		  </div>
		</mt-popup>
	</div>
</template>
<style scoped lang="scss">
	@import "../../../style/mixin";

	.order-status-title {
		border: 1px solid #eee;
	}
	.order-status-container {
		max-height: 380px;
		overflow: auto;
		ul > li {
			height: 40px;
		}
		ul > li.active {
			p {
				color: $mainColor;
			}
			.cicrle {
				background-color: $mainColor;
			}
			.cicrle:after {
				background: #fff;
			}
		}
		.cicrle {
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background: none;
			display: inline-block;
		}
		.cicrle:after {
			content: "";
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -3px;
            margin-top: -3px;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: #ccc;
		}
		.line {
			position: absolute;
			height: 40px;
			width: 2px;
			background: #EEE;
			left: 7px;
			top: 20px;
		}
	}
	.order-status-footer {
		height: .5rem;
		line-height: .5rem;
		background: -webkit-linear-gradient(left, #ff6e15, #ffb911);
	}
</style>
<script>
	/**
	 * 订单跟踪组件
	 * <order-status :process-track="...."></order-status>
	 */
	export default {
		props: {
			processTrack: {
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				popupVisible: false
			}
		},
		mounted() {

		},
		methods: {
			showHidePoppup() {
				this.popupVisible =! this.popupVisible;
			},
			close() {
				this.showHidePoppup();
			},
			//
			TimestampToDate(format, timestamp) {
				timestamp = timestamp / 1000;
				return Tools.TimestampToDate(format, timestamp);
			}
		}
	}
</script>