<template>
    <div class="box">
        <!-- <div class="pingtuan">
            <div class="userBox">
                <div>
                    <img />
                </div>
                <div>
                    <img />
                </div>
            </div>
            <div class="count">
                拼团倒计时:
                <div class="countDown">
                    <van-count-down use-slot :time="item2.secskill.skill_end * 1000" @change="onChange5" v-if="item2.secskill.skill_end > 0">
                        <text class="item">{{timeData.days}}</text>
                        <text class="item">{{timeData.hours}}</text>
                        <text class="item">{{timeData.minutes}}</text>
                        <text class="item">{{timeData.seconds}}</text>
                    </van-count-down>
                    <van-count-down use-slot :time="0" @change="onChange5" v-else>
                        <text class="item">0</text>
                        <text class="item">0</text>
                        <text class="item">0</text>
                        <text class="item">0</text>
                    </van-count-down>
                </div>
            </div>
            <button class="goinvi">
                去邀请
            </button>
        </div> -->
        <div class="ordertitle">
            <h1>小香铺椒麻鸡</h1>
            <a class="addres">
                收货地址：<div class="addresDetail">
                    <p>&nbsp;{{cartContact_name}} {{cartContact_phone}}</p>
                    <p>&nbsp;{{cartDisarea}}{{cartAddress}}</p>
                </div>
                <!-- <div class="addresRight">></div> -->
            </a>
            <div class="orderuser">
                <div class="orderuserleft">用餐方式：</div>
                <div class="taborder">
                    <van-tabs active="b">
                        <van-tab title="外卖" name="b">
                            <div class="waimai">
                                <h1>商品明细：</h1>
                                <div>
                                    <div class="orderShop" v-for="(item2, index2) in listorder.orderlist" :key="key2">
                                        <div class="cartShops">{{item2.name}}
                                            <span>({{listorder.shoptitle}})</span>
                                            <p>{{item2.specvalue}} {{item2.skutitle}}</p>
                                        </div>
                                        <div class="orderNumber">×{{item2.number}}</div>
                                        <div class="orderPrice">￥{{item2.price}}</div>
                                    </div>
									<div class="waimaiInput">
                                        <input placeholder="备注：" v-model="remarks"/>
									</div>
                                    <div class="youhuiquan">
                                        <div class="youhuiTitle">
                                            实付金额：<span>￥{{listorder.payment_price}}</span>
                                        </div>
                                        <div class="youhuiTitle">
                                            订单号：<div>{{listorder.order_sn}}</div>
                                        </div>
                                        <div class="total">
                                            运单号：<div>54812582646525626</div><span @click="onCopy">复制</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="orderfooter" v-if="active == 1">
                    <div class="orderTotal">
                        合计：<span>￥{{listorder.payment_price}}</span>
                    </div>
                    <button class="btn" @click="payment">支付</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            time: 30 * 60 * 60 * 1000,
            timeData: {},
            orderid: [],
            cartDisarea: '',
            cartAddress: '',
            cartContact_name:'',
            cartContact_phone: '',
            addressinfo: [],
            listorder: [],
            copyorder: '1234556',
            cartAddressid: '',
            active: '',
        }
    },
    onLoad(e) {
        console.log(e)
        this.orderid = e.id
        this.active = e.active
    },
    onShow() {
        this.orderDetail(this.orderid)
    },
    // 分享
    onShareAppMessage: function (res) {
       this.$wxhttp.beat(res)
    },
    methods:{
        orderDetail:function(id){
            this.$wxhttp.post({
                'url': '/order/orderdetail',
                'data': {
                    orderid: id
                }
            }).then((e) => {
                console.log(e)
                this.addressinfo = e.data.addresinfo
                this.cartAddressid = e.data.addresinfo.areaid
                this.cartContact_phone = e.data.addresinfo.contact_phone
                this.cartContact_name = e.data.addresinfo.contact_name
                this.cartAddress = e.data.addresinfo.address
                this.cartDisarea = e.data.addresinfo.disarea
                this.listorder = e.data.orderinfo
            })
        },
        onCopy:function() {
            wx.setClipboardData({
                data: this.copyorder,
                success (res) {
                    wx.showToast({
                        title: '复制成功'
                    })
                }
            })
        },
        payment:function() {
            this.$wxhttp.post({
                'url': '/cartitem/orderpay',
                'data': {
                    total_price: this.listorder.payment_price,
                    order_no: this.listorder.order_sn
                }
            }).then((res) => {
                wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    success (res) {
                        if(res.errMsg == 'requestPayment:ok'){
                            wx.reLaunch({
                                url: '/pages/index/main'
                            })
                        }
                    },
                    fail (res) {
                        console.log(res)
                    }
                })
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
    .userBox {
        text-align: center;
        margin-top: 30rpx;
    }
    .userBox div {
        width: 94rpx;
        height: 94rpx;
        border-radius: 50%;
        overflow: hidden;
        background-color: #0000FF;
        display: inline-block;
        margin-left: 20rpx;
    }
    .userBox div img {
        width: 100%;
        height: 100%;
    }
    .count {
        text-align: center;
        font-size: 18rpx;
        color: #666666;
    }
    .countDown {
        display: inline-block;
        margin-left: 20rpx;
    }
    .item {
        display: inline-block;
        width: 32rpx;
        height: 30rpx;
        line-height: 30rpx;
        margin-right: 5rpx;
        color: #fff;
        font-size: 16rpx;
        text-align: center;
        background-color: #f00;
        border-radius: 2rpx;
    }
    .goinvi {
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        width: 300rpx;
        height: 57rpx;
        margin: 20rpx auto;
        line-height: 57rpx;
        text-align: center;
        color: #fff;
        font-size: 28rpx;
        border-radius: 30rpx;
        padding: 0;
    }
    .ordertitle {
        width: 690rpx;
        height: 285rpx;
        background: #FFFFFF;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx auto;
    }
    .ordertitle h1 {
        padding: 20rpx 0;
        margin: 0 20rpx;
        border-bottom: 1px solid #eee;
        font-size: 30rpx;
        font-weight: bold;
        color: #1F1812;
    }
    .cartShops span {
        font-size: 23rpx;
        font-weight: 400;
        color: rgba(0,0,0,.5);
    }
    .addres {
        font-size: 26rpx;
        font-weight: bold;
        color: #505050;
        display: flex;
        margin: 20rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #eee;
    }
    .addresDetail {
        flex: 7;
        font-weight: 400;
        color: #6C6C6C;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .pleadd {
        color: #A9A9A9;
        text-align: center;
        width: 66%;
        margin-top: 7rpx;
    }
    .addresRight {
        flex: 1;
        font-size: 36rpx;
        /* line-height: 3; */
        text-align: right;
    }
    /* 选项卡 */
    .orderuserleft {
        float: left;
        font-size: 26rpx;
        font-weight: bold;
        color: #505050;
        margin: 10rpx 0 0 20rpx;
    }
    .taborder {
        font-size: 20rpx;
        color: #6C6C6C;
    }
    .taborder >>> .van-tabs__line {
        background-color: unset;
    }
    .taborder >>> .van-tab--active {
        background: linear-gradient(0deg, #FC661D 0%, #EA1010 100%);
        border-radius: 17rpx;
        color: #fff;
    }
    .taborder >>> .van-tab {
        line-height: 35rpx;
        padding: 0;
    }
    .taborder >>> .van-tabs__nav {
        border: 1px solid #ff682c;
        border-radius: 20rpx;
        width: 180rpx;
        margin: 0 auto;
        float: right;
        margin: 10rpx 20rpx 0 0rpx;
    }
    .taborder >>> .van-tabs__scroll {
        background-color: unset;
    }
    /* 外卖 */
    .waimai {
        width: 690rpx;
        height: auto;
        background: #fff;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx auto;
    }
    .waimai h1 {
        font-size: 26rpx;
        font-weight: bold;
        color: #505050;
        border-bottom: 1rpx solid #eee;

    }
    /* 商品明细 */
    .orderShop {
        margin: 20rpx;
        display: flex;
    }
    .cartShops {
        flex: 5;
        font-size: 26rpx;
        color: #6C6C6C;
    }
    .cartShops p, .orderNumber {
        font-size: 18rpx;
        color: #A9A9A9;
    }
    .orderNumber {
        flex: 2;
        line-height: 55rpx;
        text-align: center;
    }
    .orderPrice {
        flex: 2;
        font-size: 24rpx;
        color: #6C6C6C;
        text-align: right;
        line-height: 55rpx;
    }
    /* 备注 */
    .waimaiInput {
        margin: 20rpx;
        padding-bottom: 20rpx;
    }
    .waimaiInput input {
        width: 630rpx;
        height: 20rpx;
        border: 1rpx solid #E5E5E5;
        border-radius: 5rpx;
        padding: 3rpx 10rpx;
    }
    /* 优惠券 */
    .youhuiquan {
        width: 690rpx;
        height: auto;
        background: #Fff;
        box-shadow: 10rpx 10rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 30rpx auto 120rpx;
    }
    .youhuiTitle {
        padding: 20rpx 0;
        margin: 0 20rpx;
        font-size: 26rpx;
        color: #6C6C6C;
        border-bottom: 1rpx solid #eee;
    }
    .youhuiTitle div, .total div {
        display: inline-block;
    }
    .youhuiTitle span {
        font-size: 24rpx;
        color: #A9A9A9;
        float: right;
    }
    .total {
        margin: 20rpx;
        font-size: 26rpx;
        color: #6C6C6C;
        padding-bottom: 20rpx;
    }
    .total span {
        float: right;
        border: 1px solid #E5E5E5;
        border-radius: 2rpx;
        padding: 0rpx 10rpx;
        font-size: 26rpx;
        color: #6C6C6C;
    }
    /* 结算 */
    .orderfooter {
        margin: 20rpx 0;
        position: fixed;
        bottom: 0;
        width: 92%;
    }
    .orderTotal {
        font-size: 24rpx;
        color: rgba(0,0,0,.7);
        float: left;
    }
    .orderTotal span {
        font-size: 30rpx;
        font-weight: 500;
        color: #EE0B0B;
        line-height: 75rpx;
    }
    .btn {
        float: right;
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 40rpx;
        color: #fff;
    }
</style>
