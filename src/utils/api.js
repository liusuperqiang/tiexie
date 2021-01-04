// let host = 'http://xxptest.xianxiaoyemao.com/api'
// let host = 'https://mxxp.xianxiaoyemao.com'
import config from "./config"
let host = config.baseUrl
function request(url, method, data, header = {}) {
    wx.showLoading({
        title:'正在加载中....'
    })

    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                wx.hideLoading();
                resolve(res.data)
            },
            fail: function (res) {
                wx.hideLoading();
                reject(res);
            },
            complete: function (res) {
                wx.hideLoading();
            }
        })
    })
}

//get请求
function get(obj) {
    return request(obj.url, 'GET', obj.data)
}

//post请求
function post(obj) {
    obj.data.access_token = wx.getStorageSync('request_token')
    obj.data.uid = wx.getStorageSync('uid')
    return request(obj.url, 'POST', obj.data)
}
// 分享
// function beat(res,url) {
//     if (res.from === 'button') {
//         console.log("来自页面内转发按钮")
//     }
//     else {
//         console.log("来自右上角转发菜单")
//     }
//     return {
//         title: '小香铺',
//         path: '/pages/index/main?shareUid=' + wx.getStorageSync('uid'),
//         imageUrl: url,
//         success: (res) => {
//             console.log("转发成功", res)
//         },
//         fail: (res) => {
//             console.log("转发失败", res)
//         }
//     }
// }

//添加购物车
function Carts(item,type){
	post({
		'url': '/cartitem/cartsave',
		'data': {
            'product_id': item.id,
            'type':type,
			'skuid': item.skuid,
			'quantity': item.quantity,
			'price': item.price,
			'specvalue': item.specvalue
		}
	}).then((e) => {
		console.log(e)
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
			});
		}
	})
}
export default {
    request,
    get,
    post,
	Carts,
    // beat
}
