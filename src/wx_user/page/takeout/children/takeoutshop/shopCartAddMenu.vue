<template>
	<div style="display: inline-block;">
		<div class="flex-box add-menu text-center">
			<p class="subtract iconfont icon-subtract" @click="delMenu"></p>
			<p class="menu-num color-3">{{count}}</p>
			<p class="add iconfont icon-add white-f" @click="addMenu"></p>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.add-menu {
		align-items: center;
	}
	.add-menu .menu-num {
		padding: 0 .05rem;

	}
	.subtract {
		color: #FF6F15;
	}
	.add {
		background: #FF6F15;
	}
	.add-menu .subtract,.add-menu .add  {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border:1px solid #FF6F15;
		line-height: 20px;
	}
</style>
<script>
	export default {
		props: {
			menuDataDetail: {
				default: () => {
					return {};
				}
			}
		},
		data() {
			return {
			}
		},
		computed: {
			count() {
				return this.menuDataDetail['goodsNum'];
			}
		},
		methods: {
			delMenu() {
				this.$store.commit('delShopCart', this.menuDataDetail);
			},
			addMenu() {
				this.$store.commit('addShopCart', this.menuDataDetail);
			}
		}
	}
</script>