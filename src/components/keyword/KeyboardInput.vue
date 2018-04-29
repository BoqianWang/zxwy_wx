<style scoped lang="less">
	.keyboard {
		font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
		user-select: none;
		font-size: .3rem;
		width: 100%;
	}
	.input-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.label {
			/*font-size: .2rem;*/
			color: #333;
		}
		.content {
			display: flex;
			/*min-width: 220px;*/
			flex: 1;
			justify-content: flex-end;
			text-align: right;
			.input {
				font-size: .44rem;
				color: #313131;
				font-weight: bold;
			}
			.cursor {
				background-color: #4788c5;
				width: 4px;
				margin-left: 2px;
			}
			.placeholder {
				color: #ccc;
			}
			.input-money,.currency {
				font-size: 18px;
				line-height: .52rem;
			}
			.currency {
				color: #c1c1c1;
			}
		}
	}
</style>
<template>
	<div class="keyboard">
		<!-- 自定义输入框 -->
		<div class="input-box" @touchstart.stop="focus">
			<!-- 左侧标签 -->
			<p class="label">{{label}} : </p>
			<!-- 右侧内容 -->
			<div class="content">
				<p class="input">
					<span class="currency" v-show="val">¥</span>
					{{val}}
				</p>
				<p class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
				<p class="placeholder input-money" v-show="val.length === 0">
					{{placeholder}}
				</p>
				<!-- 光标 -->
			</div>
		</div>
		<!-- 自定义键盘 -->
		<keyboard
			:show="keyboard"
			:isClick = "isClick"
			@typing="typing"
			@complete="wbq_blur"/>
	</div>

</template>
<script>
	import keyboard from './keyboard'
	export default {
		name: 'KeyboardInput',
		components: {
			keyboard
		},
		created () {
			document.addEventListener('touchstart', () => {
				this.blur();
			});
		},
		mounted(){
			this.focus();
		},
		props: {
			value: '',
			inter: {
				default: 5
			},
			decimal: {
				default: 2
			},
			label: {
				default: '消费金额'
			},
			placeholder: {
				default: '询问服务员后输入'
			},
			isClick : {
					type : Boolean
			}
		},
		data () {
			return {
				cursor: false,
				keyboard: false,
				/*value 在组件中的值*/
				val: '',
				aIllegal: ['00', '01' ,'02','03','04','05','06','07','08','09', '0..', '.'],
				cursorDuration: 600,
				bodyHeight: '',
				bodyOverflow: ''
			}
		},
		methods: {
			/*focus*/
			focus () {
				/*显示键盘*/
				this.showKeyboard();
				/*显示光标*/
				this.showCursor();
				/*闪烁光标*/
				this.blinkCursor();
			},
			blinkCursor () {
				clearInterval(this.intervalID);
				this.intervalID = setInterval(()=>{
					this.cursor = !this.cursor;
				}, this.cursorDuration);
			},
			unblinkCursor () {
				clearInterval(this.intervalID);
			},
			/*blur*/
			blur () {
				/*隐藏光标*/
				this.hideCursor();
				/*停止光标闪烁*/
				this.unblinkCursor();
				/*隐藏键盘*/
				this.hideKeyboard();
				/*
					附加 00, 如果用户输入了一个以 . 结尾的值就点完成了,
					那么这个时候就在后面加上00
				*/
				this.toCompletion();
				/*通知父组件, 老子值出来了*/
				/*
					校验用户输入的金额是不是为 0, 如果是的话, 直接重置
				*/
				this.checkValue();
				this.notify();

				// this.$emit('sure');
			},
			wbq_blur(){
				/*
					附加 00, 如果用户输入了一个以 . 结尾的值就点完成了,
					那么这个时候就在后面加上00
				*/
				this.toCompletion();
				/*通知父组件, 老子值出来了*/
				/*
					校验用户输入的金额是不是为 0, 如果是的话, 直接重置
				*/
				this.checkValue();
				this.notify();

				this.$emit('sure');
			},
			showKeyboard () {
				this.keyboard = true;
				this.$emit('show_keyboard',this.keyboard);
			},
			hideKeyboard () {
				this.keyboard = false;
				this.$emit('show_keyboard',this.keyboard);
			},
			showCursor () {
				this.cursor = true;
			},
			hideCursor () {
				this.cursor = false;
			},
			checkValue () {
				if (parseFloat(this.val) === 0) {
					this.val = '';
				}
			},
			/*判读是否需要加0*/
			toCompletion () {
				let list = this.value.split('.');
				if (typeof list[1] === 'undefined') {
					if (this.val !== '') {
						this.val = this.val + '.';
						this.completion(this.decimal);
					}
				} else {
					if (list[1].length < this.decimal) {
						this.completion(this.decimal - list[1].length);
					}
				}
			},
			completion (len) {
				let v = '';
				for(let i =0;i<len;i++){
					v = v + '0';
				}
				this.val = this.val + v;
			},
			notify () {
				this.$emit('input',this.val);
			},
			del () {
				/*删除值并不会触发值的校验, 所以需要手动再触发一次*/
				this.val = this.val.slice(0, -1);
				this.notify();
			},
			/*输入*/
			typing (value) {
				/*如果是点击删除*/
				if (value === '') {
					this.del();
				}
				/*保存旧的值*/
				let oldValue = this.val;
				/*获取新的值*/
				this.val = this.val + value;
				/*检验新值, 如果没有通过检测, 恢复值*/
				if (!this.passCheck(this.val)) {
					this.val = oldValue;
					return;
				}
				/*为了让外界同步输入, 需要发送事件*/
				this.notify();
			},
			passCheck (val) {
				/*验证规则*/
				let aRules = [
						this.illegalInput,
						this.illegalValue,
						this.accuracy
					]
				return aRules.every((item) => {
					return item(val);
				});
			},
			illegalInput (val) {
				if (this.aIllegal.indexOf(val) > -1) {
					return false;
				}
				return true;
			},
			/*非法值*/
			illegalValue (val) {
				if (parseFloat(val) != val) {
					return false;
				}
				return true;
			},
			/*验证精度*/
			accuracy (val) {
				let v = val.split('.')
				if (v[0].length > this.inter) {
					return false;
				}
				if (v[1] && (v[1].length) > this.decimal) {
					return false;
				}
				return true;
			}
		}
	}
</script>
