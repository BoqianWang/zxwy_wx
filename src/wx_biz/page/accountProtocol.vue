<template>
	<div class="p-ten register-protocol">
		<h3 class="text-center">结算规则及结算说明</h3>
		
		<section class="p-t-ten">
			<p class="p-t-ten">
				<strong>平台结算条件：</strong>
			</p>
			<p class="p-t-ten paragraph">商家账户可提现余额大于商家活动账户支出应付；</p>
		</section>
		<section class="p-t-ten">
			<p><strong>1.平台服务费</strong></p>
			<div class="font-14">
				
				<p class="paragraph p-t-ten">结算规则：</p>
				<p class="paragraph">1.）单份单价10元以下，服务费0；</p>
				<p class="paragraph">2.）单份单价15元以下，服务费0.5元/份；</p>
				<p class="paragraph">3.）单份单价15元及以上，服务费1元/份；</p>
				<p class="paragraph p-t-ten">每单服务费=份数*单份服务费</p>

				<p class="paragraph p-t-ten">结算周期：</p>
				<p class="paragraph">根据订单时时结算，费用由商家代收，平台统一在商家活动账户中与商家结算；</p>
			</div>
		</section>
		<section class="p-t-ten">
			<p><strong>2.清分费</strong></p>
			<div class="font-14">
				<p class="paragraph p-t-ten">结算规则：</p>
				<p class="paragraph">1.）平台或第三方发起代金券活动，平台收取代金券部分10%清分费；</p>


				<p class="paragraph p-t-ten">结算周期：</p>
				<p class="paragraph">1.）根据订单时时结算，费用由商家代收，平台统一在商家活动账户中与商家结算</p>
			</div>
		</section>
	</div>
</template>
<style>
	.text-center {
		text-align: center;
	}
	.p-ten {
		padding: 10px;
	}
	.p-t-ten {
		padding-top: 10px;
	}
	.p-b-ten {
		padding-bottom: 10px;
	}
	.paragraph {
		text-indent: 20px;
	}
	.p-section {
		padding: 20px 0;
		font-size: 20px;
		font-weight: bold;
	}
	.font-14 {
		font-size: 14px;
	}
	.register-protocol {
		line-height: 25px;
	}
</style>
<script>
	export default {

	}
</script>