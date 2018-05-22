<template>
	<div class="bg-white">
		<div class="takeout-wrap" id="takeout-wrap">
			<div class="takeout-shop-t-w" @click="showShopDetial">
				<!-- 头部 -->
				<div class="shop-title rel" :style="{backgroundImage: 'url(' + defaultImg + ')'}">
					<!-- <p class="abs" style="background-image: url(https://fuss10.elemecdn.com/e/7d/9854d2f95050092a008b4e3ee29e6png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/);">
					</p> -->
					<p class="abs" :style="'background-image: url(' + shopInfo['shopLogo'] + ');'">
					</p>
				</div>
				<!-- 描述 -->
				<div class="shop-desc">
					<p class="text-center">
						<b class="shop-name">{{shopInfo['shopName']}}</b>
						<span class="tips tips-takeout" v-if="shopInfo['isWm'] == 1"></span>
					</p>
					<div class="text-center shop-desc-detail">
						<div class="p-t-ten detail-sales color-3">
							<!-- <span>4.7</span> -->
							<span>销量{{shopInfo['goodsSales']}}</span>
							<span>{{shopInfo['businessName']}}</span>
							<span>{{shopInfo['distance']}} {{shopInfo['expectTime']}}分钟</span>
						</div>
						<div class="p-t-ten font-12 color-7">
							<!-- 欢迎光临，用餐高峰期请提前下单，谢谢	 -->
							{{shopInfo['shopIntro']}}
						</div>
						<div class="p-t-ten color-6">
							<span class="tips tips-first"></span>
							<span>
								新用户首单立减(不与其他活动同享)
							</span>
							<span class="color-9 font-12 p-l-ten rel">
							  <span class="shop-down iconfont icon-sanjiaoxing-down abs"></span>
							  <span class="p-l-ten">4个活动</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 推荐 -->
			<div class="p-l-ten p-r-ten m-t-ten flex-box text-center selected">
				<span class="flex-1 actived">商品</span>
				<span class="flex-1">评价</span>
				<span class="flex-1">商家</span>
			</div>
			<!-- 菜单详情 -->
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
						<ul class="font-12 color-7" id="classify-list">
							<li v-for="item in categoryListDate">
								<span style="-webkit-box-orient: vertical;">{{item.categoryName}}</span>
							</li>
							<!-- <li class="active">
								<span>分类名称1</span>
							</li>
							<li>
								<span>分类名称2</span>
							</li>
							<li>
								<span style="-webkit-box-orient: vertical;">分类名称3</span>
							</li>
							<li>
								<span style="-webkit-box-orient: vertical;">分类名称4</span>
							</li> -->
						</ul>
						<section class="flex-1 p-ten section-menu" id="section-menu">
							<div class="scoller-list" v-for="item in MenuListDate">
								<p class="color-3 con-wrap-title">
									{{item.categoryName}}
									<span class="color-9 font-12">{{item.categoryDescribe}}</span>
								</p>
								<div>
									<div class="wrap-block flex-box p-t-ten p-b-ten" v-for="info in item['goodsList']">
										<div class="menu-img" :style="'background-image: url(' + info['goodsPic'] + ');'">
											
										</div>
										<div class="flex-1 p-l-ten menu-detail">
											<p class="color-3 menu-d-title text_over">
												<span>{{info.goodsName}}</span>
											</p>
											<p class="font-12 color-6 menu-d-desc text_over">
												<span>{{info.goodsDescribe}}</span>
											</p>
											<p class="font-12 color-6">
												<span>销量{{info.goodsSales}}</span>
											</p>
											<!-- <p class="menu-d-tag"> -->
												<!-- <span class="tag-desc">商品标签</span> -->
												<!-- <span class="tag-desc">6折</span>
												<span>每单限2份</span>
												<span class="tag-residue">剩9分</span> -->
											<!-- </p> -->
											<div class="p-t-ten flex-box align-justify">
												<div v-if="info['sku'].length == 1">
													<span class="price">¥{{info['sku'][0].discountPrice}}</span>
													<span class="color-7" style="font-size: 8px;">
														/份 <del>¥{{info['sku'][0].price}}</del>
													</span>
												</div>
												<div v-else>
													<span class="price">¥{{info['sku'][0].discountPrice}}</span>
													<span class="color-7" style="font-size: 8px;">起</span>
												</div>
												<addMenu></addMenu>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- <div class="scoller-list">
								<p class="color-3 con-wrap-title">分类名称2</p>
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
												<span class="tag-desc">6折</span>
												<span>每单限2份</span>
												<span class="tag-residue">剩9分</span>
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
												<span class="tag-desc">6折</span>
												<span>每单限2份</span>
												<span class="tag-residue">剩9分</span>
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
											</div>
										</div>
									</div>
								</div>
							</div> -->
						</section>
					</div>
					<footer class="shop-cart align-justify rel flex-box" style="z-index: 3333;">
						<div class="shop-cart-icon text-center abs" @click="showShopCartDetail">
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
			<!-- 店铺详情 -->
			<mt-popup v-model="popupVisible" position="bottom">
			  <div class="p-ten popup-shop-detail rel">
			  	  <span class="shop-d-close abs iconfont icon-close p-ten"  @click="showShopDetial"></span>
			  	  <p class="color-3 font-15 p-b-ten m-t-ten">优惠</p>
			  	  <div>
			  	  	<p class="p-b-ten">
			  	  		<span class="tips tips-first"></span>
			  	  		<span class="color-6 font-12">新用户首单立减(不与其他活动同享)</span>
			  	  	</p>
			  	  	<p class="p-b-ten">
			  	  		<span class="tips tips-sub"></span>
			  	  		<span class="color-6 font-12">满减活动</span>
			  	  	</p>
			  	  	<p class="p-b-ten">
			  	  		<span class="tips tips-ticket"></span>
			  	  		<span class="color-6 font-12">代金券优惠</span>
			  	  	</p>
			  	  	<p class="p-b-ten">
			  	  		<span class="tips tips-intergral"></span>
			  	  		<span class="color-6 font-12">现金积分</span>
			  	  	</p>
			  	  </div>
			  	  <p class="color-3 font-15 shop-d-top">配送</p>
				  <div class="color-6 font-12">
				   	 <p>
				   	 	<span>起送¥{{shopInfo['startSendFee']}} </span>
				   	 	<span>配送¥{{shopInfo['expressFee']}} </span>  
				   	 	<span>{{shopInfo['expectTime']}}分钟</span>
				   	 </p>
				   	 <p v-if="shopInfo['distributionTime']">
				   	 	配送时间: 
				   	    {{shopInfo['distributionTime'][0]}},
				   		{{shopInfo['distributionTime'][1]}}
				     </p>
				  </div>
			  	  <p class="color-3 font-15 shop-d-top">公告</p>
				  <div class="color-6 font-12">
				  	   {{shopInfo['shopNotices']}}
				  	  <!-- 欢迎光临,好高兴为您服务~~~欢迎光临，用餐高峰期请提前下单，谢谢。欢迎光临，用餐高峰期请提前下单，谢谢。欢迎光临，用餐高峰期请提前下单，谢谢。 -->
				  </div>
			  </div>
			</mt-popup>
			<!-- 购物车 -->
			<mt-popup v-model="shopCartVisible" position="bottom">
				<div class="popup-shop-detail popup-short-cat font-15">
					<div class="p-ten flex-box justify-s-b p-short-c-t">
						<p class="color-3 font-b">已选商品</p>
						<p class="color-7">
							<span class="iconfont icon-delete"></span>
							<span>清空</span>
						</p>
					</div>
					<div class="short-cart-block p-l-ten p-r-ten ">
						<li class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>小锅焖面</p>
								<span class="font-12 color-9">加辣/大份/</span>
							</div>
							<span>
								<span class="moeny price">¥38.5</span>
								<add-menu></add-menu>
							</span>
						</li>
						<li class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>小锅焖面</p>
								<span class="font-12 color-9">加辣/大份/</span>
							</div>
							<span>
								<span class="moeny price">¥38.5</span>
								<add-menu></add-menu>
							</span>
						</li>
						<li class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>小锅焖面</p>
								<span class="font-12 color-9">加辣/大份/</span>
							</div>
							<span>
								<span class="moeny price">¥38.5</span>
								<add-menu></add-menu>
							</span>
						</li>
						<li class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>小锅焖面</p>
								<span class="font-12 color-9">加辣/大份/</span>
							</div>
							<span>
								<span class="moeny price">¥38.5</span>
								<add-menu></add-menu>
							</span>
						</li>
						<li class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>小锅焖面</p>
								<span class="font-12 color-9">加辣/大份/</span>
							</div>	
							<span>
								<span class="moeny price">¥38.5</span>
								<add-menu></add-menu>
							</span>
						</li>
						<li class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>小锅焖面</p>
								<span class="font-12 color-9">加辣/大份/</span>
							</div>
							<span>
								<span class="moeny price">¥38.5</span>
								<add-menu></add-menu>
							</span>
						</li>
					</div>
					<p class="p-t-ten" style="background: #F9F9F9;"></p>
					<div class="flex-box align-center justify-s-b p-ten">
						<p>打包盒</p>
						<p class="price p-r-ten">¥3</p>
					</div>
				</div>
			</mt-popup>
		</div>
	</div>
