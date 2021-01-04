<template>
    <div class="box">
        <div class="chickentitle" style="background: url(http://www.xianxiaoyemao.com/static/image/tianmibgc.png)no-repeat;background-size: 100% 100%;">
            <van-row>
                <van-col span="9">
                    <div class="index_col1">
                        <img src="../../../static/tabs/shouye/tianmi.png" />
                    </div>
                </van-col>
                <van-col span="9" class="index_col2">
                    （会展中心店）
                </van-col>
                <van-col span="6">
                    <button class="index_col3" open-type='share'>
                        <img src="../../../static/tabs/shouye/tabfx.png" />
                    </button>
                </van-col>
            </van-row>
        </div>
        <div class="category">
            <!-- 左侧菜单 -->
            <div class="categoryLeft">
                <ul>
                    <li v-for="(item, index) in cates" :key="index" @click="li_active(item.id,index)" :class="index===currentIndex?'li_active':''" >{{item.cate_name}}</li>
                </ul>
            </div>
            <!-- 右侧 -->
            <scroll-view scroll-y class="categoryRight">
                <div class="categoryimg">
                    <img src="../../../static/tabs/shouye/xjbgc.png" />
                </div>
                <div class="categorybox" v-for="(item, index) in obj" :key="index">
                    <h1>{{item.cname}}</h1>
                    <div class="proshop" v-for="(item2, index2) in item.plist" :key="index2">
                        <navigator :url="'/pages/detail/main?id=' + item2.id">
                            <div class="proshopimg">
                                <img :src="url + item2.images" />
                            </div>
                            <div class="proshoptitle">
                                <h2>{{item2.name}}</h2>
                                <div class="proshopmonth">月销{{item2.sales}}单</div>
                                <div class="smallcart">
                                    <span>￥{{item2.discount_price}}</span>
                                </div>
                            </div>
                        </navigator>
                        <div class="smallgocart" @click="createdCart(item2,'list')">
                            <img src="../../../static/tabs/shouye/redCart.png"/>
                        </div>
                    </div>
                </div>
            </scroll-view>
        </div>
        <div class="footer" @click="gocart">
            去购物车
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            active: 1,
            currentIndex:0,
            specialty: '',
            url: this.globalData.url,
            cates: '',
            shareimg: '',
            obj: []
        }
    },
    onShow () {
        let _this = this
        _this.$wxhttp.post({
            'url': '/product/productlist',
            'data': {
                'type': 'xjtcp'
            }
        }).then((e) => {
            _this.specialty = e.data.data
            _this.cates = e.data.cate
            this.obj[0] = e.data.data[0]
        })

    },
    // 分享
    onShareAppMessage: function (res) {
        let specialty = wx.getStorageSync('specialty_img')
        return {
            title: '小香铺',
            path: '/pages/index/main?shareUid=' + wx.getStorageSync('uid'),
            imageUrl: specialty
        }
    },
    methods: {
        li_active:function(item,index) {
            this.currentIndex = index
            let arr = []
            this.specialty.forEach(i => {
                if (item == i.cid) {
                    arr.push(i)
                }
            })
            this.obj = arr
        },
        gocart:function() {
            wx.reLaunch({
                url: '/pages/cart/main'
            })
        },
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
    .chickentitle {
        width: 100%;
        height: 141rpx;
    }
    .chickentitle .index_col1 {
        width: 230rpx;
        height: 76rpx;
        margin: 34rpx auto 0;
    }
    .chickentitle .index_col1 img, .chickentitle .index_col3 img {
        width: 100%;
        height: 100%;
    }
    .chickentitle .index_col2 {
        font-size: 20rpx;
        color: #FFFFFF;
        line-height: 7;
    }
    .chickentitle .index_col3 {
        width: 129rpx;
        height: 40rpx;
        line-height: 40rpx;
        margin: 52rpx auto 0;
        padding: 0;
        background-color: unset;
    }
    /* 分类 */
    .category {
        display: flex;
        height: calc( 100vh - 221rpx );
    }
    .categoryLeft {
        margin-left: 30rpx;
        flex: 2;
        background-color: #eee;
    }
    .categoryLeft ul li {
        display: flex;
        height: 90rpx;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        color: rgba(0,0,0,.7);
        background: #eee;
    }
    .li_active {
        background-color: #fff!important;
        color: rgba(0,0,0,.9)!important;
    }
    .categoryRight {
        flex: 6;
        margin: 10rpx;
        height: calc(100vh - 221rpx);
    }
    .categoryimg {
        width: 543rpx;
        height: 215rpx;
    }
    .categoryimg img {
        width: 100%;
        height: 100%;
    }
    .categorybox h1 {
        font-size: 24rpx;
        color: rgba(0,0,0,.7);
        margin-bottom: 30rpx;
    }
    /* 商品 */
    .proshop {
        /* margin-top: 30rpx;
        border-bottom: 1rpx solid #DCDCDC; */
        position: relative;
    }
    .proshop:last-child {
        border: none;
    }
    .proshop .proshopimg {
        width: 145rpx;
        height: 140rpx;
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
        margin: 10rpx 0 0 26rpx;
        width: 60%;
    }
    .proshoptitle h2 {
        font-size: 24rpx;
        font-weight: 500;
        color: #000000;
    }
    .proshopmonth {
        font-size: 20rpx;
        color: rgba(0,0,0,.6);
        margin: 10rpx 0 20rpx;
    }
    .smallcart span {
        font-size: 30rpx;
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
    /* 去购物车 */
    .footer {
        width: 100%;
        height: 80rpx;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        position: fixed;
        bottom: 0;
        font-size: 30rpx;
        color: #FFFFFF;
        line-height: 80rpx;
        text-align: center;

    }
</style>
