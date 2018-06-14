<template>
	<div style="display: inline-block;">
		<div class="flex-box add-menu text-center" v-if="menuData['isAvailable'] == 1">
			<p class="subtract iconfont icon-subtract" v-show="count > 0" @click="delMenu"></p>
			<p class="menu-num color-3" v-show="count > 0">{{count}}</p>
			<p class="add iconfont icon-add white-f" @click="addMenu"></p>
			<!-- <p @click="size">选规格</p> -->
		</div>
		<!-- <mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="size-wrap p-ten">
		  	<div class="flex-box p-b-ten">
		  		<div class="menu-img" :style="'background-image: url(' + menuData['goodsPic'] + ');'">
		  		</div>
		  		<div class="flex-1 p-l-ten flex-box menu-detail">
		  			<div class="color-3 width-100">
		  				<p>{{menuData['goodsName']}}</p>
		  			</div>
		  			<p class="size-money">¥{{menuData['sku'] && menuData['sku'][specificationIndex]['discountPrice']}}</p>
		  		</div>
		  	</div>
		  	<div>
		  		<div class="specification" v-if="menuData['sku'] && menuData['sku'].length > 1">
			  		<p class="font-15 p-b-ten color-7">规格</p>
			  		<div class="clearfix chose-size">
			  			<span 
			  			v-for="(item,index) in menuData['sku']" 
			  			:class="{'item-selected': specificationIndex == index}"
			  			@click="specificationIndex = index">{{item['spec']}}</span>
			  		</div>
		  		</div>
		  		<div class="atribute" v-for="(item, parentIndex) in goodsAttribute">
			  		<p class="font-15 p-b-ten color-7">{{item.name}}</p>
			  		<div class="clearfix chose-size">
			  			<span 
			  			v-for="(info, subIndex) in item['value']" 
			  			:class="{'item-selected': attributeIndexList[parentIndex] == subIndex}"
			  			@click="choseAttributeINndex(parentIndex, subIndex)">{{info}}</span>
			  		</div>
		  		</div>
		  	</div>
		  	<mt-button class="sure" type="primary" @click="confirm">选好了</mt-button>
		  </div>
		</mt-popup> -->
	</div>
</template>
<style scoped lang="scss">
	@import '../../../../style/mixin.scss';	
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
	/*.size-wrap {
		width: 3.76rem;
		padding-bottom: .8rem;
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
		.chose-size span.item-selected {
			color: #FF6E15;
			background:rgba(255,110,21,.2);
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
	}*/
</style>
<script>
	/**
	 * 按钮组件
	 */
	export default {
		props: {
			menuData: {
				default: () => {
					return {};
				}
			}
		},
		data() {
			return {
				popupVisible: false,
				// count: 0,
				specificationIndex: 0,
				// attributeIndexList: {},
				goodsAttribute: [],
				// goodsTaste: '',
				skuDetail: {}
			}
		},
		computed: {
			//监听购物车数据
			// shopCart() {
			// 	return this.$store.state.cartList;
			// 	return Object.assign({},this.cartList);
			// },
			//购买数量
			count() {
				let shopMenuList = this.$store.state.cartList,
					count = 0;
				if(shopMenuList.length > 0) {
					for(let item of shopMenuList) {
						if(item['goodsId'] == this.menuData['goodsId']) {
							count += item['goodsNum'];
						}
					}
					// return count;
				}
				return count;
			},
		},
		mounted() {
			this.skuDetail = this.menuData['sku'][this.specificationIndex];
			if(this.menuData['goodsAttribute'] && this.menuData['goodsAttribute'] != 'null') {
				this.goodsAttribute = JSON.parse(this.menuData['goodsAttribute']);
			}
		},
		methods: {
			//删除商品
			delMenu() {
				let delData = {
					skuId: this.skuDetail['skuId'],
					goodsTaste: '',
					shopAuthenticateId: this.menuData['shopAuthenticateId']
				}
				if((this.menuData['sku'] && this.menuData['sku'].length > 1) || this.goodsAttribute.length > 0) {
					if(this.count > 1) {
						this.$toast('多规格商品只能在购物车删除');
					} else {
						delData['goodsId'] = this.menuData['goodsId'];
						delData['isFirst'] = 1;
						this.$store.commit('delShopCart', delData);
					}
				} else {
					this.$store.commit('delShopCart', delData);
				}
			},
			//点击添加按钮
			addMenu() {

				if((this.menuData['sku'] && this.menuData['sku'].length > 1) || this.goodsAttribute.length > 0) {
					// this.popupVisible = true;
					this.$store.commit('itemMenuDetail', this.menuData)
					this.$emit('send-item');
					
				} else {
					this.addCart(this.menuData, this.skuDetail, '');
				}
				
			},
			//选择属性
			// choseAttributeINndex(parentIndex, subIndex) {
			// 	this.attributeIndexList[parentIndex] = subIndex;
			// },
			//点击选好了
			// confirm() {
			// 	let attributeStr = [],
			// 	spec = '';
			// 	this.skuDetail = this.menuData['sku'][this.specificationIndex];	
			// 	if(this.skuDetail['spec'] != null) {
			// 		spec = this.skuDetail['spec'];
			// 	}
			// 	for(let i in this.attributeIndexList) {
			// 		attributeStr.push(this.goodsAttribute[i]['value'][this.attributeIndexList[i]]);
			// 	}
			// 	this.goodsTaste = `${spec},${attributeStr.join(',')}`
			// 	this.addCart(this.skuDetail, this.goodsTaste);
			// 	this.popupVisible = false;
			// 	// this.$emit('chose-specification-attribute', 'scroll');
			// },
			//添加购物车
			addCart(menuData, skuDetail, goodsTaste) {
				let params = {
					shopAuthenticateId: menuData['shopAuthenticateId'],
					goodsCategoryId: menuData['goodsCategoryId'],
					goodsId: menuData['goodsId'],
					goodsPic: menuData['goodsPic'],
					goodsName: menuData['goodsName'],
					skuId: skuDetail['skuId'],
					goodsNum: 1,
					originalPrice: skuDetail['price'],
					discountPrice: skuDetail['discountPrice'],
					boxNum: skuDetail['boxNum'],
					boxPrice: skuDetail['boxPrice'],
					goodsTaste: goodsTaste,
				}
				// console.log(params);
				this.$store.commit('addShopCart', params);
			}
		}
	}
</script>