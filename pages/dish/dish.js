// pages/dish/dish.js
const api = require('../../utils/api.js');
const dishUrl = api.getDishUrl();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户数据
        userInfo:{},
        backUserInfo:{},
        hasUserInfo:false,
        openId:"",
        nickName:"",

        //识别数据
        imageUrl: "",
        errInfo:"",
        dishName:"",
        calore:"",
        probability:"",
        description:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let gUserInfo = app.globalData.userInfo;
        this.setData({
            userInfo:gUserInfo,
            hasUserInfo:true,
            openId:gUserInfo.openId,
            nickName:gUserInfo.nickName
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
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: ["album", "camara"],
            success: function (res) {
                that.setData({
                    imageUrl: res.tempFilePaths[0],
                }),
                    wx.showLoading({
                        mask: true,
                        title: "玩命识别中..."
                    }),
                    wx.uploadFile({
                        url: dishUrl,
                        filePath: res.tempFilePaths[0],
                        name: "file",
                        header: {
                            'content-type': 'multipart/form-data',
                        },
                        formData: {
                            'openId': that.data.openId,
                            'nickName': that.data.nickName
                        },
                        success: function (res) {
                            wx.hideLoading();
                            let jsonData = res.data;
                            let result = JSON.parse(jsonData);
                            if (result.code == "0") {
                                that.setData({
                                    dishName:result.dishName,
                                    calorie:result.calorie,
                                    probability:result.probability,
                                    description:result.description
                                })
                            } else if (result.code == "1") {
                                that.setData({
                                    info: "Sorry "+result.msg
                                })
                            }else{
                                that.setData({
                                    info: "Sorry, 不能为所欲为了"
                                })
                            }

                        }
                    })


            },
            fail: function (res) {
                wx.hideLoading();
                wx.showModel({
                    title:"温馨提示",
                    content:"Sorry,不能为所欲为了",
                    showCancel:false
                })
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

    }
})