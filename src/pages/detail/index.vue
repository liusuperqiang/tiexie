<template>
    <div class="box">
        <div class="detailTop">
            <img :src="url + detail.images" />
             <div class="bgcred" v-if="type == 'ms'">
                <div class="redleft">
                    秒杀商品
                </div>
                <div class="redright">
                    <h3>距优惠结束&nbsp;&nbsp;</h3>
                    <van-count-down use-slot :time="time" @change="onChange5">
                        <text class="item">{{timeData.days}}</text>
                        <text class="item">{{timeData.hours}}</text>
                        <text class="item">{{timeData.minutes}}</text>
                        <text class="item">{{timeData.seconds}}</text>
                    </van-count-down>
                </div>
            </div>
            <div class="bgcred ptbgcred" v-if="type == 'group'">
                <div class="redleft">
                    拼团商品
                </div>
                <div class="redright ptredright">
                    <div>3</div>
                    <div>人</div>
                    <div>团</div>
                </div>
            </div>
        </div>
        <div class="detailCenter">
            <h1>{{detail.name}}</h1>
            <div class="detailPrice">
                <div class="detailPriceLeft">￥{{detail.discount_price}}</div>
                <div class="detailPriceRight">{{detail.sales}}人已购买</div>
            </div>
            <div class="detailgg">
                <div>规格 <span v-for="(item, index) in skulist" :key="index">{{item.title}}</span></div>
                <div>配送 <span>上午8点~下午18点</span></div>
                <div>数量
                    <span class="vanSte">
                        <van-stepper :value="value" @change="onChange2" input-width="38rpx" button-size="38rpx" />
                    </span>
                </div>
                <navigator :url="'/pages/commentAll/main?id=' + detail.id">
                    <div>评论 <span class="plright">({{detail.comment_num}}条) ></span><span class="plimg"><img src="../../../static/tabs/shouye/pl.png"/></span></div>
                </navigator>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="addadd" v-if="type == 'group'">
            发起拼团
        </div>
        <div class="detailBtn" v-else>
            <div @click="gocart"><img src="../../../static/tabs/shouye/qugouwu@2x.png"/></div>
            <div class="gocart" @click="gobuy"><img src="../../../static/tabs/shouye/lijigoumai@2x.png"/></div>
        </div>
        <!-- 规格 -->
        <div>
            <van-popup :show="show" position="bottom" closeable close-icon="close" custom-style="height: 540rpx" @close="onClose">
                <div class="detailpop">
                    <div class="detailpopimg">
                        <div>
                            <img :src="url + detail.images" />
                        </div>
                        ￥{{skuPrice}}
                    </div>
                    <div class="detailNumber">
                        <h4>规格</h4>
                        <span @click="selectSku(index)" :class="isActive == index ? 'spanActive' : '' " v-for="(item, index) in skulist" :key="index">{{item.title}}</span>
                    </div>
                    <div class="detailCategory" v-if="secInfo.list != ''">
                        <h4>{{secInfo.name}}</h4>
                        <span @click="selectAttr(index)" :class="attrActive == index ? 'spanActive' : '' " v-for="(item, index) in secInfo.list" :key="index">{{item}}</span>
                    </div>
                    <div class="detailCart" @click="confirm(detail.id)">
                        确认
                    </div>
                </div>
            </van-popup>
        </div>
        <div class="detailTitle">
            <h2>——商品详情——</h2>
            <div class="detailimg" v-for="(item, index) in images" :key="index">
                <img :src="url + item"/>
            </div>
        </div>

    </div>
</template>