</template>
<style scoped lang="scss">
@import "../../style/mixin";
@import "../../style/iconfont/iconfont.css";
	.v-modal {
		overflow: hidden;
	}
	.popup-short-cat {
		/*padding-bottom: .7rem;*/
		.p-short-c-t {
			background: #F9F9F9;
		}
		.moeny {
			padding-right: .3rem;
		}
		.short-cart-block {
			max-height: 244px;
			overflow: auto;
			li {
				border-bottom: 1px solid #F9F9F9;
			}
		}
	}
	.popup-shop-detail {
		width: 3.76rem;
		padding-bottom: .8rem;
		.shop-d-top {
			padding: .2rem 0 .1rem 0;
		}
		.shop-d-close {
			font-size: .2rem;
			right: 0;
			top: 0;
			font-weight: bold;
		}
	}
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
		z-index: 3333;
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
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.shop-title {
		height: 1.2rem;
/*		background: #FF6E15;
*/		background-size: cover;
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
	.shop-name {
		color: #333;
		font-size: .2rem;
	}
	.shop-desc-detail {
		font-size: .118rem;
		.shop-down {
			left: .05rem;
			top: 0.01rem;	
		}
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
			-webkit-line-clamp: 3;
			overflow: hidden;
			-webkit-box-orient: vertical;
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
		
	}
	.price {
		color: #FF2618;
		font-size: .15rem;
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
	import fetch from '@/config/fetch.js';
	export default {
		components: {
		    addMenu
		},
		data() {
			return {
				defaultImg: 'http://chuantu.biz/t6/313/1526552904x-1404793429.png',
				height: 0,
				popupVisible: false,
				shopCartVisible: false,
				shopInfo: {},
				//分类列表数据
				categoryListDate: [],
				//菜单列表数据
				MenuListDate: []
			}
		},
		// computed() {
		// 	//图片
		// 	shopLogo() {
		// 		return  this.shopInfo['shopLogo'] ? this.shopInfo['shopLogo'] : this.defaultImg ;
		// 	}
		// },
		mounted() {
			this.init();
		},
		methods: {
			showShopDetial() {
				this.popupVisible = !this.popupVisible;
			},
			showShopCartDetail() {
				this.shopCartVisible = !this.shopCartVisible;
			},
			init() {
				this.getTakeOutShop();
				this.getTakeoutMenu();
			},
			//获取外卖菜单
			getTakeoutMenu() {
				fetch.fetchPost('/goods/v3.2/toGoodsList', {
					shopAuthenticateId: 'e9e50cd971a6466681082098b9299259'
				}).then(res => {
					let data = res.data;
					for(let item of data) {
						if(item['goodsList'].length <= 0) {
							continue;
						}
						let categoryItem = { categoryName: item['categoryName']};
						let MenuListItem = {
							categoryDescribe: item['categoryDescribe'],
							goodsList: item['goodsList'],
							categoryName: item['categoryName']
						};
						this.categoryListDate.push(categoryItem);
						this.MenuListDate.push(MenuListItem);

					}
					console.log(this.MenuListDate)
					setTimeout(() => {					
						this.DOMOptions();
					}, 10)
				}).catch(res => {

				})
			},
			//获取店铺资料
			getTakeOutShop() {
				fetch.fetchPost('/index/v3.2/toBizPage', {
					shopAuthenticateId: 'e9e50cd971a6466681082098b9299259',
					longitude: '113.116376',
					latitude: '22.562875'
				}).then(res => {
					this.shopInfo = res.data;
					this.shopInfo['distributionTime'] = JSON.parse(this.shopInfo['distributionTime']);
				}).catch(res => {

				})
			},
			//dom操作
			DOMOptions() {
				//计算屏幕高度
				this.height = document.documentElement.clientHeight;
				//菜单容器
				this.sectionMenu = document.querySelector('#section-menu');
				//左侧菜单列表
				this.classifyList = document.querySelectorAll('#classify-list > li');
				//分类数量
				this.ListCount = this.classifyList.length;
				//右侧菜单列表
				this.sectionMenuList = this.sectionMenu.children;
				// 菜单起始高度
				this.MenuListInitTop = this.sectionMenuList[0].offsetTop + 40;
				//初始菜单index
				this.currentIndex = 0;
				this.sectionMenu.addEventListener('scroll', (e) => {
					this.scollEvent();
				});
				this.showCurrentClassify(this.currentIndex, 'active');
				this.clickEvent();
			},
			// 滚动事件
			scollEvent() {
				//body滚动条滚动
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
					MenuScrollTop = this.sectionMenu.scrollTop;

				document.documentElement.scrollTop = document.body.scrollTop = MenuScrollTop;

				for(let i = 0; i < this.ListCount; i++){
					let MenuListTop = this.sectionMenuList[i].offsetTop - this.MenuListInitTop;
					if(MenuScrollTop >= MenuListTop) {
						this.currentIndex = i;
					}
				}
				this.showCurrentClassify(this.currentIndex, 'active');
			},
			//点击事件
			clickEvent() {
				let self = this;
				for(let i = 0; i < this.ListCount; i++) {
					this.classifyList[i]['index'] = i;
					this.classifyList[i].onclick = function() {
						self.showCurrentClassify(this.index, 'active');
						self.sectionMenu.scrollTop = self.sectionMenuList[this.index].offsetTop - self.MenuListInitTop;
					}
				}
			},
			//高亮显示当前分类
			showCurrentClassify(index, className) {
				for(let i = 0; i < this.ListCount; i++) {
					this.classifyList[i].className = '';
				}
				this.classifyList[index].className = className;
			}
		}
	}
</script>