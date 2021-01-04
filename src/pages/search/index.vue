<template>
    <div class="box">
        <div class="indexSearch">
            <van-search
              :value="value"
              @search= "search"
              @change="onChange"
              shape="round"
              background="linear-gradient(0deg, #FF862D 0%, #F71010 100%)"
              placeholder="请输入商品名称"
            />
        </div>
        <div class="xinjingshop">
            <div class="xinjiangbox" v-for="(item, index) in goods" :key="index">
                <a :href="'/pages/detail/main?id=' + item.id " >
                    <div class="xinjiangboximg">
                        <img src="../../../static/tabs/shouye/ganhuo.png"/>
                        <div class="xinjiangimgtop">
                            <img :src="url + item.images"/>
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
            </div>
        </div>
        <div class="footer">
            到底了~~
        </div>
    </div>
</template>

<script>

export default {

    data () {
        return {
            value: '',
            url: this.globalData.url,
            goods: []
        }
    },
    methods: {
        onChange(e){
            this.value = e.mp.detail
        },
        search:function() {
            console.log(this.value)
            let _this = this
            _this.$wxhttp.post({
                'url': '/product/productlist',
                'data': {
                    'keyword': this.value
                }
            }).then((e) => {
                console.log(e)
                _this.goods = e.data.data
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
    .indexSearch >>> .van-search {
        padding: 36rpx 45rpx!important;
    }
    /* 新疆好货 */
    .xinjingshop {
        width: 660rpx;
        margin: 0rpx auto 20rpx;
    }
    .proshopmonth {
        height: 60rpx;
        line-height: 40rpx;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
    }
    .xinjiangbox {
        width: 303rpx;
        height: 370rpx;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 20rpx 45rpx 20rpx 0;
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
    .priceitem {
        font-size: 21rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, .3);
        line-height: 0.6;
    }
    .pricespan {
        font-size: 30rpx;
        font-weight: 500;
        color: #EE0B0B;
        text-decoration: none;
    }
    /* 到底了*/
    .footer {
        text-align: center;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
        padding-bottom: 30rpx;
    }
</style>
