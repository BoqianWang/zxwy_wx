<template>
	<div class="p-t-ten add-address-wrap">
		<div class="font-15">
			<div class="color-7 p-ten">联系人</div>
			<div>
				<mt-field label="姓名: " placeholder="请输入收货人姓名"></mt-field>
				<mt-field label="手机: " placeholder="请填写你的收货号码"></mt-field>
			</div>

			<div class="color-7 p-ten">收货地址</div>
			<div>
				<mt-cell title="小区/大夏/学校:" is-link>
				  <div style="width: 2rem" class="address-detail">
				  	  点击选择胜多负少撒旦法胜多负少的时代防守
				  </div>
				</mt-cell>
				<mt-field label="楼号-门牌号: " placeholder="例: 4号楼666寝室"></mt-field>
			</div>
			<div class="footer text-center p-l-ten p-r-ten">
				<div class="finish bg-white m-b-ten color-main">完成</div>
				<div class="del-address bg-white">删除收货地址</div>
			</div>
		</div>
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
		padding: .05rem 0;
		width: 2rem;
		line-height: .22rem;
	}
</style>
<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			
		}
	}
</script>