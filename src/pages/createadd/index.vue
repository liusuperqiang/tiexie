<template>
    <div class="box">
        <div class="create">
            <div class="borBox">
                收&nbsp; 货 人<input placeholder="收货人姓名" type="text" v-model="name" />
            </div>
            <div class="borBox">
                手机号码<input placeholder="收货人手机号" type="number" v-model="mobile"/>
            </div>
            <div class="borBox" @click="borBox">
                所在地区
                    <input v-model="areavalue" placeholder="请选择地址" type="text" class="inputBox"/>
                <div>></div>
            </div>

            <div class="borBox">
                详细地址<input placeholder="收货人地址" type="text" v-model="detail"/>
            </div>
        </div>
        <button class="addadd" @click="add">
            保存
        </button>
        <van-toast id="van-toast"/>
        <div class="areabox">
            <van-popup
              :show="show"
              position="bottom"
              custom-style="height: 60%;"
              @close="onClose"
            >
            <van-area :area-list="areaList" @confirm="getArea" @cancel="colseArea" />
            </van-popup>
        </div>
    </div>
</template>

<script>
import area from '../../utils/area.js'
import Toast from "../../../static/vant-weapp/dist/toast/toast";
export default {

    data () {
        return {
            show: false,
            areaList: area,
            areavalue: '',
            name: '',
            mobile: '',
            detail: ''
        }
    },
    methods: {
        borBox:function () {
            this.show = true
        },
        getArea: function(val) {
            let j = val.mp.detail.values
            console.log(val.mp.detail.values)
            let v = '';
            for(let i = 0; i< j.length; i++) {
                v += j[i].name
            }
            this.areavalue = v
            this.show = false
        },
        colseArea: function() {
            this.show = false
        },
        add: function () {
            let _this = this
            if (_this.name == '') {
                Toast('请输入姓名')
                return
            }
            if (_this.mobile == '' || !(/^1[3456789]\d{9}$/.test(this.mobile))) {
                Toast('请输入正确的手机号')
                return
            }
            if (_this.areavalue == '') {
                Toast('请选择地区')
                return
            }
            if (_this.detail == '') {
                Toast('请输入详细地址')
                return
            }
            let requestToken = ''
            wx.getStorage({
                key: 'request_token',
                success (res) {
                    requestToken = res.data
                }
            })
            wx.getStorage({
                key: 'uid',
                success (res) {
                    _this.$wxhttp.post({
                        'url': '/address/addresssave',
                        'data': {
                            'username': _this.name,
                            'phone': _this.mobile,
                            'disarea': _this.areavalue,
                            'address': _this.detail
                        }
                    }).then((e) => {
                        if (e.status == 'success') {
                            Toast({
                                type: 'success',
                                message: e.msg,
                                onClose: () => {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                },
                            });
                        } else {
                            Toast.fail(e.msg);
                        }
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
    .create {
        margin: 20rpx 30rpx;
    }
    .borBox {
        border-bottom: 1rpx solid #eee;
        font-size: 28rpx;
        color: #333333;
        padding: 20rpx 0 20rpx 20rpx;
    }
    .borBox input {
        width: 75%;
        height: 50rpx;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30rpx;
    }
    .inputBox {
        pointer-events: none;
    }
    .borBox div {
        float: right;
        font-size: 35rpx;
        line-height: 1;
    }
    .addadd {
        width: 608rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border-radius: 40rpx;
        font-size: 30rpx;
        color: #FFFFFF;
        margin: 10rpx auto;
    }
</style>
