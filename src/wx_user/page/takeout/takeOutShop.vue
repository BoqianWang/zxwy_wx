<template>
	<div class="bg-white" style="height: 667px; overflow-x: hidden;">
		
		<div class="takeout-wrap">
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
				<span class="flex-1">商品</span>
				<span class="flex-1">评价</span>
				<span class="flex-1 actived">商家</span>
			</div>
			<div class="shop-container">
				<!-- <div class="shop-recommend p-ten">
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
				</div> -->
				<div :style="{display: 'block'}">
					<div class="shop-con-wrap flex-box" :style="{height: height - 42 + 'px'}">
						<ul class="font-12 color-7">
							<li>
								<span>折扣</span>
							</li>
							<li>
								<span>分类名称</span>
							</li>
							<li class="active">
								<span style="-webkit-box-orient: vertical;">芝心芝普装比萨胜多负少撒旦法胜多负少的说</span>
							</li>
							<li>
								<span>分类名称</span>
							</li>
							<li>
								<span>分类名称胜多负少但是</span>
							</li>
							<li>
								<span>芝心芝普装比萨胜多</span>
							</li>
							<li>
								<span>分类名称</span>
							</li>
							<li>
								<span>分类名称胜多负少但是</span>
							</li>
							<li>
								<span style="-webkit-box-orient: vertical;">芝心芝普装比萨胜多负少撒旦法胜多负少的说</span>
							</li>
							<li>
								<span>分类名称</span>
							</li>
							<li>
								<span>分类名称胜多负少但是</span>
							</li>
						</ul>
						<section class="flex-1 p-ten section-menu">
							<p class="color-3 con-wrap-title">分类名称</p>
							<div>
								<div class="wrap-block flex-box p-t-ten p-b-ten">
									<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
										
									</div>
									<div class="flex-1 p-l-ten menu-detail">
										<p class="color-3 menu-d-title text_over">
											<span>菜品名称撒旦法阿斯顿发送到防守打法</span>
										</p>
										<p class="font-12 color-6 menu-d-desc text_over">
											<span>菜品描述菜品描述菜品描述是的范德萨防守打法是</span>
										</p>
										<p class="font-12 color-6">
											<span>月首355</span>
										</p>
										<p class="menu-d-tag">
											<span class="tag-desc">商品标签</span>
											<!-- <span class="tag-desc">6折</span>
											<span>每单限2份</span>
											<span class="tag-residue">剩9分</span> -->
										</p>
										<div class="p-t-ten flex-box align-justify">
											<div>
												<span class="price">¥38.6</span>
												<span class="color-7" style="font-size: 8px;">
													/份 <del>¥44</del>
												</span>
											</div>
											<addMenu></addMenu>
										</div>
									</div>
								</div>
								<div class="wrap-block flex-box p-t-ten p-b-ten">
									<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
										
									</div>
									<div class="flex-1 p-l-ten menu-detail">
										<p class="color-3 menu-d-title">
											<span>菜品名称</span>
										</p>
										<p class="font-12 color-6 menu-d-desc text_over">
											<span>菜品描述菜品描述菜品描述</span>
										</p>
										<p class="font-12 color-6">
											<span>月首355</span>
										</p>
										<p class="menu-d-tag">
											<span class="tag-desc">商品标签</span>
											<span class="tag-desc">6折</span>
											<span>每单限2份</span>
											<span class="tag-residue">剩9分</span>
										</p>
										<div class="p-t-ten flex-box align-justify">
											<div>
												<span class="price">¥38.6</span>
												<span class="color-7" style="font-size: 8px;">
													/盘 <del>¥44</del>
												</span>
											</div>
											<!-- <addMenu></addMenu>
										 --></div>
									</div>
								</div>
								<div class="wrap-block flex-box p-t-ten p-b-ten">
									<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
										
									</div>
									<div class="flex-1 p-l-ten menu-detail">
										<p class="color-3 menu-d-title">
											<span>菜品名称</span>
										</p>
										<p class="font-12 color-6 menu-d-desc text_over">
											<span>菜品描述菜品描述菜品描述</span>
										</p>
										<p class="font-12 color-6">
											<span>月首355</span>
										</p>
										<p class="menu-d-tag">
											<span class="tag-desc">商品标签</span>
											<span class="tag-desc">6折</span>
											<span>每单限2份</span>
											<span class="tag-residue">剩9分</span>
										</p>
										<div class="p-t-ten flex-box align-justify">
											<div>
												<span class="price">¥38.6</span>
												<span class="color-7" style="font-size: 8px;">
													/盘 <del>¥44</del>
												</span>
											</div>
											<!-- <addMenu></addMenu>
										 --></div>
									</div>
								</div>
								<div class="wrap-block flex-box p-t-ten p-b-ten">
									<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
										
									</div>
									<div class="flex-1 p-l-ten menu-detail">
										<p class="color-3 menu-d-title">
											<span>菜品名称</span>
										</p>
										<p class="font-12 color-6 menu-d-desc text_over">
											<span>菜品描述菜品描述菜品描述</span>
										</p>
										<p class="font-12 color-6">
											<span>月首355</span>
										</p>
										<p class="menu-d-tag">
											<span class="tag-desc">商品标签</span>
											<span class="tag-desc">6折</span>
											<span>每单限2份</span>
											<span class="tag-residue">剩9分</span>
										</p>
										<div class="p-t-ten flex-box align-justify">
											<div>
												<span class="price">¥38.6</span>
												<span class="color-7" style="font-size: 8px;">
													/盘 <del>¥44</del>
												</span>
											</div>
											<!-- <addMenu></addMenu>
										 --></div>
									</div>
								</div>
								<div class="wrap-block flex-box p-t-ten p-b-ten">
									<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
										
									</div>
									<div class="flex-1 p-l-ten menu-detail">
										<p class="color-3 menu-d-title">
											<span>菜品名称</span>
										</p>
										<p class="font-12 color-6 menu-d-desc text_over">
											<span>菜品描述菜品描述菜品描述</span>
										</p>
										<p class="font-12 color-6">
											<span>月首355</span>
										</p>
										<p class="menu-d-tag">
											<span class="tag-desc">商品标签</span>
											<span class="tag-desc">6折</span>
											<span>每单限2份</span>
											<span class="tag-residue">剩9分</span>
										</p>
										<div class="p-t-ten flex-box align-justify">
											<div>
												<span class="price">¥38.6</span>
												<span class="color-7" style="font-size: 8px;">
													/盘 <del>¥44</del>
												</span>
											</div>
											<!-- <addMenu></addMenu>
										 --></div>
									</div>
								</div>
								<div class="wrap-block flex-box p-t-ten p-b-ten">
									<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
										
									</div>
									<div class="flex-1 p-l-ten menu-detail">
										<p class="color-3 menu-d-title">
											<span>菜品名称</span>
										</p>
										<p class="font-12 color-6 menu-d-desc text_over">
											<span>菜品描述菜品描述菜品描述</span>
										</p>
										<p class="font-12 color-6">
											<span>月首355</span>
										</p>
										<p class="menu-d-tag">
											<span class="tag-desc">商品标签</span>
											<span class="tag-desc">6折</span>
											<span>每单限2份</span>
											<span class="tag-residue">剩9分</span>
										</p>
										<div class="p-t-ten flex-box align-justify">
											<div>
												<span class="price">¥38.6</span>
												<span class="color-7" style="font-size: 8px;">
													/盘 <del>¥44</del>
												</span>
											</div>
											<!-- <addMenu></addMenu> -->
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<footer class="shop-cart align-justify rel flex-box">
						<div class="shop-cart-icon text-center abs">
							<mt-badge class="abs cart-tips" type="error" size="small">3</mt-badge>
							<span class="iconfont icon-cart white-f"></span>
						</div>
						<div class="shop-cart-money">
							<p class="white-f">¥11</p>
							<p class="color-9 addtion-money">另需要配送费5元</p>
						</div>
						<div class="color-9 text-center shop-cat-pay to-pay">
							<span>去结算</span>
							<!-- <span>¥20起送</span> -->
						</div>
					</footer>
				</div>
				<div class="shop-detial" :style="{height: height - 42 + 'px',display: 'none'}">
					<div class="p-ten">
						<div class="flex-box p-b-ten m-t-ten addresss-wrap">
							<div class="flex-box align-justify">
								<span class="iconfont icon-map p-r-ten address-m color-9">
								</span>
								<span class="font-15 color-3">  
									深圳市罗湖区宝安南路57号中民时代广场楼某某某
								</span>
							</div>
							<p class="iconfont icon-phone m-l-ten p-l-ten p-r-ten address-p color-7"></p>
						</div>
						<div class="shop-detial-img p-t-ten p-b-ten">
							<ul class="clearfix" style="width: 1200px; ">
								<li class="m-r-ten"></li>
								<li class="m-r-ten"></li>
								<li class="m-r-ten"></li>
								<li class="m-r-ten"></li>
								<li class="m-r-ten"></li>
								<li class="m-r-ten"></li>
							</ul>
						</div>
						<div class="shop-cell m-t-ten">
							<div class="flex-box align-justify p-t-ten p-b-ten shop-cell-list">
								<p class="flex-box align-center">
									<span class="iconfont icon-webicon203 cell-safe color-9"></span>
									<span class="color-3 font-15">查看店铺安全档案</span>
								</p>
								<p class="iconfont icon-more color-9"></p>
							</div>
							<div class="flex-box align-justify p-t-ten p-b-ten shop-cell-list">
								<p class="flex-box align-center">
									<span class="cell-server color-9 iconfont icon-shigongrenyuan p-r-ten"></span>
									<span class="color-3 font-15">配送服务: 高品质配送服务</span>
								</p>
								<!-- <p class="iconfont icon-more color-9"></p> -->
							</div>
							<div class="flex-box align-justify p-t-ten p-b-ten shop-cell-list">
								<p class="flex-box align-center">
									<span class="cell-server color-9 iconfont icon-task-management p-r-ten"></span>
									<span class="color-3 font-15">配送时间: 10:00-23:00</span>
								</p>
								<!-- <p class=" color-9 iconfont icon-more"></p> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
