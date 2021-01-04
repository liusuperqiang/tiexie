<template>
    <div class="box">
        <div class="topbgc" style="background: url(http://www.xianxiaoyemao.com/static/image/top2.png)no-repeat; background-size: 100% 100%;">
            <van-count-down use-slot :time="time" @change="onChange5">
                <text class="item">{{timeData.days}}</text>
                <text class="item">{{timeData.hours}}</text>
                <text class="item">{{timeData.minutes}}</text>
                <text class="item">{{timeData.seconds}}</text>
            </van-count-down>
        </div>
        <div class="donot" v-if="goods == ''">
        	<img src="../../../static/tabs/shouye/1.png" />
        </div>
        <div class="tuijian">
            <div class="xinjingshop">
                <div class="xinjiangbox" v-for="(item, index) in goods" :key="index">
                    <a :href="'/pages/detail/main?type=ms&id=' + item.id " >
                        <div class="xianshi">
                            <img src="../../../static/tabs/shouye/smallxian.png" />
                        </div>
                        <div class="xinjiangboximg">
                            <img :src="url + item.images" />
                        </div>
                        <div class="xinjiangtitle">
                            <h2>{{item.name}}</h2>
                            <div class="smallcart">
                                <div>￥{{item.price}}</div>
                                <span>￥{{item.discount_price}}</span>
                            </div>
                        </div>
                    </a>
                    <!-- <div class="smallgocart" @click="gobuy(item)">
                        <img src="../../../static/tabs/shouye/qianganniu.png"/>
                    </div> -->
                </div>
            </div>
            <div class="footer" style="background: url(http://www.xianxiaoyemao.com/static/image/bottom2.png)no-repeat;background-size: 100% 100%;">
                没有了哦~~
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            time: 0,
            timeData: {},
            url: this.globalData.url,
            goods: []
        }
    },
    onShow() {
        this.miaosha()
    },
    methods: {
        onChange5:function(e) {
            this.timeData = e.mp.detail
        },
        miaosha:function() {
            this.$wxhttp.post({
                'url': '/product/productlist',
                'data': {
                    'type': 'ms'
                }
            }).then((e) => {
                this.goods = e.data.data
                console.log(this.goods)
                if (e.data.secskill.skill_end > 0) {
                    this.time = e.data.secskill.skill_end * 1000
                } else {
                    this.timeData = {days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}
                }
            })
        },
    }
}
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .topbgc {
        width: 100%;
        height: 643rpx;
    }
    .topbgc >>> .van-count-down {
        text-align: center;
    }
    .item {
        display: inline-block;
        width: 52rpx;
        height: 50rpx;
        line-height: 50rpx;
        margin-right: 5rpx;
        color: #fff;
        font-size: 20rpx;
        text-align: center;
        background-color: #f00;
        border-radius: 10rpx;
        margin-top: 43%;
    }
    .donot {
        width: 400rpx;
        height: 400rpx;
        margin: 20rpx auto;
    }
    .donot img {
        width: 100%;
        height: 100%;
    }
    /* .tuijian {
        background-color: #FFF7E4;
    } */
    /* 新疆特产 */
    .xinjingshop {
        width: 660rpx;
        margin: -52rpx auto 0rpx;
    }
    .proshopmonth {
        line-height: 40rpx;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
    }
    .xinjiangbox {
        width: 303rpx;
        height: 375rpx;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx 56rpx 20rpx 0;
        display: inline-block;
        background-color: #fff;
        position: relative;
    }
    .xinjiangbox:nth-child(even) {
        margin-right: 0;
    }
    .xinjiangboximg {
        width: 255rpx;
        height: 221rpx;
        border-radius: 5rpx;
        margin: 0rpx auto;
        margin-top: 28rpx;
    }
    .xinjiangboximg img {
        width: 100%;
        height: 100%;
    }
    .xinjiangtitle {
        margin: 10rpx 24rpx;
        width: 85%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .xinjiangtitle h2 {
        font-size: 30rpx;
        /* height: 48rpx; */
        color: #000000;
    }
    .xinjiangtitle .smallcart div {
        font-size: 21rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, .3);
        line-height: 0.6;
    }
    .tuijian .smallcart span {
        font-size: 30rpx;
        font-weight: 500;
        color: #EE0B0B;
    }
    .tuijian .smallgocart {
        width: 60rpx;
        height: 40rpx;
        float: right;
        position: absolute;
        right: 20rpx;
        bottom: 20rpx;
    }
    .tuijian .smallgocart img {
        width: 100%;
        height: 100%;
    }
    .xianshi {
        width: 60rpx;
        height: 60rpx;
        position: absolute;
        left: 0;
        top: 0;
    }
    .xianshi img {
        width: 100%;
        height: 100%;
    }
    /* 到底了*/
    .footer {
        text-align: center;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
        height: 284rpx;
        line-height: 150rpx;
    }
</style>
