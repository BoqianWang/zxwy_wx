import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		addressInfo: '',
		editAddressInfo: null,
		cartList: [],
		itemMenuDate: {},
		remark: ''
	},
	getters: {
		/**
		 * 计算购物车金额
		 * @param  {[type]} state [description]
		 * @return {[type]}       [description]
		 */
		shopCartDetail(state) {
			let detail = {},
				cartList = state.cartList;
			detail['list'] = cartList;
			detail['count'] = 0;
			detail['money'] = 0;
			detail['boxPrice'] = 0;
			detail['goodsCategoryId'] = {};
			for(let item of cartList) {
				let id = item['goodsCategoryId'];
				if(detail['goodsCategoryId'][id]) {
					detail['goodsCategoryId'][id] += item['goodsNum'];
				} else {
					detail['goodsCategoryId'][id] = item['goodsNum'];
				}
				detail['count'] += item['goodsNum'];
				detail['money'] += item['goodsNum'] * item['discountPrice'];
				detail['boxPrice'] += item['goodsNum'] * item['boxNum'] * item['boxPrice'];
			}
			detail['money'] = Tools.ToCurrency(detail['money'] + detail['boxPrice']);
			return detail;
		}
	},
	mutations: {
		/**
		 * 保存当前备注
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		sendRemark(state, info) {
			state.remark = info;
		},
		/**
		 * 当前选择的地址
		 * @param  {[type]} state [description]
		 * @param  {[type]} flag  [description]
		 * @return {[type]}       [description]
		 */
		recordAddress(state, info) {
			state.addressInfo = info;
		},
		/**
		 * 编辑收货地址
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		editAddress(state, info) {
			state.editAddressInfo = info;
		},
		/**
		 * 多规格商品
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		itemMenuDetail(state, info) {
			state.itemMenuDate = info;
		},
		/**
		 * 添加购物车
		 * @param {[type]} state [description]
		 * @param {[type]} info  [description]
		 */
		addShopCart(state, info) { 
			let arrList = state.cartList,
				shopCart = {};
			if(arrList.length > 0) {
				for(let item of arrList) {
					if(item['skuId'] == info['skuId'] && item['goodsTaste'] == info['goodsTaste']) {
						item['goodsNum']++;
						shopCart[info['shopAuthenticateId']] = arrList;
						Tools.setLocalStorage('shopCart', shopCart);
						return;
					}
				}
			}
			arrList.push(info);
			shopCart[info['shopAuthenticateId']] = arrList;
			Tools.setLocalStorage('shopCart', shopCart);

		},
		/**
		 * 删除购物车
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		delShopCart(state, info) {
			let arrList = state.cartList,
				shopCart = {};
			console.log(arrList)
			for(let i = arrList.length - 1; i >= 0; i--) {
				let item = arrList[i]
				if(item['skuId'] == info['skuId'] && item['goodsTaste'] == info['goodsTaste']) {
					if(item['goodsNum'] > 1) {
						item['goodsNum']--;
					} else {
						arrList.splice(i, 1);
					}
					break;
				} else if(item['goodsId'] == info['goodsId'] && info['isFirst'] == 1) {
					arrList.splice(i, 1);
					break;
				}
			}
			shopCart[info['shopAuthenticateId']] = arrList;
			Tools.setLocalStorage('shopCart', shopCart);
			// console.log(arrList, goodsId)
		},
		/**
		 * 清空购物车
		 * @param  {[type]} state [description]
		 * @return {[type]}       [description]
		 */
		clearShopCart(state) {
			state.cartList = [];
			Tools.clearLocalStorage('shopCart');
		},
		/**
		 * 初始化购物车
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		initShopCart(state, id) {
			if(Tools.getLocalStorage('shopCart')) {
				state.cartList = Tools.getLocalStorage('shopCart')[id] || [];
			} else {
				state.cartList = []
			}
		},

	}
})
export default store;