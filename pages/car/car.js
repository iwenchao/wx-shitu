// pages/car/car.js
const api = require('../../utils/api.js');
const carUrl = api.getCarUrl();
const app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户数据
        userInfo: {},
        hasUserInfo: false,
        //识别数据
        imageUrl:"",
        carName: "",
        carYear: "",
        carColor: "",
        carProbability: "",
        description: "",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let gUserInfo = app.globalData.userInfo;
        this.setData({
            userInfo: gUserInfo,
            hasUserInfo: true,
            openId: gUserInfo.openId,
            nickName: gUserInfo.nickName
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
                        url: carUrl,
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
                            console.log(data);
                            let carBean = JSON.parse(data);
                            if (carBean.code == '0') {
                                that.setData({
                                    carName: carBean.icrName,
                                    carYear:carBean.year,
                                    carColor:carBean.colorResult,
                                    carProbability: carBean.score,
                                    baikeUrl: carBean.baikeUrl,
                                    imageUrl: carBean.imageUrl,
                                    description: carBean.description
                                })
                            } else if (carBean.code == "1") {
                                that.setData({
                                    info: carBean.msg
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

    }
})