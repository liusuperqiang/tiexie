<template>
    <div class="box">
        <div class="indexcart">
            <div class="totalshop">共{{cartTotal}}件商品</div>
            <div>
                <span class="admin_cart" @click="adminCart" v-show="glcart">管理购物车</span>
                <span class="complete" @click="complete" v-show="plete">完成</span>
            </div>
            <div class="whole_meishi" v-for="(item, index) in cartAll" :key="index">
                <div class="shoptitle">
                    {{item.shoptitle}}
                </div>
                <div class="proshop" v-for="(item2, index2) in item.cartlist" :key="index2">
                    <van-checkbox-group :value="checked1" @change="onChange4">
                        <div class="minuteShop" v-if="item2.is_rush == 1">
                            <span>秒杀商品</span>
                            <div>
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
                        <van-checkbox icon-size="28rpx" :name="item2.cartid">
                            <navigator :url="'/pages/detail/main?id=' + item2.pid">
                                <div class="proshopimg">
                                    <img :src="url + item2.images" />
                                </div>
                            </navigator>
                            <div class="proshoptitle">
                                <h2>{{item2.name}}</h2>
                                <div class="proshopzhaopai">
                                    {{item2.specvalue}} &nbsp&nbsp&nbsp{{item2.skutitle}}
                                </div>
                                <div class="proshopmonth">月销{{item2.sales}}单</div>
                                <div class="smallcart">
                                    <span>￥{{item2.price}}</span>
                                </div>
                            </div>
                        </van-checkbox>
                        <div class="quantity">
                            <van-stepper :value="item2.quantity" @change="onChange2($event,item2)" input-width="38rpx" button-size="38rpx" />
                        </div>
                    </van-checkbox-group>
                </div>
            </div>
            <div class="cartnull" v-if="cartAll== ''">购物车空空如也</div>
            <div class="cartclear" v-if="shixiaototal">
                <div class="cartshop">
                    <div class="shopshixiao">失效商品共<div>{{shixiaototal}}</div>件</div>
                    <div class="shopclear" @click="proclear">一件清空</div>
                </div>
                <div v-for="(item, index) in cartAll" :key="index">
                    <div class="proshop" v-for="(item2, index2) in item.cartlist" :key="index2" v-if="item2.isstock == 0">
                        <div class="proshopimg">
                            <img :src="url + item2.images"/>
                            <div class="shouqin">已售罄</div>
                        </div>
                        <div class="proshoptitle">
                            <h2>{{item2.name}}</h2>
                            <div class="proshopzhaopai">
                                {{item2.specvalue}} &nbsp&nbsp&nbsp{{item2.skutitle}}
                            </div>
                            <div class="proshopmonth">月销{{item2.sales}}单</div>
                            <div class="smallcart">
                                <span>￥{{item2.price}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tuijian">
                <h1>——新疆特产——</h1>
                <div class="xinjingshop">
                    <div class="xinjiangbox" v-for="(item, index) in specialty" :key="index">
                        <a :href="'/pages/detail/main?id=' + item.id">
                            <div class="xinjiangboximg">
                                <img src="../../../static/tabs/shouye/ganhuo.png" />
                                <div class="xinjiangimgtop">
                                    <img :src="url + item.images" />
                                </div>
                            </div>
                            <div class="xinjiangtitle">
                                <h2>{{item.name}}</h2>
                                <div class="smallcart">
                                    <div class="priceitem">￥{{item.price}}</div>
                                    <span class="pricespan">￥{{item.discount_price}}</span>
                                </div>
                            </div>
                        </a>
                        <div class="smallgocart" @click="createdCart(item,'list')">
                            <img src="../../../static/tabs/shouye/redCart.png"/>
                        </div>
                        <van-toast id="van-toast"/>
                    </div>
                </div>
                <div class="footer">
                    去首页看看~~
                </div>
            </div>
        </div>
        <van-dialog id="van-dialog" />
        <div class="cartfooter" >
            <van-checkbox :value="checkedAll" icon-size="30rpx" @change="onChange3">全选</van-checkbox>
            <div v-show="seeis">
                <div class="heji">合计：<span>￥{{totalPrice}}</span></div>
                <div class="jiesuan" @click="goOrder">去结算</div>
            </div>
            <div class="del" v-show="see" @click="prodel">删除</div>

        </div>

    </div>
</template>

<script>
    import Toast from "../../../static/vant-weapp/dist/toast/toast";
    import Dialog from '../../../static/vant-weapp/dist/dialog/dialog';
export default {

    data () {
        return {
            checkedAll: false,
            checked1: [],
            checked2: true,
            show: false,
            radio: '',
            url: this.globalData.url,
            time: 30 * 60 * 60 * 1000,
            timeData: {},
            see: false,
            seeis: true,
            glcart: true,
            plete: false,
            specialty: '',
            cartAll: '',
            spec: [],
            totalPrice: 0,
            cartTotal: '',
            checked: [],
            shixiaototal: 0,
        }
    },
    onShow () {
        if (!wx.getStorageSync('isMobile')) {
            wx.navigateTo({
                url: '/pages/login/main'
            })
        }
         /* 购物车列表 */
        this.listCart()
        /* 特产列表 */
        this.$wxhttp.post({
            'url': "/product/productlist",
            'data': {
                'type': 'xjtcp'
            }
        }).then((res) => {
            res.data.data.forEach(val => {
                this.specialty = val.plist
            })

        })

    },
    methods: {
        // 全选
        onChange3:function ($event, item) {
            this.checkedAll = $event.mp.detail
            let row = []
            this.checked1 = this.cartAll.map(item=>{
                item.cartlist.map(item1 => {
                    row.push(item1)
                })
            })
            this.checked1 = row.map(val=>{
                return val.cartid.toString()
            })
            this.checkedAll = $event.mp.detail
            if(this.checkedAll === false) {
                this.checked1 = []
                this.totalPrice = 0
            } else {
                this.totalPrice = 0
                row.map(item => {
                    this.totalPrice += parseFloat(item.price) * item.quantity
                })
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
            }

        },
        // 数量
        onChange2:function ($event,item) {
            console.log(item)
            this.$wxhttp.post({
                'url': "/cartitem/updateCart",
                'data': {
                    'number': $event.mp.detail,
                    'cartid': item.cartid
                }
            }).then((res) => {
                console.log(res)
                if (res.status == 'success') {
                    this.listCart()
                }
            })
        },
        // 选中
        onChange4:function ($event){
            this.checked1 = $event.mp.detail
            console.log(this.checked1)
            let row = []
            this.cartAll.map(item=>{
                item.cartlist.map(item1 => {
                    row[item1.cartid] = item1
                })
            })
            if (this.checked1.length == Object.keys(row).length){
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
            if (this.checked1.length == 0) {
                this.totalPrice = 0
            } else {
                this.totalPrice = 0
                this.checked1.map(v => {
                    this.totalPrice += parseFloat(row[v].price) * row[v].quantity
                })
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
            }
        },
        check: function (e) {
          console.log(e)
        },
        selectedshop: function ($event, item) {
            console.log($event)
            this.shop = $event.mp.detail
            if ($event.mp.detail.length == 0) {
                this.checked1 = item.map(item=>{
                    return ''
                })
            } else {
                this.checked1 = item.map(item=>{
                    return item.cartid.toString()
                })
            }
        },
        // 倒计时
        onChange5:function(e) {
            this.timeData = e.mp.detail
        },
        // 管理购物车
        adminCart:function (item) {
            console.log(item)
            this.see = true
            this.seeis = false
            this.plete = true
            this.glcart = false
        },
        // 完成
        complete:function(){
            this.glcart = true
            this.plete = false
            this.see = false
            this.seeis = true
        },
        /* 添加购物车 */
        createdCart(item,type){
            this.$wxhttp.Carts(item,type)
            this.listCart()
        },
        /* 购物车列表 */
        listCart:function(cid) {
            this.$wxhttp.post({
                'url': '/cartitem/cartlist',
                'data': {
                    'cid': cid
                }
            }).then((e) => {
                console.log(e)
                this.cartAll = e.data.data
                this.cartTotal = e.data.total
                let row = []
                e.data.data.forEach(item => {
                    item.cartlist.forEach(val => {
                        row[val.cartid] = val
                        if (val.isstock == 0) {
                            this.shixiaototal++
                        }
                    })
                })
                this.totalPrice = 0
                this.checked1.map(v => {
                    this.totalPrice += parseFloat(row[v].price) * row[v].quantity
                })
                this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
            })
        },
        // 购物车删除
        prodel:function(e) {
            Dialog.confirm({
                message: '确定要删除吗',
            })
              .then(() => {
                let ids = this.checked1.join(',')
                console.log(ids)
                this.$wxhttp.post({
                    'url': "/cartitem/cartdel",
                    'data': {
                        ids: ids
                    }
                }).then((e) => {
                    if (e.status == 'success') {
                        Toast({
                            type: 'success',
                            message: e.msg,
                            onClose: () => {
                                this.listCart()
                            },
                        })
                    } else {
                        Toast.fail(e.msg);
                    }
                })
              })
        },
        // 一件清空
        proclear:function(e) {
            let ids = []
            this.cartAll.forEach(item => {
                item.cartlist.forEach(val => {
                    if (val.isstock == 0) {
                        ids.push(val.cartid)
                    }
                })
            })
            this.$wxhttp.post({
                'url': "/cartitem/cartdel",
                'data': {
                    ids: ids.join(',')
                }
            }).then((e) => {
                if (e.status == 'success') {
                    Toast({
                        type: 'success',
                        message: e.msg,
                        onClose: () => {
                            this.listCart()
                        },
                    })
                } else {
                    Toast.fail(e.msg);
                }
            })
        },
        // 去结算
        goOrder:function(){
            if(this.checked1 == ''){
                Toast.fail('未选择产品');
            } else {
                let ids = this.checked1
                wx.navigateTo({
                    url: '/pages/cartOrder/main?ids=' + ids + '&total=' + this.totalPrice
                })
            }
        }
    }

}
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .cartnull {
        text-align: center;
        font-size: 28rpx;
        color: #626262;
        margin: 200rpx 0;
    }
    /* 头部选项卡 */
    .indexcart {
        position: relative;
        margin-top: 20rpx;
    }
    .totalshop {
        font-size: 22rpx;
        color: rgba(1, 1, 1, .8);
        margin: 0 0 20rpx 40rpx;
    }
    .indexcart .admin_cart, .complete {
        position: absolute;
        right: 30rpx;
        top: -1rpx;
        z-index: 9;
        font-size: 22rpx;
        color: rgba(1, 1, 1, .8);
    }
    .shoptitle {
        font-size: 28rpx;
        font-weight: 500;
        color: rgba(1, 1, 1, .9);
        border-bottom: 1rpx solid #DCDCDC;
        padding: 20rpx;
    }
    /* 美食 */
    .whole_meishi {
        width: 690rpx;
        height: auto;
        box-shadow: 4rpx 4rpx 10rpx 0px rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 0 auto 28rpx;
    }
    .proshop navigator {
        display: inline;
    }
    .proshop {
        border-bottom: 1rpx solid #eee;
        margin: 0rpx 20rpx;
        padding: 20rpx 0;
        position: relative;
    }
    .proshop:last-child {
        border: none;
    }
    .proshop .proshopimg {
        width: 180rpx;
        height: 162rpx;
        display: inline-block;
        vertical-align: top;
    }
    .proshop .proshopimg img {
        width: 100%;
        height: 100%;
        border-radius: 5rpx;
    }
    .proshoptitle {
        display: inline-block;
        margin-left: 26rpx;
        /* width: 60%; */
    }
    .proshoptitle h2 {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 30rpx;
        color: #000000;
    }
    /* 秒杀商品和倒计时 */
    .minuteShop {
        margin-bottom: 10rpx;
        margin-left: 40rpx;
    }
    .minuteShop span {
        width: 88rpx;
        height: 30rpx;
        line-height: 30rpx;
        text-align: center;
        background: rgba(234, 16, 16, .7);
        border-radius: 11px;
        font-size: 16rpx;
        color: #FFFFFF;
        display: inline-block;
    }
    .minuteShop div {
        float: right;
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
    /* 口味单选 */
    .proshopzhaopai {
        font-size: 24rpx;
        color: #ff682c;
    }
    /* 月销 */
    .proshopmonth {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
    }
    /* 价格 */
    .smallcart span:first-child {
        font-size: 24rpx;
        font-weight: 500;
        color: #EE0B0B;
    }
    .smallcart span:nth-child(2) {
        font-size: 20rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, .3);
    }
    .quantity {
        position: absolute;
        right: 10rpx;
        bottom: 30rpx;
    }
    .quantity >>> .van-stepper__input {
        padding: 0;
    }
    .priceitem {
        font-size: 21rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, .3);
        line-height: 0.6;
    }
    .pricespan {
        font-size: 30rpx!important;
        font-weight: 500;
        color: #EE0B0B!important;
        text-decoration: none!important;
    }
    /* 失效商品 */
    .cartclear {
        width: 690rpx;
        height: auto;
        background: #FFFFFF;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx auto;
    }
    .cartclear .proshoptitle {
        width: 68%;
    }
    .cartclear .proshopimg {
        position: relative;
        background-color: rgba(0,0,0,.3);
    }
    .cartclear .proshopimg .shouqin {
        position: absolute;
        left: 0;
        top: 0;
        width: 180rpx;
        height: 162rpx;
        line-height: 162rpx;
        text-align: center;
        background-color: rgba(0, 0, 0, .6);
        font-size: 30rpx;
        color: #FEFEFE;
        border-radius: 5rpx;
    }
    .shopshixiao, .shopshixiao div, .shopclear {
        display: inline-block;
    }
    .shopshixiao, .shopclear {
        font-size: 20rpx;
        color: rgba(1, 1, 1, .6);
        margin-right: 25rpx;
    }
    .shopclear {
        width: 110rpx;
        height: 36rpx;
        line-height: 36rpx;
        text-align: center;
        border: 1rpx solid #626262;
        border-radius: 18rpx;
        float: right;
    }
    /* 新疆特产 */
    .tuijian h1 {
        font-size: 24rpx;
        color: rgba(0,0,0,.6);
        text-align: center;
        margin-top: 35rpx;
    }
    .xinjingshop {
        width: 660rpx;
        margin: 10rpx auto;
    }
    .proshopmonth {
        /* height: 60rpx; */
        line-height: 40rpx;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
    }
    .xinjiangbox {
        width: 303rpx;
        height: 370rpx;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx 56rpx 20rpx 0;
        display: inline-block;
        position: relative;
    }
    .xinjiangbox:nth-child(even) {
        margin-right: 0;
    }
    .xinjiangboximg {
        width: 255rpx;
        height: 221rpx;
        border-radius: 5rpx;
        position: relative;
        margin: 0rpx auto;
        margin-top: 28rpx;
    }
    .xinjiangboximg img {
        width: 100%;
        height: 100%;
    }
    .xinjiangimgtop {
        width: 247rpx;
        height: 164rpx;
        position: absolute;
        left: 5rpx;
        top: 5rpx;
    }
    .xinjiangimgtop img {
        width: 100%;
        height: 100%;
        display: unset;
    }
    .xinjiangtitle {
        margin: 10rpx 24rpx;
    }
    .xinjiangtitle h2 {
        font-size: 30rpx;
        height: 48rpx;
        color: #000000;
    }
    .xinjiangtitle .smallcart span:nth-child(2) {
        font-size: 21rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, .3);
    }
    .tuijian .smallcart span {
        font-size: 36rpx;
        font-weight: 500;
        color: #EE0B0B;
    }
    .smallgocart {
        width: 62rpx;
        height: 34rpx;
        float: right;
        position: absolute;
        right: 20rpx;
        bottom: 20rpx;
    }
    .smallgocart img {
        width: 100%;
        height: 100%;
    }
    /* 到底了*/
    .footer {
        text-align: center;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
        margin-bottom: 12%;
    }
    /* 底部结算 */
    .cartfooter, .cartdel {
        width: 100%;
        height: 87rpx;
        background: #FFFFFF;
        opacity: 0.8;
        position: fixed;
        bottom: 0;
        font-size: 24rpx;
        color: #000000;

    }
    .cartfooter>>>.van-checkbox, .cartdel>>>.van-checkbox {
        float: left;
        margin-top: 32rpx;
        margin-left: 20rpx;
    }
    .cartfooter .heji {
        float: left;
        line-height: 87rpx;
        margin-left: 20%;
    }
    .cartfooter .heji span {
        font-size: 40rpx;
        font-weight: 500;
        color: #EE0B0B;
    }
    .cartfooter .jiesuan, .del {
        width: 120rpx;
        height: 86rpx;
        line-height: 86rpx;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        font-size: 28rpx;
        color: #fff;
        float: right;
        text-align: center;
    }

</style>
