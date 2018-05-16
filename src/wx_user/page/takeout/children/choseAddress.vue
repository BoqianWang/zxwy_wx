<template>
	<div class="chose-address-wrap">
		<div class="chose-address p-t-ten">
			<ul>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<!-- <span class="circle m-r-ten"></span> -->
							<span class="circle m-r-ten iconfont icon-selected"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span @click="addAddress" class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
				<li class="p-l-ten p-r-ten bg-white address-list">
					<div class="p-t-ten p-b-ten flex-box align-center justify-s-b address-list-block">
						<div class="flex-box align-center">
							<span class="circle m-r-ten"></span>
							<div class="font-15 address-wrap">
								<p class="color-3 text_over">深圳市罗湖区中民时代广场B座2013楼胜多负少的</p>
								<p class="color-7">
									<span>小仙女</span> 
									<span>18923429855</span>
								</p>
							</div>
						</div>
						<span class="iconfont icon-edit p-r-ten color-9"></span>
					</div>
				</li>
			</ul>
		</div>
		<footer class="add-address bg-white text-center">
			<span class="iconfont icon-add"></span>
			<span class="color-3 font-15">新增收货地址</span>
		</footer>
	</div>
</template>
<style scoped lang="scss">
	@import '../../../style/mixin.scss';
	@import '../../../style/iconfont/iconfont.css';
	.add-address {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: .4rem;
		line-height: .4rem;
		.icon-add {
			padding: .02rem;
			border: 1px solid $mainColor;
			border-radius: 50%;
			color: $mainColor;
			font-size: .14rem;
		}
	}
	.address-list:last-child .address-list-block {
		border-color: transparent;
	}
	.address-list {
		.address-list-block {
			border-bottom: 1px solid #eee;
		}
		.address-list-block:last-child {
		}
		.icon-edit {
			font-size: .26rem;
			width: .5rem;
			text-align: right;
		}
		.address-wrap {
			width: 2.8rem;
			line-height: .28rem;
		}
		.icon-selected {
			background: $mainColor;
			font-size: .2rem;
			font-weight: bold;
		}
	}
	.circle {
		width: .2rem;
		height: .2rem;
		line-height: .18rem;
		text-align: center;
		border:1px solid $mainColor;
		border-radius: 50%;
		color: #fff;
	}
	.chose-address-wrap {
		padding-bottom: .6rem;
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
			addAddress() {
				this.$router.push({
					path: '/takeOut/addAddress'
				})
			}
		}
	}
</script>