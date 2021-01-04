<template>
    <div class="box">
        <div class="addBox" v-for="(item, index) in addressArr" :key="index">
            <div style="float: left;">
                <van-radio-group :value="radio" @change="onChange">
                    <van-radio :name="item.id" icon-size="26rpx" @click="onClick">
                        <div class="addradio">
                            <div class="addsmallBox">
                                <div class="userphone">
                                    <div class="user">{{item.username}}</div>
                                    <div class="phone">{{item.phone}}</div>
                                </div>
                                <p>{{item.disarea}}</p>
                                <p class="addresadd">{{item.address}}</p>
                            </div>
                        </div>
                    </van-radio>
                </van-radio-group>
            </div>
            <div class="editAdd">
                <navigator :url="'/pages/editadd/main?id=' + item.id">
                    <div>编辑</div>
                </navigator>
                <div @click="del(item.id)">删除</div>
                <van-dialog id="van-dialog" />
            </div>
        </div>
        <van-toast id="van-toast"/>
        <navigator url="/pages/createadd/main">
            <div class="addadd">
                添加新地址
            </div>
        </navigator>
    </div>
</template>

<script>
    import Toast from "../../../static/vant-weapp/dist/toast/toast";
    import Dialog from '../../../static/vant-weapp/dist/dialog/dialog';
export default {
    data () {
        return {
            radio: 1,
            requestToken: '',
            uid: '',
            addressArr: []
        }
    },
    onShow: function () {
        let _this = this
        _this.common()
    },
    methods: {
        onChange:function (e) {
            let _this = this
            _this.radio = e.mp.detail
            _this.$wxhttp.post({
                'url': '/address/addressisdeful',
                'data': {
                    'id': _this.radio
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
                        }
                    })
                }
            })
        },
        del: function (id) {
            Dialog.confirm({
                message: '你确定要删除该地址吗',
            })
              .then(() => {
                let _this = this
                _this.$wxhttp.post({
                    'url': '/address/addressdel',
                    'data': {
                        'id': id
                    }
                }).then((e) => {

                    if (e.status == 'success') {
                        wx.showToast({
                            title: e.msg,
                            icon: 'success',
                            duration: 2000,
                        })
                        _this.common()
                    }
                })
              })
              .catch(() => {
                // on cancel
              });

        },
        common: function () {
            let _this = this
            _this.$wxhttp.post({
                'url': '/address/addresslist',
                'data': {}
            }).then((e) => {
                _this.addressArr = e.data.data
                _this.radio = e.data.is_defult

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
    .addBox {
        margin: 20rpx 40rpx;
        height: 155rpx;
        border-bottom: 2rpx solid #eee;

    }
    .addBox >>> .van-radio__icon-wrap {
        margin-top: -50rpx;
    }
    .userphone {
        display: flex;
    }
    .user {
        font-size: 28rpx;
        color: #333333;
    }
    .phone {
        font-size: 22rpx;
        color: #666666;
        margin-left: 20rpx;
    }
    .addradio {
        margin-top: 20rpx;
        width: 540rpx;
        margin-top: 20rpx;
    }
    .editAdd {
        font-size: 24rpx;
        color: #999999;
        border-left: 2rpx solid #eee;
        padding-left: 20rpx;
        margin-top: 15rpx;
        width: 60rpx;
        float: right;
        line-height: 50rpx;
    }
    .editAdd div {
        margin-top: 10rpx;
    }
    .addsmallBox p {
        font-size: 26rpx;
        color: #515151;
        padding-right: 20rpx;
    }
    .addresadd {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
