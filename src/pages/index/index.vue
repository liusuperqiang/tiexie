<template>
    <div class="box">
        <div class="headerHeight">
          <div class="headerbgc">
            <div class="">
                <!-- <div class="headerLeft">
                    <navigator url="/pages/shopaddres/main">
                        选择店铺地址<span> &nbsp;></span>
                    </navigator>
                </div> -->
                <div class="headerRight">
                    <navigator url="/pages/search/main">
                        椒麻鸡一人套餐
                        <div class="indexSearch">
                            <img src="../../../static/tabs/shouye/search.png" />
                        </div>
                    </navigator>
                </div>
            </div>
            <div class="box_swiper">
              <swiper indicator-dots autoplay circular>
                <block v-for="(item, index) in big" :key="index">
                    <swiper-item>
                        <img :src="url + item"/>
                    </swiper-item>
                </block>
              </swiper>
            </div>
          </div>
        </div>
        <div class="small_swiper">
          <swiper autoplay vertical circular interval='2000'>
            <block>
              <swiper-item v-for="(item, index) in roll" :key="index">
                <div class="small_text">{{item}}</div>
              </swiper-item>
            </block>
          </swiper>
        </div>
        <div class="img_nav">
            <navigator url="/pages/chicken/main">
                <div class="jiaomaji">
                    <img src="../../../static/tabs/shouye/jiaomaji.png" />
                </div>
            </navigator>
            <navigator url="/pages/specialty/main">
                <div class="techan">
                    <img src="../../../static/tabs/shouye/techan.png" />
                </div>
            </navigator>
        </div>
        <!-- 遮罩层 -->
        <div class="zz" v-if="newuser == true">
            <van-popup :show="show">
                <div class="bgcbox">
                    <div style="height: 240rpx;"></div>
                    <div class="zzbox" v-for="(item, index) in popup" :key="index">
                        <div class="shopimg">
                            <img :src="url + item.images" />
                        </div>
                        <div class="shopdetail">
                            <h1>【新人特惠】</h1>
                            <h2>{{item.name}}</h2>
                            <h3>新人价：<span>{{item.discount_price}}元</span></h3>
                            <h4>原价：{{item.price}}元</h4>
                        </div>
                    </div>
                    <navigator :url="'/pages/login/main?shareuid=' + shareUid" v-if="!isMobile">
                        <div class="zzboximg">
                            <img src="../../../static/tabs/shouye/ling.png" />
                        </div>
                    </navigator>
                    <navigator url="/pages/newPurchase/main" v-else>
                        <div class="zzboximg">
                            <img src="../../../static/tabs/shouye/ling.png" />
                        </div>
                    </navigator>
                </div>
                <navigator :url="'/pages/login/main?shareuid=' + shareUid" v-if="!isMobile">
                    <div class="close" @click="close"></div>
                </navigator>
                <div v-else>
                    <div class="close" @click="close"></div>
                </div>
            </van-popup>
        </div>

        <div class="index_nav">
            <ul>
                <li>
                    <div class="index_box" @click="sign">
                        <img src="../../../static/tabs/shouye/qian.png" />
                    </div>
                    <span>签到领积分</span>
                </li>
                <navigator url="/pages/group/main">
                    <li>
                        <div class="index_box">
                             <img src="../../../static/tabs/shouye/ping.png" />
                        </div>
                        <span>拼团中心</span>
                    </li>
                </navigator>
                <navigator url="/pages/miaosha/main">
                    <li>
                        <div class="index_box">
                            <img src="../../../static/tabs/shouye/miao.png" />
                        </div>
                        <span>特惠秒杀</span>
                    </li>
                </navigator>
                <li @click="toast">
                    <div class="index_box">
                        <img src="../../../static/tabs/shouye/quan.png" />
                    </div>
                    <span>领券中心</span>
                </li>
                <van-toast id="van-toast"/>
            </ul>
        </div>
        <navigator url="/pages/newPurchase/main">
            <div class="index_gou" v-if="newuser == true">
                <img src="../../../static/tabs/shouye/tuceng.png" />
            </div>
        </navigator>
        <button class="invitation" open-type='share'>
            <img src="../../../static/tabs/shouye/invi.png" />
        </button>
        <div class="index_miaosha" v-if="seckill != ''">
            <div class="index_miaoshamargin">
                <van-row>
                    <van-col span="9" class="index_col1">
                        <img mode="widthFix" src="../../../static/tabs/shouye/titlexian.png" />
                    </van-col>
                    <van-col span="10" class="index_col2">
                        <div class="countDown">
                            <van-count-down use-slot :time="time" @change="onChange5">
                                <text class="item">{{timeData.days}}</text>
                                <text class="item">{{timeData.hours}}</text>
                                <text class="item">{{timeData.minutes}}</text>
                                <text class="item">{{timeData.seconds}}</text>
                            </van-count-down>
                        </div>
                    </van-col>
                    <navigator url="/pages/miaosha/main">
                        <van-col span="5" class="index_col3">更多</van-col>
                    </navigator>
                </van-row>
            </div>

            <div class="miaosha_content">
                <div class="index_content" v-for="(item, index) in seckill" :key="index">
                    <navigator :url="'/pages/detail/main?id=' + item.id +'&type=ms'">
                        <div class="contentImg">
                            <img :src="url + item.images" />
                            <div class="smallImg">
                                <img src="../../../static/tabs/shouye/smallxian.png" />
                            </div>
                        </div>
                        <h3>【招牌】{{item.name}}</h3>
                        <div class="afterprice">￥{{item.price}}</div>
                        <div class="smallcart">
                            <span>￥{{item.discount_price}}</span>
                        </div>
                    </navigator>
                </div>
            </div>
        </div>
        <navigator url="/pages/group/main">
            <div class="index_pintuan">
                <img src="../../../static/tabs/shouye/pintuan.png" />
            </div>
        </navigator>
        <div class="index_shopAdmin">
            <div class="shopAdmintitle">
                <navigator url="/pages/chicken/main">
                    <h1>店长推荐</h1>
                    <span>更多</span>
                </navigator>
            </div>
            <div class="proshop" v-for="(item, index) in recommend" :key="index">
                <navigator :url="'/pages/detail/main?id=' + item.id">
                    <div class="proshopimg">
                        <img :src="url + item.images" />
                        <div class="smallProshopImg" v-if="index==0">
                            <img src="../../../static/tabs/shouye/NO.png" />
                        </div>
                        <div class="smallProshopImg" v-if="index==1">
                            <img src="../../../static/tabs/shouye/NO2.png" />
                        </div>
                        <div class="smallProshopImg" v-if="index==2">
                            <img src="../../../static/tabs/shouye/NO3.png" />
                        </div>
                    </div>
                    <div class="proshoptitle">
                        <h2>{{item.name}}</h2>
                        <div class="proshopzhaopai">
                            <span v-if="index==0">社区人气NO.1</span>
                            <span v-if="index==1">社区人气NO.2</span>
                            <span v-if="index==2">社区人气NO.3</span>
                            &nbsp;<span>本店招牌</span>
                        </div>
                        <div class="proshopmonth">月销{{item.sales}}单</div>
                        <div class="smallcart">
                            <span>￥{{item.discount_price}}</span>
                        </div>
                    </div>
                </navigator>
                <div class="smallgocart" @click="createdCart(item,'list')">
                    <img src="../../../static/tabs/shouye/redCart.png"/>
                </div>
            </div>
        </div>

        <div class="xinjingshop">
            <div class="shopAdmintitle">
                <navigator url="/pages/specialty/main">
                    <h1>新疆好货</h1>
                    <span>更多</span>
                </navigator>
            </div>
            <div class="xinjiangbox" v-for="(item, index) in specialty" :key="index">
                <a :href="'/pages/detail/main?id=' + item.id" >
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
                <div class="smallgocart" @click="createdCart(item,'list')">
                    <img src="../../../static/tabs/shouye/redCart.png"/>
                </div>
            </div>
        </div>
        <div class="footer">
            到底了~~
        </div>
    </div>
