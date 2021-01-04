<template>
    <div class="box">
        <div class="commentAll">
            <van-tabs active="a">
                <van-tab :title="total" name="a">
                    <div class="comBigbox">
                        <div class="comBox" v-for="(item, index) in comment" :key="index">
                            <div class="commtop">
                                <div class="comuser">
                                    <img :src="item.avatar" />
                                </div>
                                <div class="usertitle">
                                    {{item.nickname}}
                                </div>
                            </div>
                            <div class="comstar">
                                <div class="comrate">综合评分</div>
                                <van-rate :value="item.socre" @change="onChange" />
                            </div>
                            <p>{{item.comment}}</p>
                            <div class="comImg">
                                <div v-for="(item2, index2) in item.images" :key="index2">
                                    <img :src="item2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="comFooter">到底了~~</p>
                </van-tab>
                <van-tab title="有图" name="b">
                    <div class="comBigbox">
                        <div class="comBox" v-for="(item, index) in comment" :key="index">
                            <div class="commtop">
                                <div class="comuser">
                                    <img :src="item.avatar" />
                                </div>
                                <div class="usertitle">
                                    {{item.nickname}}
                                </div>
                            </div>
                            <div class="comstar">
                                <div class="comrate">综合评分</div>
                                <van-rate :value="item.socre" @change="onChange" />
                            </div>
                            <p>{{item.comment}}</p>
                            <div class="comImg">
                                <div v-for="(item2, index2) in item.images" :key="index2">
                                    <img :src="item2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="comFooter">到底了~~</p>
                </van-tab>
            </van-tabs>
        </div>
        <div class="detailBtn">
            <div><img src="../../../static/tabs/shouye/qugouwu@2x.png"/></div>
            <div class="gocart" @click="gocart"><img src="../../../static/tabs/shouye/lijigoumai@2x.png"/></div>
        </div>
    </div>
</template>

<script>

export default {

    data () {
        return {
            value: 3,
            url: this.globalData.url,
            id: '',
            comment: '',
            total: '全部(0条)'
        }
    },
    onLoad: function (e) {
        let _this = this
        if (e.id) {
            _this.id = e.id
        }
    },
    onShow () {
        let _this = this
        _this.$wxhttp.post({
            'url': '/product/productevaluation',
            'data': {
                'id': _this.id
            }
        }).then((e) => {
            e.data.forEach((item,index) => {
                item.images = item.images.split(',')
            })
            _this.comment = e.data
            _this.total = '全部(' + e.data.length + '条)'
        })
    },
    methods: {
        onChange(e) {
            this.value = e.mp.detail
        },

    }
}
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .commentAll {
        margin: 0 30rpx;
    }
    /* 选项卡 */
    .commentAll >>> .van-tab {
        line-height: 70rpx;
        font-size: 26rpx;
    }
    .commentAll >>> .van-tabs__line {
        background-color: unset;
    }
    .commentAll >>> .van-tab--active {
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 10rpx;
        color: #fff;
    }
    .commentAll >>> .van-tabs__nav {
        background: #FFE7DB;
        border-radius: 10rpx;
        margin: 0 auto;
    }
    /* 内容 */
    .comBox {
        border-bottom: 5rpx solid #eee;
    }
    .comBox:last-child {
        border-bottom: none;
    }
    .commtop {
        display: flex;
        margin-top: 30rpx;
    }
    .comuser {
        width: 57rpx;
        height: 57rpx;
    }
    .comuser img {
        width: 100%;
        height: 100%;
    }
    .usertitle {
        font-size: 28rpx;
        color: #333333;
        margin: 10rpx;
    }
    /* 评分 */
    .comstar {
        margin-top: 20rpx;
        height: 50rpx;
    }
    .comrate {
        height: 40rpx;
        line-height: 42rpx;
        font-size: 24rpx;
        color: #333333;
        float: left;
    }
    .comstar >>> .van-rate {
        float: left;
        margin-left: 20rpx;
    }
    /* 评价内容 */
    .comBox p {
        font-size: 28rpx;
        color: #515151;
    }
    /* 评价图片 */
    .comImg {
        /* text-align: center; */
    }
    .comImg div{
        display: inline-block;
        width: 200rpx;
        height: 200rpx;
        margin: 25rpx 25rpx 25rpx 0;
    }
    .comImg div:last-child {
        margin-right: 0;
    }
    .comImg div img {
        width: 100%;
        height: 100%;
    }
    .comFooter {
        text-align: center;
        margin: 20rpx 0 90rpx;
        font-size: 22rpx;
        color: #515151;
    }
    /* 底部按钮 */
    .detailPt {
        width: 608rpx;
        height: 80rpx;
    }
    .detailBtn div img, .detailPt img {
        width: 100%;
        height: 100%;
    }
    .detailBtn {
        position: fixed;
        bottom: -8rpx;
    }
    .detailBtn div {
        width: 375rpx;
        height: 80rpx;
        display: inline-block;
    }
</style>
