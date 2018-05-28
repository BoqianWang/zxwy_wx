<template>
	<div>
		<mt-popup class="popup" v-model="popupVisible" position="right" :modal="false">
			<mt-header fixed title="添加备注" style="height: 44px;">
	          <div slot='left' @click="showHidePopup(popupVisible)">
	          	<mt-button icon="back"></mt-button>
	          </div>
	          <!-- <div slot='right' @click="choseVocherEevnt(1)">暂不使用</div> -->
	        </mt-header>
	        <div class="popup-container p-ten">
		        <textarea class="remark-text width-100 p-ten font-15" v-model='text'></textarea>
		        <mt-button class="width-100 bg-white color-main popup-btn" type="default" @click="finishRemark">完成</mt-button>
	        </div>
		</mt-popup>
	</div>
</template>
<style scoped>
	.popup {
		width: 100%;
		height: 100%;
		background: #fff;
		/*overflow: auto;*/
	}
	.popup .mint-header {
		background: #ff6e15;
	}
	.popup .popup-container {
		margin-top: 40px;
		height: 100%;
		overflow: auto;
	}
	.remark-text {
		background: #EEE;
		height: 1.2rem;
	}
	.popup-btn {
		margin-top: .4rem;
	}
</style>
<script>
	/**
	 * 备注组件

	 */
	export default {
		data() {
			return {
				popupVisible: false,
				text: ''
			}
		},
		mounted() {

		},
		methods: {
			showHidePopup() {
				this.popupVisible = !this.popupVisible;
			},
			//完成备注
			finishRemark() {
				this.$emit('remarkHandle', this.text);
				this.showHidePopup();
			}
		}

	}
</script>