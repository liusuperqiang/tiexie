<script>
export default {
    /*onLaunch: function () {
        /!*wx.checkSession({
            success () {
                console.log(1111)
                //session_key 未过期，并且在本生命周期一直有效
            },
            fail () {
                // session_key 已经失效，需要重新执行登录流程
            }
        })*!/
        let _this = this
        wx.login({
            success (res) {
                console.log(res)
                if (res.code) {
                    _this.$wxhttp.post({
                        'url': '/api/wechat/wxlogin',
                        'data':{
                            code:res.code
                        }
                    }).then((e) => {
                        console.log(e.data.token)
                        wx.setStorageSync('isMobile', e.data.isMobile)
                        wx.setStorageSync('openId', e.data.openId)
                        wx.setStorageSync('request_token', e.data.token)
                        wx.setStorageSync('sessionKey', e.data.sessionKey)
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }*/
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
