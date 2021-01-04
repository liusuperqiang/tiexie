<template>
    <div class="box">
        <div class="boxinvite">
            <div class="settle">
                <img :src="img" />
            </div>
            <p>已为您生成专属二维码，快去分享挣钱吧！！！</p>
            <button open-type='share'>去邀请好友</button>
            <div class="ctrlS" @click="preser">保存到手机</div>
        </div>
        <div class="explain">
            <h1>邀请说明：</h1>
            <p>1. 转发二维码给好友，好友扫描二维码即可授权进入小程序；</p>
            <p>2. 好友授权登录成功，即邀请成功；</p>
            <p>3.邀请成功，即可获得奖励，会自动计入您的账户中；</p>
            <p>4.获得的奖励可用于购买商品，最高抵扣商品的 70% 哦~</p>
        </div>
    </div>
</template>

<script>

export default {

    data () {
        return {
            img: ''
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
       this.invitation()
    },
    methods: {
        preser:function(){
            let aa = wx.getFileSystemManager();
            aa.writeFile({
                filePath: wx.env.USER_DATA_PATH + '/qrcode.png',
                data: this.img.slice(22),
                encoding:'base64',
                success: res => {
                    wx.saveImageToPhotosAlbum({
                        filePath: wx.env.USER_DATA_PATH + '/qrcode.png',
                        success: function (res) {
                            wx.showToast({
                                title: '保存成功',
                            })
                        },
                        fail: function (err) {
                            console.log(err)
                        }
                    })
                    console.log(res)
                },
                fail: err => {
                    console.log(err)
                }
            })
        },
        invitation:function() {
            this.$wxhttp.post({
                'url': '/personal/invitecode',
                'data': {}
            }).then((e) => {
                console.log(e)
                this.img = e.data.qrcode
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
        width: 338rpx;
        height: 338rpx;
        background: #BFBFBF;
        margin: 50rpx auto 37rpx;
    }
    .settle img {
        width: 100%;
        height: 100%;
    }
    .boxinvite p {
        font-size: 24rpx;
        color: #515151;
        text-align: center;
    }
    .boxinvite button, .ctrlS {
        width: 608rpx;
        height: 80rpx;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 40rpx;
        padding: 0;
        font-size: 30rpx;
        color: #FFFFFF;
        line-height: 80rpx;
        margin: 40rpx auto 0;
        text-align: center;
    }
    .ctrlS {
        background: #FFC170;
    }
    .explain {
        width: 690rpx;
        height: 283rpx;
        border: 2rpx solid #EB5E1F;
        border-radius: 5rpx;
        margin: 100rpx auto;
    }
    .explain h1 {
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
        margin: 30rpx 20rpx;
    }
    .explain p {
        width: 670rpx;
        font-size: 24rpx;
        color: #515151;
        line-height: 40rpx;
        margin-left: 20rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
