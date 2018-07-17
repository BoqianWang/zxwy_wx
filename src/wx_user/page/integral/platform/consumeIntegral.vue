<template>
	<div>
		<div class="consume-list bg-white">
			<ul>
				<li class="flex-box">
					<img src="../../../images/integral/consume.png" alt="">
					<div class="list-block flex-box flex-1 justify-s-b">
						<div class="p-l-ten flex-box list-detail">
							<p class="font-15 color-3 width-100">消费获得</p>
							<p class="font-12 color-9">09-26 08:30</p>
						</div>
						<div class="font-15 integral-add">
							<span>+30</span>
						</div>
					</div>
				</li>
				<li class="flex-box">
					<img src="../../../images/integral/share.png" alt="">
					<div class="list-block flex-box flex-1 justify-s-b">
						<div class="p-l-ten flex-box list-detail">
							<p class="font-15 color-3 width-100">分享获得</p>
							<p class="font-12 color-9">09-26 08:30</p>
						</div>
						<div class="font-15 integral-add">
							<span>+30</span>
						</div>
					</div>
				</li>
				<li class="flex-box">
					<img src="../../../images/integral/subordinate.png" alt="">
					<div class="list-block flex-box flex-1 justify-s-b">
						<div class="p-l-ten flex-box list-detail">
							<p class="font-15 color-3 width-100">下线返利</p>
							<p class="font-12 color-9">09-26 08:30</p>
						</div>
						<div class="font-15 integral-add">
							<span>+30</span>
						</div>
					</div>
				</li>
				<li class="flex-box">
					<img src="../../../images/integral/register.png" alt="">
					<div class="list-block flex-box flex-1 justify-s-b">
						<div class="p-l-ten flex-box list-detail">
							<p class="font-15 color-3 width-100">注册获得</p>
							<p class="font-12 color-9">09-26 08:30</p>
						</div>
						<div class="font-15 integral-add">
							<span>+30</span>
						</div>
					</div>
				</li>
				<li class="flex-box">
					<img src="../../../images/integral/active.png" alt="">
					<div class="list-block flex-box flex-1 justify-s-b">
						<div class="p-l-ten flex-box list-detail">
							<p class="font-15 color-3 width-100">营销获得扣去</p>
							<p class="font-12 color-9">09-26 08:30</p>
						</div>
						<div class="font-15 color-3">
							<span>-30</span>
						</div>
					</div>
				</li>
			</ul>	
		</div>
	</div>
</template>
<style>
	.consume-list > ul > li { 
		padding: .2rem .1rem 0;

	}
	.consume-list img {
		width: .3rem;
		height: .3rem;
	}
	.consume-list .list-block {
		border-bottom: 1px solid #eee;
		padding-bottom: .2rem;
	}
	.consume-list .list-block .list-detail {
		align-content: space-between;
		flex-flow: row wrap;

	}
	.integral-add {
		color: #FF2618;
	}
</style>
<script>
	export default {

	}
</script>