<template>
    <div class="box">
        <div class="topbgc" style="background: url(http://www.xianxiaoyemao.com/static/image/top1.png)no-repeat; background-size: 100% 100%;">
        </div>
		<div class="donot" v-if="goods == ''">
			<img src="../../../static/tabs/shouye/1.png" />
		</div>
        <div class="tuijian">
            <div class="xinjingshop">
                <div class="xinjiangbox" v-for="(item, index) in goods" :key="index">
                    <a :href="'/pages/detail/main?type=group&id=' + item.id">
                        <div class="xianshi">2人团</div>
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
                    <div class="smallgocart">
                        <a>开团</a>
                        <div>还差1人</div>
                    </div>
                </div>
            </div>
            <div class="footer" style="background: url(http://www.xianxiaoyemao.com/static/image/bottom1.png)no-repeat;background-size: 100% 100%;">
                没有了哦~~
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            goods: [],
            url: this.globalData.url
        }
    },
    onLoad: function (e) {
        console.log(e)
    },
    onShow: function () {
        let _this = this
        _this.$wxhttp.post({
            'url': '/product/productlist',
            'data': {
                'type': 'group'
            }
        }).then((e) => {
            console.log(e)
            _this.goods = e.data.data
        })

    },
    // 分享
    onShareAppMessage: function (res) {
       this.$wxhttp.beat(res)
    },
    methods: {

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
    .smallgocart a, .smallgocart div {
        position: absolute;
        right: 20rpx;
        bottom: 26rpx;
        padding: 3rpx 15rpx;
        background: #F71010;
        border-radius: 17rpx;
        font-size: 22rpx;
        font-weight: 500;
        color: #fff;
        text-align: center;
    }
    .tuijian .smallgocart div {
        background-color: #FF862D;
    }
    .xianshi {
        position: absolute;
        left: 38rpx;
        top: 35rpx;
        font-size: 18rpx;
        color: rgba(255, 255, 255, .9);
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
