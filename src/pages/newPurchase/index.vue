<template>
    <div class="box">
        <div class="topbgc" style="background: url(http://www.xianxiaoyemao.com/static/image/buy.png)no-repeat; background-size: 100% 100%;">
            <div class="setcolor">
                仅限新用户，快来领取您的福利吧
            </div>
        </div>
        <div class="tuijian">
            <div class="index_shopAdmin">
                <div class="proshop" v-for="(item, index) in goods" :key="index">
                    <!-- <navigator :url="'/pages/detail/main?id=' + item.id"> -->
                        <div class="proshopimg">
                            <img :src="url + item.images" />
                        </div>
                        <div class="proshoptitle">
                            <h2>{{item.name}}</h2>
                            <div class="proshopzhaopai">
                                约重500g
                            </div>
                            <div class="newPrice">￥{{item.discount_price}}<span>￥{{item.price}}</span></div>
                            <div class="smallcart">
                                <span>分享2人马上领取</span>
                            </div>
                        </div>
                    <!-- </navigator> -->
                    <button class="smallgofenxiang" open-type='share' v-if="share_user < 2">
                        <img src="../../../static/tabs/shouye/fenxiang.png"/>
                    </button>
                    <div class="smallgocart" @click="createdCart(item,'list')" v-else>
                        <img src="../../../static/tabs/shouye/redCart.png"/>
                    </div>
                </div>
            </div>
            <div class="footer" style="background: url(http://www.xianxiaoyemao.com/static/image/ty.png)no-repeat;background-size: 100% 100%;">
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
            url: this.globalData.url,
            share_user: 0
        }
    },
    onShow: function () {
        let _this = this
        _this.$wxhttp.post({
            'url': '/product/productlist',
            'data': {
                'type': 'buy0'
            }
        }).then((e) => {
            console.log(e)
            _this.goods = e.data.data
            _this.share_user = e.data.share_user_count
        })

    },
    // 分享
    onShareAppMessage: function (res) {
        let chicken = wx.getStorageSync('chicken_img')
        return {
            title: '小香铺',
            path: '/pages/index/main?shareUid=' + wx.getStorageSync('uid'),
            imageUrl: chicken
        }
    },
    methods: {
        // 添加购物车
        createdCart(item,type){
            this.$wxhttp.Carts(item,type)
        }
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
    .setcolor {
        font-size: 20rpx;
        font-weight: 500;
        color: rgba(254, 254, 254, 0.8);
        text-align: center;
        padding-top: 73%;
    }
    .index_shopAdmin {
        width: 660rpx;
        height: auto;
        background-color: #fff;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: -35rpx auto 10rpx;
        padding: 22rpx 15rpx;
    }
    .proshop {
        margin-top: 30rpx;
        border-bottom: 1rpx solid #DCDCDC;
        position: relative;
    }
    .proshop:last-child {
        border: none;
    }
    .proshop .proshopimg {
        width: 256rpx;
        height: 212rpx;
        border-radius: 5rpx;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 20rpx;
    }
    .proshop .proshopimg img {
        width: 100%;
        height: 100%;
    }
    .proshoptitle {
        display: inline-block;
        margin-left: 26rpx;
        width: 56%;
    }
    .proshoptitle h2 {
        height: 40rpx;
        line-height: 60rpx;
        font-size: 30rpx;
        color: #000000;
    }
    .proshopzhaopai {
        font-size: 20rpx;
        color: rgba(153, 153, 153, .9);
        margin: 20rpx 0;
    }
    .newPrice {
        font-size: 42rpx;
        font-weight: 500;
        color: rgba(238, 11, 11, .9);
    }
    .newPrice span {
        font-size: 21rpx;
        text-decoration: line-through;
        color: rgba(0,0,0,.3);
        margin-left: 10rpx;
    }
    .smallcart span {
        font-size: 18rpx;
        color: rgba(238, 11, 11, .9);
    }
    .smallgocart, .smallgofenxiang  {
        width: 62rpx;
        height: 34rpx;
        float: right;
        position: absolute;
        right: 20rpx;
        bottom: 20rpx;
        padding: 0;
        line-height: 0;
        border-radius: 20rpx;
    }
    .smallgofenxiang img, .smallgocart img {
        width: 100%;
        height: 100%;
    }

    /* 到底了*/
    .footer {
        text-align: center;
        font-size: 20rpx;
        height: 220rpx;
        line-height: 150rpx;
        color: #fff;
    }
</style>
