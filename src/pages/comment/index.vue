<template>
    <div class="box">
        <div class="comment">
            <div class="comUpload">
                <van-uploader :file-list="fileList" :deletable="deletable" max-count="3" @afterRead="afterRead" @delete="ondelete"/>
            </div>
            <div class="comstar">
                <div class="comrate">综合评分</div>
                <van-rate :value="value" @change="onChange" />
            </div>
            <textarea  v-model="msg" placeholder="亲，您对这个商品满意吗？您的评价会帮助我们选择更好的商品哦~"></textarea>
        </div>
        <div class="addadd" @click="comment(orderid)">
            提交评价
        </div>
    </div>
</template>

<script>

export default {

    data () {
        return {
            value: 3,
            deletable: true,
            url: this.globalData.url,
            fileList: [],
            orderid: [],
            msg: ''
        }
    },
    onLoad(e) {
        this.orderid = e.id
        console.log(111)
        console.log(e)
    },
    methods: {
        comment:function(id){
            let url = ''
            url += this.fileList.map(val => {
               return val.url
            })
            this.$wxhttp.post({
                'url': '/order/evaluation',
                'data': {
                    pid: id,
                    images: url,
                    socre: this.value,
                    comment: this.msg
                }
            }).then((e) => {
                if (e.status == 'success') {
                    wx.showToast({
                        title: e.msg,
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    wx.showToast({
                        title: e.msg,
                        icon: 'fail',
                        duration: 2000
                    })
                }
            })
        },
        onChange(e) {
            this.value = e.mp.detail
        },
        afterRead(e) {
            let _this = this
            let file = {
                    url: e.mp.detail.file.thumb
            }
            wx.uploadFile({
              url: _this.url + '/ajax/ajaxupload?action=pjtu', // 仅为示例，非真实的接口地址
              filePath: file.url,
              name: 'pjtuimg',
              formData: {
                  access_token: wx.getStorageSync('request_token'),
                  uid: wx.getStorageSync('uid')
              },
              success(res) {
                  let e = JSON.parse(res.data)
                // 上传完成需要更新 fileList
                  let image = {
                      url: _this.url + e.data.url
                  }
                  _this.fileList.push(image);
              },
            });
        },
        ondelete (e) {
            let index = e.mp.detail.file.index
            this.fileList.splice(index,1)
        }
    }
}
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .comment {
        width: 690rpx;
        height: 688rpx;
        background: #Fff;
        box-shadow: 4rpx 4rpx 10rpx 0rpx rgba(207, 207, 207, 0.53);
        border-radius: 5rpx;
        margin: 0 auto;
    }
    .comUpload {
        padding-top: 40rpx;
        margin: 0 20rpx;
    }
    .comUpload >>> .van-uploader__preview-image, .comUpload >>> .van-uploader__upload {
        width: 200rpx!important;
        height: 200rpx!important;
    }
    /* 评分 */
    .comstar {
        margin: 20rpx;
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
    textarea {
        width: 630rpx;
        height: 280rpx;
        border: 1rpx solid #eee;
        border-radius: 2rpx;
        margin: 20rpx;
        padding: 10rpx;
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
        position: fixed;
        bottom: 10rpx;
        left: calc(50% - 304rpx);
    }
</style>
