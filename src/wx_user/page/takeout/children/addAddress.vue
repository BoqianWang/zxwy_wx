<template>
	<div class="p-t-ten add-address-wrap">
		<div class="font-15">
			<div class="color-7 p-ten">联系人</div>
			<div>
				<mt-field label="姓名: " placeholder="请输入收货人姓名" v-model="formDate.recipientName"></mt-field>
				<mt-field label="手机: " placeholder="请填写你的收货号码" v-model="formDate.recipientPhone"></mt-field>
			</div>

			<div class="color-7 p-ten">收货地址</div>
			<div>
				<mt-cell title="小区/大夏/学校:" to="/takeout/addAddress/searchAddress" is-link>
					  <div style="width: 2rem" class="address-detail">
					  	  {{address}}
					  </div>
				</mt-cell>
				<mt-field label="楼号-门牌号: " placeholder="例: 4号楼666寝室" v-model="formDate.houseNumber"></mt-field>
			</div>
			<div class="footer text-center p-l-ten p-r-ten">
				<div class="finish bg-white m-b-ten color-main" @click="submitAddress">完成</div>
				<div class="del-address bg-white" @click="delAddress">删除收货地址</div>
			</div>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<style scoped>
	.add-address-wrap .mint-cell {
		background-image: linear-gradient(0deg,#d9d9d9,#d9d9d9 50%,transparent 0);
		background-size: 100% 1px;
		background-repeat: no-repeat;
   		background-position: bottom;
	}
	.add-address-wrap .mint-cell:last-child {
		background-image: none;
	}
	.footer {
		padding-top: .4rem;
		
	}
	.del-address {
		color: #FC1D1E;
	}
	.footer > div {
		height: .4rem;
		line-height: .4rem;
		border:1px solid #eee;
		border-radius: 4px;
	}
	.address-detail {
		/*text-align: right;*/
		padding: .05rem 0;
		width: 2rem;
		line-height: .22rem;
	}
</style>
<script>
	import fetch from '@/config/fetch.js';
	export default {
		data() {
			return {
				formDate: {},
			}
		},
		computed: {
			address() {
				let addressInfo = this.$store.state.addressInfo;
				console.log(this.$store.state.addressInfo)
				if(addressInfo) {
					this.formDate['recipientAddress'] = this.$store.state.addressInfo['recipientAddress'];
					this.formDate['recipientLon'] = this.$store.state.addressInfo['recipientLon'];
					this.formDate['recipientLat'] = this.$store.state.addressInfo['recipientLat'];
					return this.formDate['recipientAddress'];
				} else {
					return '';
				}
			}
		},
		mounted() {
			this.isEditAddress();
		},
		destroyed() {
			this.$store.commit('editAddress', null);
		},
		methods: {
			//判断是否是编辑收货地址操作
			isEditAddress() {
				let info = this.$store.state.editAddressInfo
				if(info != null) {
					this.formDate = info;
				}
			},
			// 提交加收货地址
			submitAddress() {
				let errorMsg = '';
				if(!this.formDate['recipientName']) {
					errorMsg = '请填写姓名';

				} else if(!this.phoneNumberFormat(this.formDate['recipientPhone'])) {
					errorMsg = '请输入正确手机号码';

				} else if(!this.formDate['recipientAddress']) {
					errorMsg = '请选择地址';
				}


				if(errorMsg) {
					this.$toast(errorMsg);
				} else {
					let url = '/address/add';
					if(this.formDate['recipientId']) {
						url = '/address/edit';
					}

					this.addressPost(url);
				}
			},
			//新增地址请求接口
			addressPost(url) {
				fetch.fetchPost(url, this.formDate).then(res => {
						window.history.back()
						// this.$router.push('')
						// this.$router.go(-1);
					}).catch(res => {

					})
			},
			delAddress() {
				let del = confirm('你确定要删除吗');
				if(del) {
					if(this.formDate['recipientId']) {
						fetch.fetchPost('/address/delete', {
							recipientId: this.formDate['recipientId']
						}).then(res => {
							this.$router.go(-1);
						}).catch(res => {

						})
					} else {
						this.$toast('当前状态为新增收货地址,不能删除!');
					}
				}
			},
			/**
			 * 手机号码验证
			 * @param  {[type]} phoneNumber 手机号码字符串   必填
			 * @return true | false             
			 */
			phoneNumberFormat(phoneNumber) {
				let re = /^1[34578][0-9]{9}$/;
				// var re = /^1(3|4|5|7|8)[0-9]{9}$/;
				return re.test(phoneNumber);
			},
		}
	}
</script>