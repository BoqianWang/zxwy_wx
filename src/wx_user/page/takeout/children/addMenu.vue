<template>
	<div style="display: inline-block;">
		<div class="flex-box add-menu text-center">
			<p class="subtract iconfont icon-subtract"></p>
			<p class="menu-num color-3">1</p>
			<p class="add iconfont icon-add white-f" @click="size"></p>
			<!-- <p @click="size">选规格</p> -->
		</div>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="size-wrap p-ten">
		  	<div class="flex-box p-b-ten">
		  		<div class="menu-img" style="background-image: url(http://img2.imgtn.bdimg.com/it/u=3023032273,2537755673&fm=27&gp=0.jpg);">
		  		</div>
		  		<div class="flex-1 p-l-ten flex-box menu-detail">
		  			<div class="color-3">
		  				<p>菜品名称</p>
			  			<span class="color-3 font-12">已选:
							小 / 微辣 / 不要葱花 / 等等等
			  			</span>
		  			</div>
		  			<p class="size-money">¥38.6</p>
		  		</div>
		  	</div>
		  	<div>
		  		<p class="font-15 p-b-ten color-7">规格</p>
		  		<div class="clearfix chose-size">
		  			<span>规格名称</span>
		  			<span>规格名称2</span>
		  			<span>规格名称3</span>
		  			<span>规格名称</span>
		  			<span>规格名称2</span>
		  		</div>
		  		<p class="font-15 p-b-ten color-7">属性</p>
		  		<div class="clearfix chose-size">
		  			<span>规格名称</span>
		  			<span>规格名称2</span>
		  			<span>规格名称3</span>
		  			<span>规格名称</span>
		  			<span>规格名称2</span>
		  		</div>
		  	</div>
		  	<mt-button class="sure" type="primary">选好了</mt-button>
		  </div>
		</mt-popup>
	</div>
</template>
<style scoped lang="scss">
	@import '../../../style/mixin.scss';
	@import '../../../style/iconfont/iconfont.css';
	.add-menu {
		align-items: center;
	}
	.add-menu .menu-num {
		padding: 0 .05rem;

	}
	.subtract {
		color: #FF6F15;
	}
	.add {
		background: #FF6F15;
	}
	.add-menu .subtract,.add-menu .add  {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border:1px solid #FF6F15;
		line-height: 20px;
	}
	.size-wrap {
		width: 3.76rem;
		.sure {
			width: 100%;
			background: -webkit-linear-gradient(left, #FFB911, $mainColor);
			height: .4rem;
		}
		.menu-img {
			width: 1rem;
			height: 1rem;
			background-size: cover;
		}
		.menu-detail {
			align-content: space-between;
			 flex-wrap: wrap;
		}
		.size-money {
			color: #FF2618;
			font-size: .24rem;
		}
		.chose-size span {
			float: left;
			font-size: .15rem;
			padding: .05rem .1rem;
			background: #EEE;
			margin: 0 .1rem .1rem 0;
			color: #333;
			border-radius: 4px;
		}
	}
</style>
<script>
	export default {
		data() {
			return {
				popupVisible: false
			}
		},
		mounted() {

		},
		methods: {
			size() {
				this.popupVisible = true;
			}
		}
	}
</script>