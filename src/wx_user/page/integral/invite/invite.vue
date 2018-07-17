<template>
	<div>
		<div class="invite-title" @click="toShare(shareguide)">
		</div>
		<div class="invite-detail bg-white flex-box text-center align-center justify-center">
			<div class="flex-1">
				<p class="color-main font-30">
					<span>3</span> 
					<span class="font-12">个</span>
				</p>
				<p class="font-12 color-6">累计红包</p>
			</div>
			<div class="flex-1">
				<p class="color-main font-30">566</p>
				<p class="font-12 color-6">消费积分</p>
			</div>
			<div class="flex-1">
				<p class="color-main font-30">6600</p>
				<p class="font-12 color-6">现金积分</p>
			</div>
			<div class="flex-1">
				<p class="color-main font-30">
				    <span>6</span> 
					<span class="font-12">人</span>
				</p>
				<p class="font-12 color-6">邀请人数</p>
			</div>
		</div>
		<div class="m-t-ten bg-white p-ten">
			<div class="rule-title font-18 text-center flex-box align-center justify-center">
			  <span class="line"></span>
			  <span class="bg-white p-l-ten p-r-ten">活动规则</span>
			  <span class="line"></span>
			</div>
			<div class="font-15 color-1 rule-detial">
				<p class="p-t-ten">
					1、活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击
				</p>
				<p class="p-t-ten">
					2、活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好
				</p>
				<p class="p-t-ten">
					3、活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请
				</p>
				<p class="p-t-ten">
					4、活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则邀请好友点击活动规则
				</p>
			</div>
		</div>
		<div class="to-share" v-show="shareguide">
			<div class="share-img abs">
			</div>
			<div class="share-desc abs white-f text-center">
				<p style="font-size: .24rem;">邀请好友</p>
				<p class="font-15">点击右上角分享给好友, 即可赢取红包, 积分大礼</p>
				<p class="p-t-ten m-t-ten">
					<span class="understand font-18" @click="toShare(shareguide)">知道了</span>
				</p>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.to-share {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
		overflow: hidden;
	}
	.to-share .share-img {
		width: .3rem;
		height: .6rem;
		background-image: url(../../../images/integral/inviteShare.png);
		background-size: cover;
		right: .3rem;
		top: .15rem;
	}
	.to-share .share-desc {
		width: 90%;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
	.to-share .share-desc .understand {
		display: inline-block;
		width: 1.6rem;
		height: .4rem;
		line-height: .4rem;
		border: 1px dashed #fff;
		border-radius: .2rem;
	}
	.invite-title {
		background-image: url(../../../images/integral/invite.png);
		height: 1.5rem;
		background-size: cover;
	}
	.font-30 {
		font-size: .3rem;
	}
	.invite-detail {
		height: .8rem;
	}
	.rule-title .line {
	     display: inline-block;
	     width: .3rem;
	     height: 1px;
	     background: -webkit-linear-gradient(left, #fff, #ccc);
	}
	.rule-title .line:last-child {
		background: -webkit-linear-gradient(left, #ccc, #fff);
	}
	.rule-detial {
		line-height: .24rem;
		padding-bottom: .4rem;
	}
</style>
<script>
	export default {
		data() {
			return {
				shareguide: false
			}
		},
		methods: {
			toShare(shareStatus) {
				this.shareguide = !shareStatus;
			}
		}
	}
</script>