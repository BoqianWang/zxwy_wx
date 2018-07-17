<template>
	<div class="p-ten">
		<div class="integral-wrap consume-integral rel overflew">
			<router-link to="/platformIntegral/consumeIntegral">
				<div class="white-f text-center">
					<p class="integral-count font-b">666</p>
					<p>
						<span>平台消费积分</span>
						<span class="iconfont icon-more"></span>
					</p>
					<div class="img-wrap abs width-100">
						<img src="../../../images/integral/consumeIntegral.jpg">
					</div>
				</div>
			</router-link>
		</div>

		<div class="integral-wrap cash-integral rel m-t-ten overflew">
			<router-link to="/platformIntegral/consumeIntegral">
				<div class="white-f text-center">
					<p class="integral-count font-b">666</p>
					<p>
						<span>平台现金积分</span>
						<span class="iconfont icon-more"></span>
					</p>
					<div class="img-wrap abs width-100">
						<img src="../../../images/integral/cashIntegral.jpg">
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>
<style scoped>
 	.integral-wrap .img-wrap {
		left: 0;
		bottom: 0;
		height: .4rem;
 	}
 	.integral-wrap .img-wrap > img {
 		width: 100%;
 		height: 100%;
 	}
 	.integral-wrap {
 		background: #FFC962;
		height: 1.4rem;
		border-radius: 5px;
		padding-top: .25rem;
		/*box-shadow: 9rem 5rem 24rem rgba(233,91,5,0.22);*/
 	}
	.integral-wrap .integral-count {
		font-size: .4rem;
	}
	.cash-integral {
		background: #59B9F1;
	}
</style>
<script>
	export default {

	}
</script>