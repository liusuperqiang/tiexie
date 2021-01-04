<template>
    <div class="box">
        <div class="settle">
            <div class="people">
                <span>{{nickName.length}}</span>人
            </div>
            <div class="invited">已邀请</div>
        </div>
        <div class="inviteUser">
            已邀请用户
        </div>
        <div class="borBox"></div>
        <div class="myuser" v-if="nickName.length > 0">
            <div class="userevery" v-for="(item,index) in nickName" :key="index">
                <h3>{{item.nickname}}</h3>
                <span>{{item.createtime}}</span>
            </div>
        </div>

        <div class="my_invite" v-else>
            <p>空荡荡的，快去分享挣钱吧！！！</p>
            <button open-type='share'>去邀请好友</button>
        </div>
    </div>
</template>

<script>

export default {

    data () {
        return {
            nickName: ''
        }
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
    onShow(){
       this.record()
    },
    methods: {
        record:function() {
            this.$wxhttp.post({
                'url': '/personal/invite',
                'data': {}
            }).then((e) => {
                console.log(e)
                this.nickName = e.data
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
    .settle {
        width: 750rpx;
        height: 354rpx;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
    }
    .people, .invited {
        font-size: 24rpx;
        color: #FFFFFF;
        text-align: center;
        padding-top: 90rpx;
    }
    .people span {
        font-size: 72rpx;
    }
    .inviteUser {
        width: 245rpx;
        height: 43rpx;
        line-height: 43rpx;
        margin: 50rpx auto 0;
        background: #FF8E1F;
        text-align: center;
        font-size: 28rpx;
        color: #FFFFFF;
        border-top-left-radius: 100rpx;
        border-top-right-radius: 100rpx;
    }
    .borBox {
        width: 750rpx;
        height: 2px;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
    }
    .userevery {
        line-height: 86rpx;
        border-bottom: 1px solid #E5E5E5;
        font-size: 28rpx;
        color: #515151;
        margin: 0 30rpx;
        padding: 0 15rpx;
        width: 88%;
    }
    .userevery h3 {
        display: inline-block;
        width: 50%;
    }
    .userevery span {
        font-size: 24rpx;
        color: #999999;
        text-align: right;
        width: 50%;
        display: inline-block;
    }
    .my_invite p {
        font-size: 24rpx;
        color: #999999;
        margin: 35% 0 50rpx;
        text-align: center;
    }
    .my_invite button {
        padding: 0;
        width: 307rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 40rpx;
        font-size: 30rpx;
        color: #FFFFFF;
    }
</style>
