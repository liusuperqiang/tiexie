<template>
    <div class="box">
        <div class="logo">
			<img src="../../../static/tabs/shouye/logo.png" />
		</div>
        <button v-if="type == 1" class="login" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权登录</button>
        <button v-if="type == 2" class="login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信授权获取手机号</button>
        <div class="footer"> 社 | 区 | 电 | 商 | 小 | 达 | 人 </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            type: 1,
            requestToken: '',
            uid: '',
            sessionKey: '',
            shareUid: '',

        }
    },
    onShow: function () {
        let _this = this
        wx.getStorage({
            key: 'sessionKey',
            success (res) {
                _this.sessionKey = res.data
            }
        })
    },
	methods: {
		getPhoneNumber(e){
            this.$wxhttp.post({
                'url': '/wechat/getwechatdata',
                'data': {
                    'iv': e.mp.detail.iv,
                    'encrypted_data':e.mp.detail.encryptedData,
                    'session_key': this.sessionKey,
                    'shareUid': wx.getStorageSync('shareUid')
                }
            }).then((e) => {
                wx.reLaunch({
                    url: '/pages/index/main'
                })
            })
		},
        getUserInfo() {
		    let _this = this
            wx.getUserInfo({
                success: function(res) {
                    console.log(res.userInfo)
                    _this.$wxhttp.post({
                        'url': '/wechat/addUserInfo',
                        'data': {
                            'nickname': res.userInfo.nickName,
                            'avatar': res.userInfo.avatarUrl
                        }
                    }).then((e) => {
                        _this.type = 2
                    })
                }
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
	.logo {
		width: 482rpx;
		height: 310rpx;
		margin: 100rpx auto 200rpx;
	}
    .logo img {
		width: 100%;
		height: 100%;
	}
	.login {
		width: 400rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
		border-radius: 50rpx;
		margin: 100rpx auto 350rpx;
		font-size: 36rpx;
		color: #FFFFFF;
	}
	.footer {
		width: 43%;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: rgba(0, 0, 0, .5);
		margin: 0rpx auto;
	}
</style>
