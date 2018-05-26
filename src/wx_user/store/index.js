import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		addressInfo: '',
		editAddressInfo: null,
		cartList: [],
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
			// let cartList = state.cartList,
			// 	shopAuthenticateId = info['shopAuthenticateId'];
			// if(cartList[shopAuthenticateId]) {
			// 	for(let item of cartList[shopAuthenticateId]['detailList']) {
			// 		if(item['skuId'] == info['skuId'] && item['goodsTaste'] == info['goodsTaste']) {
			// 			item['goodsNum']++;
			// 			Tools.setLocalStorage('shopCart', cartList);
			// 			return;
			// 		}
			// 	}
			// 	cartList[shopAuthenticateId]['detailList'].push(info);
			// } else {
			//    cartList[shopAuthenticateId] = {
			//    	   detailList: [
			//    	   	 info
			//    	   ]
			//    }
			// }
			// state.cartList = cartList;
		 //    Tools.setLocalStorage('shopCart', cartList);

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
			for(let i = arrList.length - 1; i >= 0; i--) {
				let item = arrList[i]
				if(item['goodsId'] == info['goodsId']) {
					if(item['goodsNum'] > 0) {
						item['goodsNum']--;
					} else {
						arrList.splice(i, 1);
					}
				}
			}
			shopCart[info['shopAuthenticateId']] = arrList;
			Tools.setLocalStorage('shopCart', shopCart);
			// console.log(arrList, goodsId)
		},
		/**
		 * 初始化购物车
		 * @param  {[type]} state [description]
		 * @param  {[type]} info  [description]
		 * @return {[type]}       [description]
		 */
		initShopCart(state, id) {
			if(Tools.getLocalStorage('shopCart')) {
				state.cartList = Tools.getLocalStorage('shopCart')[id];
			} else {
				state.cartList = []
			}
		},

	}
})
export default store;