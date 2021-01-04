<template>
    <div class="box">
        <div class="boxtop">
            <div class="userbox">
                <div class="userimg">
                    <img  :src="avatar"/>
                </div>
                <h2>{{nickname}}</h2>
            </div>
            <div class="modular">
                <van-row>
                    <van-col span="8" class="balance">
                        <navigator :url="'/pages/balance/main?id=' + convertValue + '&money=' + money + '&score=' + score">
                            <div>￥{{money}}</div>
                            <p>余额</p>
                        </navigator>
                    </van-col>
                    <van-col span="8" class="coupon">
                        <div>0</div>
                        <p>优惠券</p>
                    </van-col>
                    <van-col span="8" class="integral">
                        <navigator :url="'/pages/balance/main?id='  + convertValue + '&money=' + money + '&score=' + score">
                            <div>{{score}}</div>
                            <p>积分</p>
                        </navigator>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="order">
            <div class="shopAdmintitle">
                <navigator url="/pages/orderAll/main">
                    <h1>全部订单</h1>
                    <span>></span>
                </navigator>
            </div>
            <div class="myorder">
                <van-row>
                    <van-col span="6">
                        <navigator url="/pages/orderAll/main?id=b">
                            <img mode="widthFix" src="../../../static/tabs/shouye/daifukuan.png"/>
                        </navigator>
                    </van-col>
                    <van-col span="6">
                        <navigator url="/pages/orderAll/main?id=c">
                            <img mode="widthFix" src="../../../static/tabs/shouye/daifahuo.png"/>
                        </navigator>
                    </van-col>
                    <van-col span="6">
                        <navigator url="/pages/orderAll/main?id=d">
                            <img mode="widthFix" src="../../../static/tabs/shouye/daishouhuo.png"/>
                        </navigator>
                    </van-col>
                    <van-col span="6">
                        <navigator url="/pages/orderAll/main?id=e">
                            <img mode="widthFix" src="../../../static/tabs/shouye/yiwancheng.png"/>
                        </navigator>
                    </van-col>
                </van-row>
            </div>
        </div>

        <div class="myindex">
            <div>
                <van-cell title="地址管理" is-link link-type="navigateTo" url="/pages/addres/main"/>
            </div>
            <div>
                <van-cell title="提货码" is-link @click="cell"/>
            </div>
            <div>
                <van-cell title="我的战绩" is-link link-type="navigateTo" url="/pages/myRecord/main"/>
            </div>
            <div>
                <van-cell title="邀请好友" is-link link-type="navigateTo" url="/pages/invite/main"/>
            </div>
        </div>
        <!-- 遮罩层 -->
        <div class="zz">
            <van-popup :show="show">
                <div class="bgcbox" >
                    <h1>小香铺提货码</h1>
                    <div class="tihuoma">
                        <img src="../../../static/tabs/shouye/ewm.png" />
                    </div>
                </div>
                <div class="close" @click="close"></div>
            </van-popup>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show: false,
            nickname: '',
            avatar: '',
            score: 0,
            money: 0,
            convertValue: ''
        }
    },
    onShow () {
        if (!wx.getStorageSync('isMobile')) {
            wx.navigateTo({
                url: '/pages/login/main'
            })
        }
        this.exhibition()
    },
    methods: {
        cell:function(){
            this.show = true;
        },
        close:function() {
            this.show = false;
        },
        exhibition:function(){
            this.$wxhttp.post({
                'url': "/personal/index",
                'data': {}
            }).then((res) => {
                console.log(res)
                this.nickname = res.data.row.nickname
                this.avatar = res.data.row.avatar
                this.money = res.data.row.money
                this.score = res.data.row.score
                this.convertValue = res.data.convertValue
            })
        }
    }

}
</script>

<style scoped>
    /* 弹框 */
    .bgcbox {
        width: 565rpx;
        height: 621rpx;
        background: url("http://www.xianxiaoyemao.com/static/image/bgi.png")no-repeat;
        background-size: 100% 100%;
    }
    .zz >>> .van-popup {
        background-color: unset;
    }
    .bgcbox h1 {
        line-height: 135rpx;
        font-size: 30rpx;
        font-weight: 500;
        color: #1F1812;
        text-align: center;
    }
    .tihuoma {
        width: 372rpx;
        height: 368rpx;
        margin: 30rpx auto;
    }
    .tihuoma img {
        width: 100%;
        height: 100%;
    }
    .close {
        width: 42rpx;
        height: 42rpx;
        background: url("http://www.xianxiaoyemao.com/static/image/close.png")no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
    }
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    /* 头部 */
    .boxtop {
        width: 690rpx;
        height: 300rpx;
        background: linear-gradient(0deg, #FC661D 0%, #EA1010 100%);
        border-radius: 5rpx;
        margin: 0 auto;
    }
    .userbox {
        padding-top: 33rpx;
    }
    .userbox .userimg {
        width: 105rpx;
        height: 105rpx;
        overflow: hidden;
        border-radius: 50%;
        margin: 0rpx auto;
    }
    .userbox .userimg img {
        width: 100%;
        height: 100%;
    }
    .userbox h2 {
        text-align: center;
        height: 40rpx;
        line-height: 40rpx;
        font-size: 20rpx;
        color: #FFFFFF;
    }
    .modular {
        margin-top: 40rpx;
    }
    .balance div, .coupon div, .integral div {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 28rpx;
        color: rgba(255, 255, 255, .9);
        text-align: center;
    }
    .balance p, .coupon p, .integral p {
        height: 30rpx;
        line-height: 30rpx;
        font-size: 20rpx;
        font-weight: 300;
        color: rgba(255, 255, 255, .9);
        text-align: center;
    }
    /* 全部订单 */
    .order {
        width: 690rpx;
        height: 176rpx;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 24rpx auto;
    }
    .shopAdmintitle {
        padding: 20rpx;
    }
    .shopAdmintitle h1 {
        width: 200rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #000000;
        display: inline-block;
    }
    .shopAdmintitle span {
        font-size: 30rpx;
        color: #000000;
        float: right;
        display: inline-block;
    }
    .myorder .van-col navigator {
        width: 83rpx;
        height: 63rpx;
        margin: 10rpx auto;
    }
    .myorder .van-col navigator img {
        width: 100%;
    }
    /* 地址管理部分 */
    .myindex {
        width: 690rpx;
        height: 549rpx;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 0 auto;
    }
    .myindex >>> .van-cell {
        font-size: 30rpx!important;
        color: #000000;

    }
</style>
