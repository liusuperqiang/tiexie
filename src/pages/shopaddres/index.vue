<template>
    <div class="box">
        <div class="shopTop" style="background: url(../../../static/tabs/shouye/sanjiao.png)no-repeat;background-size: 100% 100%;">
            <p>欢迎来到小香铺社区购</p>
            <p>请选择您心仪的团长为您服务</p>
        </div>
        <div class="addtitle">
            <div>您当前的地址为：</div>
            <div>曲江区会展中心
                <p>修改</p>
            </div>
            <div>为您推荐周边优质团长</div>
        </div>
        <div class="addresshop">
            <div class="addbor">
                距您100m
            </div>
            <div class="user_info"></div>
            <h1>小香铺椒麻鸡</h1>
            <div class="mm">某某小区</div>
            <p>就是你喜欢的那家椒麻鸡，还能给你送到家...</p>
            <div class="go_index" @click="goIndex">进入团长首页</div>
        </div>

    </div>
</template>

<script>

export default {
    data () {
        return {

        }
    },
    methods: {
        goIndex:function() {
            wx.reLaunch({
                url: '/pages/index/main'
            })
        }
    }
}
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .shopTop {
        height: 176rpx;
        width: 100%;
        padding-top: 20rpx;
    }
    .shopTop p:first-child {
        font-size: 28rpx;
    }
    .shopTop p {
        text-align: center;
        font-size: 32rpx;
        color: #FFFFFF;
        margin-top: 10rpx;
    }
    .addtitle div {
        font-size: 30rpx;
        color: rgba(0,0,0,.8);
        text-align: center;
        margin-top: 30rpx;
    }
    .addtitle p {
        width: 140rpx;
        height: 50rpx;
        line-height: 50rpx;
        border: 2rpx solid #FF682C;
        opacity: 0.8;
        border-radius: 25rpx;
        display: inline-block;
        color: #FF682C;
    }
    .addresshop {
        width: 690rpx;
        height: 448rpx;
        background: #FFFFFF;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 30rpx auto;
        padding-top: 25rpx;
    }
    .addbor {
        width: 156rpx;
        height: 40rpx;
        line-height: 40rpx;
        background: rgba(255, 104, 44, .2);
        font-size: 24rpx;
        color: #FF682C;
        border-top-right-radius:10px;
        border-bottom-right-radius:10px;
        padding-left: 10rpx;
    }
    .user_info {
        width: 122rpx;
        height: 122rpx;
        background: linear-gradient(0deg, #398400 0%, #FFFFFF 100%);
        border-radius: 50%;
        margin: 10rpx auto;
    }
    .addresshop h1 {
        text-align: center;
        font-size: 32rpx;
        font-weight: 500;
        color: rgba(0, 0, 0, .8);
    }
    .mm {
        font-size: 24rpx;
        color: rgba(0, 0, 0, .6);
        text-align: center;
        margin: 10rpx 0;
    }
    .addresshop p {
        margin: 30rpx auto;
        width: 514rpx;
        font-size: 26rpx;
        color: rgba(0, 0, 0, .8);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .go_index {
        font-size: 36rpx;
        color: #FFFFFF;
        width: 428rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 30rpx;
        margin: 0rpx auto;
    }
</style>
