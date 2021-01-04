<template>
    <div class="box">
        <div class="Allorder">
            <van-tabs :active="active" @change="changeTab">
                <van-tab title="全部" name="a">
                    <div class="All_index" v-for="(item,index) in listorder" :key="index">
                        <div class="AllCode">
                            <div class="codeOrder">订单编号:{{item.order_sn}}</div>
                            <div class="paid paid2" v-if="item.status == 1">待付款</div>
                            <div class="paid" v-else-if="item.status == 2">待发货</div>
                            <div class="paid" v-else-if="item.status == 3">待收货</div>
                            <div class="paid" v-else-if="item.status == 4">已完成</div>
                        </div>
                        <div v-for="(item2,index2) in item.orderlist" :key="index2">
                            <navigator :url="'/pages/detail/main?id=' + item2.pid">
                                <div class="Allshop">
                                    <div class="shop_img">
                                        <img :src="url + item2.images" />
                                    </div>
                                    <div class="shop_price">
                                        <div class="titleTop">
                                            <h1>{{item2.name}}</h1>
                                            <div class="priceShop">￥{{item2.price}}</div>
                                        </div>
                                        <div class="titleBottom">
                                            <div class="shopNumber">{{item2.skutitle}}</div>
                                            <div class="shopNums">x{{item2.number}}</div>
                                        </div>
                                    </div>
                                </div>
                            </navigator>
                        </div>
                        <div class="priceNum">
                            共计{{item.total_number}}件商品 合计:<span>￥{{item.total_price}}</span> (含运费￥0.00）
                        </div>
                        <div>
                            <button class="paid_btn paid_detail" @click="payment(item.order_sn,item.total_price)">付款</button>
                            <navigator :url="'/pages/readDetail/main?id=' + item.orderid +'&active=' + item.status"><button class="paid_btn">查看详情</button></navigator>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待付款" name="b">
                    <div class="All_index" v-for="(item,index) in listorder" :key="index">
                        <div class="AllCode">
                            <div class="codeOrder">订单编号:{{item.order_sn}}</div>
                            <div class="paid paid2">待付款</div>
                        </div>
                        <div v-for="(item2,index2) in item.orderlist" :key="index2">
                            <navigator :url="'/pages/detail/main?id=' + item2.pid">
                                <div class="Allshop">
                                    <div class="shop_img">
                                        <img :src="url + item2.images" />
                                    </div>
                                    <div class="shop_price">
                                        <div class="titleTop">
                                            <h1>{{item2.name}}</h1>
                                            <div class="priceShop">￥{{item2.price}}</div>
                                        </div>
                                        <div class="titleBottom">
                                            <div class="shopNumber">{{item2.skutitle}}</div>
                                            <div class="shopNums">x{{item2.number}}</div>
                                        </div>
                                    </div>
                                </div>
                            </navigator>
                        </div>
                        <div class="priceNum">
                            共计{{item.total_number}}件商品 合计:<span>￥{{item.total_price}}</span> (含运费￥0.00）
                        </div>
                        <div>
                            <button class="paid_btn paid_detail" @click="payment(item.order_sn,item.total_price)">付款</button>
                            <navigator :url="'/pages/readDetail/main?id=' + item.orderid +'&active=' + item.status"><button class="paid_btn">查看详情</button></navigator>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待发货" name="c">
                    <div class="All_index" v-for="(item,index) in listorder" :key="index">
                        <div class="AllCode">
                            <div class="codeOrder">订单编号:{{item.order_sn}}</div>
                            <div class="paid">待发款</div>
                        </div>
                        <div v-for="(item2,index2) in item.orderlist" :key="index2">
                            <navigator :url="'/pages/detail/main?id=' + item2.pid">
                                <div class="Allshop">
                                    <div class="shop_img">
                                        <img :src="url + item2.images" />
                                    </div>
                                    <div class="shop_price">
                                        <div class="titleTop">
                                            <h1>{{item2.name}}</h1>
                                            <div class="priceShop">￥{{item2.price}}</div>
                                        </div>
                                        <div class="titleBottom">
                                            <div class="shopNumber">{{item2.skutitle}}</div>
                                            <div class="shopNums">x{{item2.number}}</div>
                                        </div>
                                    </div>
                                </div>
                            </navigator>
                        </div>
                        <div class="priceNum">
                            共计{{item.total_number}}件商品 合计:<span>￥{{item.total_price}}</span> (含运费￥0.00）
                        </div>
                        <div>
                            <navigator :url="'/pages/readDetail/main?id=' + item.orderid +'&active=' + item.status"><button class="paid_btn">查看详情</button></navigator>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="待收货" name="d">
                    <div class="All_index" v-for="(item,index) in listorder" :key="index">
                        <div class="AllCode">
                            <div class="codeOrder">订单编号:{{item.order_sn}}</div>
                            <div class="paid">待收款</div>
                        </div>
                        <div v-for="(item2,index2) in item.orderlist" :key="index2">
                            <navigator :url="'/pages/detail/main?id=' + item2.pid">
                                <div class="Allshop">
                                    <div class="shop_img">
                                        <img :src="url + item2.images" />
                                    </div>
                                    <div class="shop_price">
                                        <div class="titleTop">
                                            <h1>{{item2.name}}</h1>
                                            <div class="priceShop">￥{{item2.price}}</div>
                                        </div>
                                        <div class="titleBottom">
                                            <div class="shopNumber">{{item2.skutitle}}</div>
                                            <div class="shopNums">x{{item2.number}}</div>
                                        </div>
                                    </div>
                                </div>
                            </navigator>
                        </div>
                        <div class="priceNum">
                            共计{{item.total_number}}件商品 合计:<span>￥{{item.total_price}}</span> (含运费￥0.00）
                        </div>
                        <div>
                            <navigator :url="'/pages/readDetail/main?id=' + item.orderid +'&active=' + item.status"><button class="paid_btn">查看详情</button></navigator>
                            <button class="paid_btn paid_detail" @click="cell">提货码</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
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
                <van-tab title="已完成" name="e">
                    <div class="All_index" v-for="(item,index) in listorder" :key="index">
                        <div class="AllCode">
                            <div class="codeOrder">订单编号:{{item.order_sn}}</div>
                            <div class="paid">已完成</div>
                        </div>
                        <div v-for="(item2,index2) in item.orderlist" :key="index2">
                            <navigator :url="'/pages/detail/main?id=' + item2.pid">
                                <div class="Allshop">
                                    <div class="shop_img">
                                        <img :src="url + item2.images" />
                                    </div>
                                    <div class="shop_price">
                                        <div class="titleTop">
                                            <h1>{{item2.name}}</h1>
                                            <div class="priceShop">￥{{item2.price}}</div>
                                        </div>
                                        <div class="titleBottom">
                                            <div class="shopNumber">{{item2.skutitle}}</div>
                                            <div class="shopNums">x{{item2.number}}</div>
                                        </div>
                                    </div>
                                </div>
                            </navigator>
                        </div>
                        <div class="priceNum">
                            共计{{item.total_number}}件商品 合计:<span>￥{{item.total_price}}</span> (含运费￥0.00）
                        </div>
                        <div>
                            <navigator :url="'/pages/readDetail/main?id=' + item.orderid +'&active=' + item.status"><button class="paid_btn">查看详情</button></navigator>
                            <navigator :url="'/pages/comment/main?id=' + item.orderid">
                                <button class="paid_btn paid_detail">去评价</button>
                            </navigator>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>

export default {

    data () {
        return {
            active:'a',
            url: this.globalData.url,
            listorder: [],
            show: false,
            total: [],
            orderSn: ''
        }
    },
    onLoad (res) {
        this.active = res.id
        // wx.setStorageSync('order_active', res.id)
    },
    onShow() {
        if(!this.active) {
            this.active = 0
        }
        this.orderlist(this.active)
        // this.active = wx.getStorageSync('order_active')
    },
    methods: {
        // 提货码显示
        cell:function(){
            this.show = true;
        },
        // 提货码关闭
        close:function() {
            this.show = false;
        },
        changeTab(e) {
            this.orderlist(e.mp.detail.index)
            this.active = e.mp.detail.index
        },
        orderlist:function(orderstatus){
            this.$wxhttp.post({
                'url': '/order/orderlist',
                'data': {
                    'orderstatus': orderstatus
                }
            }).then((e) => {
                console.log(e)
                this.listorder = e.data
            })
        },
        // 微信支付
        payment:function(order,total) {
            this.$wxhttp.post({
                'url': '/cartitem/orderpay',
                'data': {
                    total_price: total,
                    order_no: order
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
    /* 头部选项卡 */
    .Allorder >>> .van-tab {
        font-size: 29rpx;
        color: #333333;
    }
    .Allorder >>> .van-tab--active {
        color: #FF0D0D;
    }
    .Allorder >>> .van-tabs__line {
        background: linear-gradient(268deg, #FF862D 0%, #F71010 100%);
    }
    .Allorder >>> .van-tabs__wrap {
        border-bottom: 1rpx solid #eee;
        margin: 15rpx;
    }
    /* 全部 */
    .All_index {
        width: 690rpx;
        height: auto;
        background: #FFFFFF;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx auto;
    }
    .AllCode {
        display: flex;
        padding-top: 30rpx;
        margin: 0 30rpx 20rpx;
    }
    .codeOrder {
        flex: 5;
        font-size: 22rpx;
        color: #666666;
    }
    .paid {
        flex: 2;
        font-size: 22rpx;
        color: #666666;
        text-align: right;
    }
    .paid2 {
        color: #EF653A;
    }
    .Allshop {
        width: 690rpx;
        height: 189rpx;
        background: #FFF9F3;
        display: flex;
    }
    .shop_img {
        width: 149rpx;
        height: 148rpx;
        padding-top: 20rpx;
        margin: 0rpx 30rpx;
    }
    .shop_img img {
        width: 100%;
        height: 100%;
    }
    .shop_price {
        width: 65%;
        margin-top: 40rpx;
    }
    .titleTop {
        display: flex;
    }
    .titleTop h1 {
        flex: 5;
        font-size: 28rpx;
        color: #666666;
    }
    .priceShop {
        flex: 2;
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
        text-align: right;
    }
    .titleBottom {
        display: flex;
        margin-top: 40rpx;
    }
    .shopNumber {
        flex: 5;
        font-size: 20rpx;
        color: #999999;
    }
    .shopNums {
        flex: 2;
        font-size: 22rpx;
        color: #999999;
        text-align: right;
        justify-content: center;
    }
    .priceNum {
        font-size: 22rpx;
        font-weight: 500;
        color: #666666;
        border-bottom: 1rpx solid #eee;
        text-align: right;
        padding-bottom: 25rpx;
        margin: 25rpx 30rpx 0 0;
    }
    .priceNum span {
        font-size: 28rpx;
        color: #333333;
    }
    .paid_btn {
        width: 132rpx;
        height: 51rpx;
        line-height: 48rpx;
        text-align: center;
        border: 3rpx solid #999999;
        border-radius: 24rpx;
        font-size: 22rpx;
        font-weight: 500;
        color: #434343;
        float: right;
        margin: 20rpx 30rpx 20rpx 0;
        padding: 0;
    }
    .paid_detail {
        border: 3rpx solid #F71010;
        color: #EC1717;

    }
</style>
