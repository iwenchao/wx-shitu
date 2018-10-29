// pages/plant/plant.js
var app = getApp();
var api = require('../../utils/api.js');
var plantUrl = api.getPlantUrl();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户数据
        userInfo: {},
        backUserInfo: {},
        hasUserInfo: false,
        openId: "",
        nickName: "",
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        //识别数据
        info: "",
        icrName: "",
        score: "",
        baikeUrl: "",
        imageUrl: "",
        description: "",
        remark: ""

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let appUserInfo = app.globalData.userInfo;
        this.setData({
            userInfo: appUserInfo,
            hasUserInfo: true,
            openId: appUserInfo.openId,
            nickName: appUserInfo.nickName
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },


    upload: function () {
        console.log("点击上传文件");
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function (res) {
                that.setData({
                    img: res.tempFilePaths[0]
                }),
                    wx.showLoading({
                        title: "玩命识别中...",
                        mask: true
                    }),
                    wx.uploadFile({
                        url: plantUrl,
                        filePath: res.tempFilePaths[0],
                        name: "file",
                        header: {
                            'content-type': 'multipart/form-data'
                        },
                        formData: {
                            'openId': that.data.openId,
                            'nickName': that.data.nickName
                        },
                        success: function (res) {
                            wx.hideLoading();
                            let data = res.data;
                            let plantBean = JSON.parse(data);
                            if (plantBean.code == '0') {
                                that.setData({
                                    icrName: plantBean.icrName,
                                    score: plantBean.score,
                                    baikeUrl: plantBean.baikeUrl,
                                    imageUrl: plantBean.imageUrl,
                                    description: plantBean.description
                                })
                            } else if (plantBean.code == "1") {
                                that.setData({
                                    info: plantBean.msg
                                })
                            } else {
                                that.setData({
                                    info: "Sorry, 不能为所欲为了"
                                })
                            }

                        }
                    })

            },
            fail: function (res) {
                wx.hideLoading();
                if (res.errMsg == "chooseImage:fail cancel") {
                    that.setData({
                        info: "请先选取图片"
                    })
                } else {
                    that.setData({
                        info: "Sorry, 不能为所欲为了"
                    })
                }
            },

        })
    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: "植物识别小程序",
            path: '/pages/plant/plant',
            success: function (res) {
                if (res.errMsg == "shareAppMessage:ok") {
                    wx.showToast({
                        title: "分享成功",
                        icon: 'success',
                        duration: 500
                    })
                }
            },
            fail: function (res) {
                if (res.errMsg == "shareAppMessage:fail cancel") {
                    wx.showToast({
                        title: "分享取消",
                        icon: 'loading',
                        duration: 500
                    })
                }
            }
        }
    }
})