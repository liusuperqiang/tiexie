<template>
    <div class="box">
        <div class="balance">
            <span>￥{{money}}</span>
            <div>我的余额</div>
        </div>
        <van-toast id="van-toast"/>
        <div class="balanceimg" style="background: url(http://www.xianxiaoyemao.com/static/image/balance.png)no-repeat; background-size: 100% 100%;">
            <div>现有积分：<span>{{score}}</span></div>
            <button @click="convert">兑现金</button>
        </div>
        <div class="balance_footer">
            <p>注：积分可兑换为现金，{{value}}积分=1元</p>
            <span>现金可用于下单抵扣金额，每单可用用金额不定。</span>
        </div>
    </div>
</template>

<script>
import Toast from "../../../static/vant-weapp/dist/toast/toast";
export default {

    data () {
        return {
            value: '',
            money: '',
            score: ''
        }
    },
    onLoad(res) {
        console.log(res)
        this.value = res.id
        this.money = res.money
        this.score = res.score
    },
    methods: {
        convert:function(){
            this.$wxhttp.post({
                'url': "/personal/convert",
                'data': {}
            }).then((res) => {
                console.log(res)
                if (res.status == 'success') {
                    Toast({
                        type: 'success',
                        message: res.msg,
                        onClose: () => {
                            wx.navigateBack({
                                delta: 1
                            })
                        },
                    });
                } else {
                    Toast.fail(res.msg);
                }
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
    .balance span {
        font-size: 48rpx;
        font-weight: bold;
        color: #FF6B09;
        text-align: center;
        margin-top: 30rpx;
        display: block;
    }
    .balance div {
        font-size: 20rpx;
        color: #999999;
        text-align: center;
    }
    .balanceimg {
        height: 223rpx;
        width: 690rpx;
        margin: 0 auto;
    }
    .balanceimg div {
        font-size: 22rpx;
        color: #FFFFFF;
        padding-top: 22%;
        display: inline-block;
        margin-left: 30rpx;
    }
    .balanceimg div span {
        font-size: 28rpx;
    }
    .balanceimg button {
        display: inline-block;
        margin-left: 50%;
        width: 100rpx;
        height: 30rpx;
        line-height: 30rpx;
        text-align: center;
        background: #FFFFFF;
        border-radius: 15rpx;
        font-size: 24rpx;
        color: #FF791F;
        padding: 0;
    }
    .balance_footer {
        font-size: 20rpx;
        color: #F71313;
        margin-top: 40rpx;
    }
    .balance_footer p{
        margin-left: 20%;
    }
    .balance_footer span{
        margin-left: 25%;
    }
</style>
