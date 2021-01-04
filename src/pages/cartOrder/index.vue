<template>
    <div class="box">
        <div class="ordertitle">
            <h1>小香铺椒麻鸡</h1>
            <a class="addres" href="/pages/addres/main">
                收货地址：<div class="addresDetail" v-if="addressinfo">
                    <p>&nbsp;{{cartContact_name}} {{cartContact_phone}}</p>
                    <p>&nbsp;{{cartDisarea}}{{cartAddress}}</p>
                </div>
                <p class="pleadd" v-if="addressinfo == ''">请选择地址</p>
                <div class="addresRight">></div>
            </a>
            <div class="orderuser">
                <div class="orderuserleft">用餐方式：</div>
                <div class="taborder">
                    <van-tabs active="b">
                        <van-tab title="外卖" name="b">
                            <div class="waimai">
                                <h1>商品明细：</h1>
                                <div v-for="(item, index) in orderspecialty" :key="key">
                                    <div class="orderShop" v-for="(item2, index2) in item.cartlist" :key="key2">
                                        <div class="cartShops">{{item2.name}}
                                            <span>({{item.shoptitle}})</span>
                                            <p>{{item2.specvalue}} {{item2.skutitle}}</p>
                                        </div>
                                        <div class="orderNumber">×{{item2.quantity}}</div>
                                        <div class="orderPrice">￥{{item2.price}}</div>
                                    </div>
									<div class="waimaiInput">
                                        <input placeholder="备注：" type="text" v-model="data[index]"/>
									</div>
                                </div>
                            </div>
                            <div class="youhuiquan">
                                <div class="youhuiTitle">
                                    优惠券： <span>暂无可用</span>
                                </div>
                                <div class="balancebox">
                                    <van-checkbox-group :value="val" @change="onChange">
                                        <van-checkbox name="a" icon-size="24rpx">
                                            <div class="balance">
                                                余额抵扣：
                                                <span>
                                                    可抵扣<a>￥{{bal}}</a>
                                                </span>
                                            </div>
                                            <div class="balancebz">每笔订单随机抵扣，最高可抵扣70%</div>
                                        </van-checkbox>
                                    </van-checkbox-group>
                                </div>
                                <div class="total">共<span>{{num}}</span>件商品</div>
                            </div>
                        </van-tab>
                        <van-tab title="自提" name="c">
                            <div class="waimai">
                                <h1>商品明细：</h1>
                                <div v-for="(item, index) in orderspecialty" :key="index">
                                    <div class="orderShop" v-for="(item2, index2) in item.cartlist" :key="key2">
                                        <div class="cartShops">{{item2.name}}
                                            <span>({{item.shoptitle}})</span>
                                            <p>{{item2.specvalue}} {{item2.skutitle}}</p>
                                        </div>
                                        <div class="orderNumber">×{{item2.quantity}}</div>
                                        <div class="orderPrice">￥{{item2.price}}</div>
                                    </div>
                            		<div class="waimaiInput">
                                        <input placeholder="备注：" type="text" v-model="rem"/>
                            		</div>
                                </div>

                            </div>
                            <div class="youhuiquan">
                                <div class="youhuiTitle">
                                    优惠券： <span>暂无可用</span>
                                </div>
                                <div class="balancebox" v-if="total > bal">
                                    <van-checkbox-group :value="val" @change="onChange">
                                        <van-checkbox name="a" icon-size="24rpx">
                                            <div class="balance">
                                                余额抵扣：
                                                <span>
                                                    可抵扣<a>￥{{bal}}</a>
                                                </span>
                                            </div>
                                            <div class="balancebz">每笔订单随机抵扣，最高可抵扣70%</div>
                                        </van-checkbox>
                                    </van-checkbox-group>
                                </div>
                                <div class="total">共<span>{{num}}</span>件商品</div>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="orderfooter">
                    <div class="orderTotal">
                        合计：<span>￥{{total}}</span>
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
            val: 'a',
            orderspecialty: '',
            num: '',
            total: 0,
            cartid: '',
            cartDisarea: '',
            cartAddress: '',
            cartContact_name:'',
            cartContact_phone: '',
            addressinfo: [],
            cartAddressid: [],
            data: [],
            rem: [],
            obj: '',
            bal: 0,
            balance: 0,
            price: 0
        }
    },
    onLoad(e) {
        this.obj = e
        this.cartid = e.ids
        this.price = parseFloat(e.total)
        this.total = parseFloat(e.total)
        this.settlement(e)
    },
    onShow(){
        this.settlement(this.obj)
        this.val = ''
        this.balance = 0
    },
    methods:{
        settlement:function(e){
            console.log(e)
            this.$wxhttp.post({
                'url': '/cartitem/cart2',
                'data': {
                    cartid: e.ids,
                    pid: e.pid,
                    action: e.action,
                    quantity: e.quantity,
                    skuid:e.skuid,
                    specvalue:e.specvalue
                }
            }).then((res) => {
                console.log(res)
                this.bal = (parseFloat(res.data.integral) * 0.7).toFixed(2)
                this.addressinfo = res.data.addressinfo
                this.cartAddressid = res.data.addressinfo.addressid
                this.cartContact_phone = res.data.addressinfo.contact_phone
                this.cartContact_name = res.data.addressinfo.contact_name
                this.cartAddress = res.data.addressinfo.address
                this.cartDisarea = res.data.addressinfo.disarea
                this.orderspecialty = res.data.data
                this.num = res.data.goods_num
            })
        },
        onChange(e) {
            this.val = e.mp.detail
            if(this.val == 'a'){
                if (this.total < this.bal) {
                    this.total = 0.01
                } else {
                    this.total -= parseFloat(this.bal)
                    this.total.toFixed(2)
                }
                this.balance = this.bal
            }else {
                if (this.total > this.bal) {
                     this.total += parseFloat(this.bal)
                } else {
                     this.total = this.price
                }
                this.total.toFixed(2)
                this.balance = 0
            }

        },
        payment:function() {
            if (this.addressinfo.length == 0) {
                wx.showToast({
                    title: '请选择地址',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            let payorder = []
            this.orderspecialty.forEach((item,index)=> {
                item.cartlist['ramrk'] = this.data[index]
                payorder.push(item.cartlist)
            })
            console.log(payorder)
            this.$wxhttp.post({
                'url': '/cartitem/createorder',
                'data': {
                    total_price: this.total,
                    data: payorder,
                    address_id: this.cartAddressid,
                    discount: this.balance,
                    cartid: this.cartid
                }
            }).then((res) => {
                console.log(res)
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
        padding-bottom: 20rpx;
        background: #Fff;
        box-shadow: 10rpx 10rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 30rpx auto 120rpx;
    }
    .youhuiTitle, .balancebox {
        padding: 20rpx 0;
        margin: 0 20rpx;
        font-size: 26rpx;
        color: #6C6C6C;
        border-bottom: 1rpx solid #eee;
    }
    .balancebox {
        position: relative;
    }
    .balance {
        color: #6C6C6C;
    }
    .youhuiTitle span, .balance span {
        font-size: 24rpx;
        color: #A9A9A9;
        float: right;
    }
    .balance span {
        position: absolute;
        right: 35rpx;
        bottom: 60rpx;
    }
    .balance a {
        display: inline-block;
        font-size: 28rpx;
        color: #F61616;
    }
    .balancebz {
        font-size: 20rpx;
        color: #A9A9A9;
    }
    .youhuiquan >>> .van-checkbox__label {
        margin: 0;
    }
    .youhuiquan >>> .van-checkbox__icon {
        position: absolute;
        right: 0rpx;
        bottom: 68rpx;
    }
    .total {
        margin: 20rpx;
        font-size: 24rpx;
        color: #6C6C6C;
        text-align: right;
    }
    .total span {
        color: #F61616;
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