<script>
import Dialog from '../../../static/vant-weapp/dist/dialog/dialog';
export default {

    data () {
        return {
            time: 0,
            value: 1,
            timeData: {},
            show: false,
            url: this.globalData.url,
            radio: '1',
            type: '',
            detail: [],
            skulist: [],
            images: [],
            secInfo: {},
            skuPrice: '',
            skuId: '',
            isActive: '',
            attr: '',
            attrActive: '',
            val: '',
            total: 0
        }
    },
    onLoad: function (e) {
        let _this = this
        _this.type = e.type
        let id = e.id
        _this.$wxhttp.post({
            'url': '/product/productdetails',
            'data': {
                'type': _this.type,
                'id': id
            }
        }).then((e) => {
            console.log(e)
            _this.detail = e.data.details
            _this.skulist = e.data.skulist
            _this.images = e.data.details.picdesc.split(',')
            _this.secInfo = e.data.details.product_spec_info
            _this.skuPrice = e.data.skulist[0].skuprice
            if (e.data.secskill.skill_end > 0) {
                _this.time = e.data.secskill.skill_end * 1000
            } else {
                _this.timeData = {days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}
            }
        })

    },
    methods: {
        selectSku: function (index) {
            let _this = this
            _this.skuPrice = _this.skulist[index].skuprice
            _this.isActive = index
            _this.skuId = _this.skulist[index].skuid
        },
        selectAttr: function (index) {
            let _this = this
            _this.attrActive = index
            _this.attr = _this.secInfo.list[index]
        },
        onChange5:function(e) {
            this.timeData = e.mp.detail
        },
        onChange2:function(e) {
            this.value = e.mp.detail
        },
        // 加入购物车
        gocart:function() {
            this.show = true
            this.val = 1
            this.skuId = this.skulist[0].skuid
            this.attr = this.secInfo.list[0]
        },
        // 立即购买
        gobuy:function() {
            this.show = true
            this.val = 2
            this.skuId = this.skulist[0].skuid
            this.attr = this.secInfo.list[0]
        },
        // 关闭弹窗
        onClose() {
            this.show = false
        },
        // 确定
        confirm:function(id) {
            this.show = true
            let item = {
                'id': id,
                'skuid': this.skuId,
                'quantity': this.value,
                'price': this.skuPrice,
                'specvalue': this.attr
            }
            if (this.val == 1) {
                // 添加购物车
                this.$wxhttp.Carts(item, 'details')
                this.show = false
            }else if(this.val == 2){
                // 立即购买
                this.total = this.skuPrice * this.value
                wx.navigateTo({
                    url: '/pages/cartOrder/main?action=buy_now&pid=' + id + '&skuid=' + this.skuId + '&quantity=' + this.value + '&specvalue=' + this.attr + '&total=' + this.total
                })
                this.show = false
            }
        },
    }
}
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .detailTop {
        height: 511rpx;
        position: relative;
    }
    .detailTop img {
        width: 100%;
        height: 100%;
    }
    /* 秒杀red */
    .bgcred {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 70rpx;
        line-height: 70rpx;
        background: linear-gradient(0deg, #F71010 0%, #C90B0B 100%);
        display: flex;
    }
    .redleft {
        flex: 5;
        font-size: 31rpx;
        font-weight: bold;
        color: #FFFFFF;
        margin-left: 30rpx;
    }
    .redright {
        flex: 4;
        display: flex;
        font-size: 20rpx;
        color: #FFFFFF;
        margin-right: 30rpx;
    }
    .item, .redright div {
        display: inline-block;
        width: 42rpx;
        height: 42rpx;
        line-height: 42rpx;
        margin-right: 5rpx;
        color: #F20A0A;
        font-size: 30rpx;
        text-align: center;
        background-color: #fff;
        border-radius: 5rpx;
        margin-top: 15rpx;
        font-weight: bold;
    }
    /* 拼团red */
    .ptredright {
        flex: 1;
    }
    .redright div {
        margin-right: 10rpx;
    }
    /* 详情 */
    .detailCenter {
       margin: 25rpx 30rpx;
    }
    .detailCenter h1 {
        font-size: 30rpx;
        font-weight: bold;
        color: rgba(0,0,0,.9);
    }
    .detailPrice {
        display: flex;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 1rpx solid #eee;
    }
    .detailPriceLeft {
        flex: 5;
        font-size: 40rpx;
        font-weight: bold;
        color: rgba(238, 11, 11, .9);
    }
    .detailPriceRight{
        flex: 2;
        text-align: right;
        font-size: 20rpx;
        color: rgba(0,0,0,.6);
    }
    .detailgg div {
        border-bottom: 1rpx solid #eee;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        color: rgba(0,0,0,.7);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .detailgg div span {
        font-weight: 600;
        color: rgba(68, 68, 68, .9);
        margin-left: 60rpx;
    }
    .plimg {
        width: 125rpx;
        height: 39rpx;
        display: inline-flex;
        float: right;
        margin-top: 12rpx;
    }
    .plimg img {
        width: 100%;
        height: 100%;
    }
    .plright {
        float: right;
        margin-left: 15rpx!important;
    }
    .vanSte {
        display: inline-block;
    }
    .vanSte >>> .van-stepper__minus, .vanSte >>> .van-stepper__plus, .vanSte >>> .van-stepper__input{
        vertical-align: top;
        padding: 0;
    }
    /* 底部按钮 */
    .detailBtn {
        /* margin: 0 30rpx; */
        position: fixed;
        bottom: -8rpx;
    }
    .gocart {
        /* margin-left: 50rpx; */
    }
    .detailBtn div {
        width: 375rpx;
        height: 80rpx;
        display: inline-block;
    }
    .detailBtn div img {
        width: 100%;
        height: 100%;
    }
    .addadd {
        width: 608rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 40rpx;
        font-size: 30rpx;
        color: #FFFFFF;
        position: fixed;
        bottom: 10rpx;
        left: calc(50% - 304rpx);
    }
    /* 详情图 */
    .detailTitle {
        margin-bottom: 100rpx;
    }
    .detailTitle h2 {
        text-align: center;
        font-size: 30rpx;
        font-weight: bold;
        color: #474747;
    }
    .detailTitle div {
        width: 690rpx;
        margin: 20rpx auto;
        height: 635rpx;
    }
    .detailTitle div img {
        width: 100%;
        height: 100%;
    }
    /* 弹出层 */
    .detailpop {
        margin: 25rpx 25rpx 0;
    }
    .detailpopimg {
        font-size: 40rpx;
        font-weight: bold;
        color: #EE0B0B;
        padding-bottom: 25rpx;
        border-bottom: 1rpx solid #eee;
    }
    .detailpopimg div {
        width: 90rpx;
        height: 90rpx;
        display: inline-block;
        vertical-align: middle;
        margin-right: 20rpx;
    }
    .detailpopimg div img {
        width: 100%;
        height: 100%;
    }
    .detailNumber {
        border-bottom: 1rpx solid #eee;
        padding-bottom: 20rpx;
    }
    .detailNumber h4, .detailCategory h4 {
        font-size: 24rpx;
        color: rgba(0, 0, 0, .7);
        margin: 20rpx 0 20rpx 20rpx;
    }
    .detailNumber span, .detailCategory span {
        width: 140rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        border: 2rpx solid #BFBFBF;
        border-radius: 20rpx;
        font-size: 24rpx;
        color: #444444;
        display: inline-block;
        margin-right: 25rpx;
    }
    .spanActive {
        border: 2rpx solid #FF5E0F!important;
    }
    .detailCart {
        width: 320rpx;
        height: 80rpx;
        margin: 35rpx auto 0;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 50rpx;
        line-height: 80rpx;
        text-align: center;
        color: #fff;
    }
</style>
