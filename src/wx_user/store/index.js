import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		addressInfo: '',
		editAddressInfo: null
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
		}
	}
})
export default store;