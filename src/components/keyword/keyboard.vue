<style scoped lang="less">
	.keyboard {
		height: 240px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background: white;
		z-index: 999;
		.done {
			height: 60px;
			background: #f9f9f9;
			border: .5px solid #d6d6d6;
			border-right: none;
			border-left: none;
			padding-right: 10px;
			border-bottom: none;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.text {
				color: #007eff;
			}
		}
		.list {
			height: 240px;
			.key:active {
				background: #e2e2e2;
			}
			.key {
				height: 25%;
				width: 25%;
				float: left;
				border-right: 1px solid #d6d6d6;
				border-top: 1px solid #d6d6d6;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: .46rem;
			}
			.key:nth-child(4n) {
				border-right: none;
			}
		}
	}
	.del {
		font-size: 28px;
	}
	.animated {
		animation-duration: .2s;
		animation-fill-mode: both;
	}
	@keyframes slideInDown {
		from {
			transform: translate3d(0, 0, 0);
			visibility: visible;
		}
		to {
			transform: translate3d(0, 100%, 0);
			display: none;
		}
	}
	@keyframes slideInUp {
		from {
			transform: translate3d(0, 100%, 0);
			visibility: visible;
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}
	.slide-enter-active {
		animation-name: slideInUp;
	}
	.slide-leave-active {
		animation-name: slideInDown;
	}
	.key-confirm {
			position: absolute;
			text-align: center;
			height: 180px;
			width: 25%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			/*line-height: 178px;*/
			/*background: #fff;*/
			// z-index: 5;
			right: 0;
			bottom: 0px;
			background: linear-gradient(to bottom, #ff6e15 , rgba(255,185,17,1));
			/*background-color: #ff6e15;*/
			color: white;
			font-size: 18px;
	}
	.no-confirm{
		background: #ddd;
	}
</style>
<template>
	<transition name="slide">
		<div class="keyboard animated" v-show="show" @touchstart.stop.prevent="fn">
			<!-- 完成 按钮-->
			<!-- <div class="done">
				<p class="text" @touchstart="complete">完成</p>
			</div> -->
			<!-- 键盘区域 -->
			<div class="list">
				<div class="key" @touchstart="typing('1')">1</div>
				<div class="key" @touchstart="typing('2')">2</div>
				<div class="key" @touchstart="typing('3')">3</div>
				<!-- <div class="key"></div> -->
				<div class="key"
					@touchstart="typing('')"
					>
					<i class="iconfont icon-keyboard-delete del"></i>
				</div>
				<div class="key" @touchstart="typing('4')">4</div>
				<div class="key" @touchstart="typing('5')">5</div>
				<div class="key" @touchstart="typing('6')">6</div>
				<div class="key"></div>
				<div class="key" @touchstart="typing('7')">7</div>
				<div class="key" @touchstart="typing('8')">8</div>
				<div class="key" @touchstart="typing('9')">9</div>
				<div class="key"></div>
				<div class="key dot"
					@touchstart="typing('.')">
					<i class="iconfont icon-dot"></i>
				</div>
				<div class="key"
					@touchstart="typing('0')">0</div>
				<div class="key"></div>
			</div>


			<div class='key-confirm' @touchstart="complete"  v-show="isClick==true">
				<p>确认</p>
				<p>支付</p>
			</div>
			<div class='key-confirm no-confirm' v-show="isClick==false">
				<p>确认</p>
				<p>支付</p>
			</div>


		</div>
	</transition>
</template>
<script>
	export default {
		props:{
			show:{
					type : Boolean
			},
			isClick : {
					type : Boolean
			}
		},

		methods: {
			/*防止点击完成按钮左边的空白区域收起键盘*/
			fn () {},
			/*输入*/
			typing (val) {
				this.$emit('typing', val);
			},
			/*点击完成*/
			complete () {
				this.$emit('complete');
			}
		}
	}
</script>
