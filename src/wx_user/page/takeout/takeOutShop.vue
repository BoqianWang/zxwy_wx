<template>
	<div class="bg-white">
		<div class="shop-title rel">
			<p class="abs" style="background-image: url(https://fuss10.elemecdn.com/e/7d/9854d2f95050092a008b4e3ee29e6png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/);">
			</p>
		</div>
		<div class="shop-desc">
			<p class="text-center">
				<span class="shop-tag white-f">外卖</span>
				<b class="shop-name">九毛九(华强茂业店)</b>
			</p>
			<div class="text-center shop-desc-detail">
				<div class="p-t-ten detail-sales color-3">
					<span>4.7</span>
					<span>月首999</span>
					<span>八卦岭商圈</span>
					<span>4.7km 30分钟</span>
				</div>
				<div class="p-t-ten font-12 color-7">
					欢迎光临，用餐高峰期请提前下单，谢谢	
				</div>
				<div class="p-t-ten color-6">
					<span class="shop-tag white-f m-r-ten">首</span>
					新用户首单立减(不与其他活动同享)
				</div>
			</div>
		</div>
		<div class="p-l-ten p-r-ten m-t-ten flex-box text-center selected">
			<span class="flex-1 actived">商品</span>
			<span class="flex-1">评价</span>
			<span class="flex-1">商家</span>
		</div>
		<div class="shop-container">
			<div class="shop-recommend p-ten">
				<p class="color-3 p-b-ten">商家推荐</p>
				<div>
					<div class="recommed-block">
						<img src="" alt="">
						<p>
							<span>商品名名称</span>
							<span>关键词</span>
						</p>
						<p>
							<span>¥</span>
							<span></span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.shop-title {
		height: 1.2rem;
		background: #FF6E15;
	}
	.shop-title > p {
		width: .8rem;
		height: .8rem;
		background-size: cover;
		left: 50%;
		transform: translateX(-50%);
		bottom: -.2rem;	
	}
	.shop-desc {
		padding: .4rem .1rem 0;
	}
	.shop-tag {
		padding: .02rem .05rem;
		background: #9BDE56;
		font-size: .1rem;
	}
	.shop-name {
		color: #333;
		font-size: .2rem;
	}
	.shop-desc-detail {
		font-size: .118rem;
	}
	.color-3 {
		color: #333;
	}
	.color-7 {
		color: #777;
	}
	.color-6 {
		color: #666
	}
	.shop-desc-detail .detail-sales span + span:before {
		/*border-left: 1px solid #d0cece;*/
		content: "|";
		padding: 0 .1rem;
		color: #d0cece;
	}
	.selected {
		height: 42px;
		line-height: 42px;
		border-bottom: 1px solid #EEE;
		color: #999;
	}
	.selected .actived {
		border-bottom: 1px solid #FF6E15;
		color: #333;
	}
	.shop-recommend {
		overflow: auto;
	}
	.shop-recommend .recommed-block {
		float: left;
		width: 1.24rem;
	}
</style>
<script>
	export default {

	}
</script>