</template>

<script>
    import Toast from "../../../static/vant-weapp/dist/toast/toast";
export default {
    data () {
        return {
            time: 0,
            timeData: {},
			show: true,
            big: [],
            url: this.globalData.url,
            requestToken: '',
            openId: '',
            uid: '',
            isMobile: '',
            roll: [],
            recommend: [],
            seckill: [],
            specialty: [],
            popup: [],
            shareUid: '',
            chicken_img:'',
            specialty_img: '',
            newuser: false
        }
    },
    onLoad(e) {
        let _this = this
        if (e.shareUid) {
            _this.shareUid = e.shareUid
            wx.setStorageSync('shareUid', e.shareUid)
        }
        wx.login({
            success (res) {
                console.log(res)
                if (res.code) {
                    _this.$wxhttp.post({
                        'url': '/wechat/wxlogin',
                        'data':{
                            code:res.code
                        }
                    }).then((e) => {
                        _this.isMobile = e.data.isMobile
                        _this.openId = e.data.openId
                        _this.requestToken = e.data.token
                        _this.uid = e.data.uid
                        wx.setStorageSync('isMobile', e.data.isMobile)
                        wx.setStorageSync('openId', e.data.openId)
                        wx.setStorageSync('uid', e.data.uid)
                        wx.setStorageSync('request_token', e.data.token)
                        wx.setStorageSync('sessionKey', e.data.sessionKey)
                        _this.bigswiper()
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    },
    onShow () {
        let _this = this
        // _this.show = true
        _this.bigswiper()
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
        close:function() {
            this.show = false;
        },
        onChange5:function(e) {
            this.timeData = e.mp.detail
        },
        sign: function () {
          this.$wxhttp.post({
              'url': '/index/sign',
              'data': {}
          }).then((e) => {
              if (e.status == 'success') {
                  Toast.success(e.msg);
              } else {
                  Toast.fail(e.msg);
              }
          })
        },
        bigswiper:function () {
            this.$wxhttp.post({
                'url': "/index/config",
                'data': {}
            }).then((res) => {
                console.log(res)
                /* 首页大轮播图 */
                this.big = res.data.swiper
                /* 小轮播图 */
                this.roll = res.data.roll
                /* 秒杀 */
                this.seckill = res.data.skillmiao.data
                //特产
                this.specialty = res.data.xjtcp.data
                //推荐
                this.recommend = res.data.dztj.data
                //抢购时间
                if (res.data.secskill.skill_end > 0) {
                    this.time = res.data.secskill.skill_end * 1000
                } else {
                    this.timeData = {days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}
                }
                //判断新人
                this.newuser = res.data.isnewuser
                //弹窗内容
                this.popup = res.data.buy0
                this.chicken_img = this.url + res.data.shareImg.chicken_img
                wx.setStorageSync('chicken_img', this.chicken_img)
                this.specialty_img = this.url + res.data.shareImg.specialty_img
                wx.setStorageSync('specialty_img', this.specialty_img)
            })
        },
        toast:function(){
            Toast.fail('暂无优惠券');
        },
        // 添加购物车
        createdCart(item,type){
            this.$wxhttp.Carts(item,type)
        }

    }
}
</script>

<style scoped>
    /* 弹框 */
    .bgcbox {
        width: 561rpx;
        height: 965rpx;
        background: url("http://www.xianxiaoyemao.com/static/image/tkbgi.png")no-repeat;
        background-size: 100% 100%;
    }
    .zz >>> .van-popup {
        background-color: unset;
    }
    .zzbox {
        width: 468rpx;
        height: 180rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
        margin: 0 0 20rpx 26rpx;
    }
    .zzboximg {
        width: 120rpx;
        height: 120rpx;
        margin: 0 auto;
    }
    .zzboximg img {
        width: 100%;
        height: 100%;
    }
    .shopimg {
        width: 172rpx;
        height: 118rpx;
        display: inline-block;
        margin: 30rpx 0 0 20rpx;
        vertical-align: top;
    }
    .shopimg img {
        width: 100%;
        height: 100%;
    }
    .shopdetail {
        display: inline-block;
        width: 260rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 20rpx;
    }
    .shopdetail h4, .shopdetail h3, .shopdetail h2 {
        margin-left: 12rpx;

    }
    .shopdetail h1, .shopdetail h3, .shopdetail h2 {
        font-size: 24rpx;
        color: #000000;
    }
    .shopdetail h2 {
        font-size: 28rpx;

    }
    .shopdetail h3 {
        font-weight: 500;
        color: #EE0B0B;
    }
    .shopdetail h3 span {
        font-size: 36rpx;
    }
    .shopdetail h4 {
        font-size: 20rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, 0.3)
    }
    .close {
        width: 42rpx;
        height: 42rpx;
        padding: unset;
        background: url("http://www.xianxiaoyemao.com/static/image/close.png")no-repeat;
        background-size: 100% 100%;
        margin: 20rpx auto;
    }
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .headerHeight {
        height: 400rpx;
    }
    .headerbgc {
        width: 750rpx;
        height: 275rpx;
        background: linear-gradient(0deg, #FC661D 0%, #EA1010 100%);
        border-radius: 0 0 50% 50%;
    }
    .headerbgc .headerLeft {
        width: 52%;
        display: inline-block;
        color: #fff;
        vertical-align: top;
        margin: 20rpx 0 0 30rpx;
        font-size: 28rpx;
    }
    /* 搜索 */
    .headerbgc .headerRight {
        margin-top: 15rpx;
        display: inline-block;
        margin: 15rpx 30rpx 0;
        width: 91%;
        height: 50rpx;
        line-height: 50rpx;
        border: 1rpx solid #FFFFFF;
        border-radius: 25rpx;
        font-size: 24rpx;
        color: rgba(255, 255, 255, .7);
        position: relative;
        text-align: center;
    }
    .indexSearch {
        width: 26rpx;
        height: 26rpx;
        position: absolute;
        right: 18rpx;
        bottom: 19rpx;
    }
    .indexSearch img {
        width: 100%;
        height: 100%;
    }
    /* 轮播图 */
    .box_swiper swiper{
        width: 690rpx;
        height: 300rpx;
        border-radius: 5rpx;
        margin: 15rpx auto;
    }
    .box_swiper img {
        width: 100%;
        height: 100%;
    }
    .small_swiper swiper {
        width: 359rpx;
        height: 28rpx;
        background-color: rgba(1, 1, 1, .5);
        color: #fff;
        border-radius: 14rpx;
        margin-left: 30rpx;
        font-weight: 300;
    }
    .small_swiper .small_text {
        font-size: 20rpx;
        text-align: center;
        line-height: 28rpx;
    }
    .jiaomaji, .techan {
        width: 353rpx;
        height: 128rpx;
        display: inline-block;
    }
    .jiaomaji img, .techan img {
        width: 100%;
        height: 100%;
    }
    .img_nav {
        margin: 15rpx 0 0 30rpx;
        display: flex;
    }
    /* 签到 */
    .index_nav {
        width: 84%;
        margin: 0 auto;
        overflow: hidden;
    }
    .index_nav ul {
        display: flex;
    }
    .index_nav .index_box {
        width: 120rpx;
        height: 120rpx;
    }
    .index_nav ul li{
        text-align: center;
        padding: 0 19rpx;
    }
    .index_nav ul li img {
        width: 100%;
        height: 100%;
    }
    .index_nav ul li span {
        font-size: 22rpx;
        color: #000000;
    }

    /* 0元购 */
    .index_gou {
        width: 697rpx;
        height: 247rpx;
        margin: 49rpx auto 0rpx;
    }
    .index_gou img {
        width: 100%;
        height: 100%;
    }
    /* 限时秒杀 */
    .index_miaosha {
        width: 690rpx;
        height: 436rpx;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 40rpx auto 0;
    }
    .index_miaosha .index_miaoshamargin {
        padding: 17rpx 18rpx;
    }
    .index_miaosha .index_col1 {
        width: 255rpx;
        height: 42rpx;
    }
    .index_miaosha .index_col1 img {
        width: 100%;
    }
    .index_miaosha .index_col2 {
        font-size: 22rpx;
        text-align: center;
        line-height: 40rpx;
    }
    .item {
        display: inline-block;
        width: 60rpx;
        height: 50rpx;
        line-height: 50rpx;
        margin-right: 5rpx;
        color: #fff;
        font-size: 24rpx;
        text-align: center;
        background-color: #f00;
        border-radius: 2rpx;
    }
    .index_miaosha .index_col3 {
        text-align: right;
        font-size: 24rpx;
        color: #FF862D;
        line-height: 40rpx;
    }
    .miaosha_content {
        padding: 20rpx 15rpx;
    }
    .miaosha_content .index_content {
        width: 200rpx;
        display: inline-block;
        margin-right: 30rpx;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .miaosha_content .index_content:last-child {
        margin-right: 0;
    }
    .miaosha_content .contentImg {
        width: 200rpx;
        height: 194rpx;
        border-radius: 5rpx;
        position: relative;
    }
    .miaosha_content .contentImg img, .miaosha_content .contentImg .smallImg img {
        width: 100%;
        height: 100%;
    }
    .miaosha_content .contentImg .smallImg {
        width: 68rpx;
        height: 68rpx;
        position: absolute;
        left: 0;
        top: 0;
    }
    .miaosha_content .index_content h3 {
        font-size: 28rpx;
        color: rgba(0, 0, 0, .9);
    }
    .miaosha_content .index_content .afterprice {
        font-size: 20rpx;
        text-decoration: line-through;
        color: rgba(0, 0, 0, .3);
    }
    /* 公共部分 */
    .smallcart span {
        font-size: 36rpx;
        font-weight: 500;
        color: #EE0B0B;
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
    /* 拼团 */
    .index_pintuan {
        width: 639rpx;
        height: 177rpx;
        margin: 40rpx auto 35rpx
    }
    .index_pintuan img {
        width: 100%;
        height: 100%;
    }
    /* 店长推荐 */
    .index_shopAdmin {
        width: 660rpx;
        height: auto;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 0 auto;
        padding: 22rpx 15rpx;
    }
    /* 公共头 */
    .shopAdmintitle {
        height: 52rpx;
    }
    .shopAdmintitle h1 {
        width: 200rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #000000;
        display: inline-block;
    }
    .shopAdmintitle span {
        font-size: 24rpx;
        color: #FF862D;
        float: right;
        display: inline-block;

    }
    /* 公共头结束 */
    .proshop {
        margin-top: 30rpx;
        border-bottom: 1rpx solid #DCDCDC;
        position: relative;
    }
    .proshop:last-child {
        border: none;
    }
    .proshop .proshopimg {
        width: 196rpx;
        height: 189rpx;
        border-radius: 5rpx;
        display: inline-block;
        vertical-align: top;
        margin-bottom: 20rpx;
        position: relative;
    }
    .smallProshopImg {
        width: 120rpx;
        height: 77rpx;
        position: absolute;
        left: 0;
        top: 0;
    }
    .proshop .proshopimg img, .smallProshopImg img {
        width: 100%;
        height: 100%;
    }
    .proshoptitle {
        display: inline-block;
        margin-left: 26rpx;
        width: 410rpx;
    }
    .proshoptitle h2 {
        height: 40rpx;
        line-height: 50rpx;
        font-size: 30rpx;
        color: #000000;
    }
    .proshopzhaopai span {
       padding: 0rpx 15rpx;
        border: 1rpx solid rgba(229, 13, 13, .6);
        border-radius: 20rpx;
        font-size: 20rpx;
        text-align: center;
        color: rgba(234, 20, 20, .9);
        display: inline-block;
    }
    /* 新疆好货 */
    .xinjingshop {
        width: 660rpx;
        margin: 46rpx auto 20rpx;
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
    .xinjiangbox:nth-child(odd) {
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
    /* 邀请 */
    .invitation {
        width: 152rpx;
        height: 154rpx;
        border-radius: 50%;
        background-color: unset;
        padding: 0;
        position: fixed;
        right: 0;
        bottom: 30rpx;
        z-index: 1;
    }
    .invitation img {
        width: 100%;
        height: 100%;
    }
    /* 到底了*/
    .footer {
        text-align: center;
        font-size: 20rpx;
        color: rgba(0, 0, 0, .6);
        padding-bottom: 30rpx;
    }
</style>
