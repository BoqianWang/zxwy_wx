import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		addressInfo: '',
		editAddressInfo: null,
		cartList: {}
	},
	mutations: {
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
		 * 添加购物车
		 * @param {[type]} state [description]
		 * @param {[type]} info  [description]
		 */
		addShopCart(state, info) {
			let cartList = state.cartList,
				shopAuthenticateId = info['shopAuthenticateId'];
			if(cartList[shopAuthenticateId]) {
				for(let item of cartList[shopAuthenticateId]['detailList']) {
					if(item['skuId'] == info['skuId'] && item['goodsTaste'] == info['goodsTaste']) {
						item['goodsNum']++;
						Tools.setLocalStorage('shopCart', cartList);
						return;
					}
				}
				cartList[shopAuthenticateId]['detailList'].push(info);
			} else {
			   cartList[shopAuthenticateId] = {
			   	   detailList: [
			   	   	 info
			   	   ]
			   }
			}
			state.cartList = cartList;
		    Tools.setLocalStorage('shopCart', cartList);

		},
		/**
		 * 删除购物车
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		delShopCart(state, info) {
			let cartList = state.cartList,
				shopAuthenticateId = info['shopAuthenticateId'];
			if(cartList[shopAuthenticateId]) {
				let arrList = cartList[shopAuthenticateId]['detailList'];
				for(let i = arrList.length; i < 0; i--) {
					if(item['goodsId'] == info['goodsId']) {
						item['goodsNum']--;
						if(item['goodsNum'] <= 0) {
							arrList.splice(i, 1);
						}
						break;
					}
				}
			}

			// state.cartList = cartList;
			console.log(arrList);
			// Tools.setLocalStorage('shopCart', cartList);
		},
		/**
		 * 初始化购物车
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		initShopCart(state) {
			if(Tools.getLocalStorage('shopCart')) {
				state.cartList = Tools.getLocalStorage('shopCart');
			}
			console.log(state.cartList);
		},

	}
})
export default store;