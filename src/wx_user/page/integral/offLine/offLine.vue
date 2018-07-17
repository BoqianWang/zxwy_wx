<template>
	<div class="fixed bg-white">
		<div class="offLine-title">
			<div class="title-detail flex-box align-center text-center white-f">
				<div class="flex-1">
					<p class="font-30">
						3 <span class="font-12">个</span>
					</p>
					<p class="font-12">累计红宝</p>
				</div>
				<div class="flex-1">
					<p class="font-30">566</p>
					<p class="font-12">消费积分</p>
				</div>
				<div class="flex-1">
					<p class="font-30">6660</p>
					<p class="font-12">现金积分</p>
				</div>
				<div class="flex-1">
					<p class="font-30">
					  6 <span class="font-12">个</span>
					</p>
					<p class="font-12">邀请人数</p>
				</div>
			</div>
			<div class="title-img">
				<img src="../../../images/integral/offLine-img.png">
			</div>
		</div>
		<div class="offLine-content">
			<mt-cell
			  title="一级下线"
			  to="//github.com"
			  is-link
			  value="30人">
			</mt-cell>
			<mt-cell
			  title="二级下线"
			  to="//github.com"
			  is-link
			  value="50人">
			</mt-cell>
			<mt-cell
			  title="三级下线"
			  to="//github.com"
			  is-link
			  value="60人">
			</mt-cell>
		</div>
	</div>
</template>
<style scoped>
	.fixed {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	.font-30 {
		font-size: .3rem;
	}
	.offLine-title {
		height: 1.6rem;
		background: #FFA715;
	}
	.title-detail {
		height: 1rem;
	}
	.title-img {
		height: .6rem;
	}
	.title-img img {
		height: 100%;
		width: 100%;
	}
</style>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>