@import "../../style/mixin";
@import "../../style/iconfont/iconfont.css";
	.shop-detial {
		.addresss-wrap {
			border-bottom: 1px solid #eee;
			.address-m {
				font-size: .24rem;
			}
			.address-p {
				font-size: .24rem;
			}
			.address {
				border-right: 1px solid #eee;
			}
		}
		.shop-detial-img {
			width: 100%;
			overflow: auto;
			li {
				float: left;
				width: .94rem;
				height: .7rem;
				background: #eee;
			}
		}
		.shop-cell {
			.cell-safe {
				font-size: .3rem;
			}
			.cell-server {
				font-size: .24rem;
			}
			.shop-cell-list {
				border-bottom: 1px solid #eee;
			}
			.shop-cell-list:first-child {
				border-top: 1px solid #eee;
			}
		}
	}
	.color-9 {
		color: #999;
	}
	.align-justify {
		align-items: center;
		justify-content: space-between;
	}
	.shop-cart {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: .52rem;
		background: #313131;
		/*align-items: center;
		justify-content: space-between;*/
		.shop-cart-money {
			padding-left: .7rem;
			font-size: .18rem;
		}
		.addtion-money {
			font-size: .09rem;
		}
		 .shop-cat-pay {
		 	width: 1.2rem;
		 	height: 100%;
		 	line-height: .52rem;
		 	font-size: .15rem;
		 }
		 .to-pay {
		 	background: linear-gradient(left, #FFB911, $mainColor);
		 	background: -webkit-linear-gradient(left, #FFB911, $mainColor);
		 	color: #fff;
		 }
		 .cart-tips {
		 	right: -.04rem;
		 	top: 0;
		 }
	}
	.shop-cart .shop-cart-icon {
		height: .5rem;
		width: .5rem;
		background: #FF771A;
		border-radius: 50%;
		left: .1rem;
		top: -.1rem;
		.icon-cart {
			font-size: .24rem;
			line-height: .5rem;
			font-weight: bold;
		}
	}
	.shop-cart .empty-cart {
		background: #EEE;
		.icon-cart {
			color: #777;
		}
	}
	.takeout-wrap {
		width: 100%;
		height: 667px;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
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
	.shop-desc-detail .detail-sales span + span:before {
		content: "|";
		padding: 0 .1rem;
		color: #d0cece;
	}
	.selected {
		/*height: 42px;*/
		line-height: 42px;
		border-bottom: 1px solid #EEE;
		color: #999;
	}
	.selected .actived {
		border-bottom: 1px solid $mainColor;
		color: #333;
	}
	.shop-recommend {
		overflow: auto;
	}
	.shop-recommend .recommed-block {
		float: left;
		width: 1.24rem;
	}
	.shop-con-wrap {
		/*overflow: auto;*/
		.con-wrap-title {
			font-size: .15rem;
		}
		section, ul{
			height: 100%;
			overflow: auto;
			padding-bottom: .52rem;
		}
		ul{
			width: .7rem;
			background: #f8f8f8;
			height: 100%;
			overflow: auto;
		}
		ul li {
			padding: .2rem .1rem;
			border-bottom: 1px solid #e8e8e8;
		}
		ul li.active {
			background: #fff;
		}
		ul li span {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
		}
	}
	.section-menu {
	}
	.wrap-block {
		.menu-img {
			width: .78rem;
			height: .8rem;
			background-size: cover;
			border-radius: 2px;
		}
		.menu-detail {
			width: 1.6rem;
		}
		.menu-detail .menu-d-title{
			font-size: .18rem;
		}
		.menu-detail .menu-d-desc {
			padding: .02rem 0;

		}
		.menu-detail .menu-d-tag {
			padding-top: .04rem;
			color: $mainColor;
			font-size: .08rem;
		}
		.price {
			color: #FF2618;
			font-size: .15rem;
		}
		
	}
	.tag-desc {
		border:1px solid $mainColor;
		padding: .01rem .04rem;
		border-radius: 4px;
	}
	.tag-residue {
		border: 1px solid #FF2618;
		color: #FF2618;
		padding: .01rem .04rem;
		background-color: #FFD4D1;
		border-radius: 4px;
	}
</style>
<script>
	// import "@/wx_user/style/iconfont/iconfont.css";
	import addMenu from './children/addMenu.vue';
	export default {
		components: {
		    addMenu
		},
		data() {
			return {
				height: 0
			}
		},
		mounted() {
			this.clientHeight();
		},
		methods: {
			//计算屏幕高度
			clientHeight() {
				this.height = document.body.clientHeight;
				// alert(this.height)
			}
		}
	}
</script>