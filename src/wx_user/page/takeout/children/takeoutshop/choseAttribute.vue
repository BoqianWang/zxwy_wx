<template>
	<div>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="size-wrap p-ten">
		  	<div class="flex-box p-b-ten">
		  		<div class="menu-img" :style="'background-image: url(' + menuData['goodsPic'] + ');'">
		  		</div>
		  		<div class="flex-1 p-l-ten flex-box menu-detail">
		  			<div class="color-3 width-100">
		  				<p>{{menuData['goodsName']}}</p>
			  			<!-- <span class="color-3 font-12">已选:
							小 / 微辣 / 不要葱花 / 等等等
			  			</span> -->
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
			  			<!-- <span>规格名称2</span> -->
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
		</mt-popup>
	</div>
</template>
<style scoped lang="scss">
	@import '../../../../style/mixin.scss';	
	.size-wrap {
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
	}
</style>
<script>
	export default {
		data() {
			return {
				popupVisible: false,
				specificationIndex: 0,
				attributeIndexList: {},
				goodsAttribute: [],
				goodsTaste: '',
				skuDetail: {}

			}
		},
		props: {
			// menuData: {
			// 	default: () => {
			// 		return {}
			// 	}
			// }
		},
		computed: {
			menuData() {
				let menuData = this.$store.state.itemMenuDate;
				this.getGoodsAttribute(menuData)
				return menuData;
			}
		},
		mounted() {

		},
		methods: {
			showHideChoseAttrbute() {
				this.popupVisible = !this.popupVisible;
				
			},
			initShopCart() {
				this.showHideChoseAttrbute();
			},
			getGoodsAttribute(menuData) {
				this.goodsAttribute = [];
				this.attributeIndexList = {};
				this.specificationIndex = 0;
				if(menuData['goodsAttribute'] && menuData['goodsAttribute'] != 'null') {
					let re = /[^,/，]+/g;
					this.goodsAttribute = JSON.parse(menuData['goodsAttribute']);
					for(let i in this.goodsAttribute) {
						this.goodsAttribute[i]['value'] = this.goodsAttribute[i]['value'].match(re);
						this.$set(this.attributeIndexList, i, 0);
					}
				}
			},
			choseAttributeINndex(parentIndex, subIndex) {
				this.attributeIndexList[parentIndex] = subIndex;
			},
			confirm() {
				let attributeStr = [],
					skuDetail = this.menuData['sku'][this.specificationIndex],
					spec = skuDetail['spec'] || '',
					goodsTaste = '';
				for(let i in this.attributeIndexList) {
					attributeStr.push(this.goodsAttribute[i]['value'][this.attributeIndexList[i]]);
				}
				if(spec) {
					goodsTaste = `${spec},${attributeStr.join(',')}`
				} else {
					goodsTaste = attributeStr.join(',');
				}
				this.addCart(this.menuData, skuDetail, goodsTaste);
				this.popupVisible = false;

			},
			//添加购物车
			addCart(menuData, skuDetail, goodsTaste) {
				let params = {
					shopAuthenticateId: menuData['shopAuthenticateId'],
					goodsCategoryId: menuData['goodsCategoryId'],
					goodsId: menuData['goodsId'],
					goodsPic: menuData['goodsPic'],
					skuId: skuDetail['skuId'],
					goodsName: menuData['goodsName'],
					goodsNum: 1,
					originalPrice: skuDetail['price'],
					discountPrice: skuDetail['discountPrice'],
					boxNum: skuDetail['boxNum'],
					boxPrice: skuDetail['boxPrice'],
					goodsTaste: goodsTaste,
				}
				this.$store.commit('addShopCart', params);
			}
		},	
	}
</script>