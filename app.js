//app.js
var api = require('./utils/api.js');
var oauthUrl = api.getOauthUrl();


App({
    //全局放置的对象
    data: {
        userInfo: {},
        userInfoBackup: {},//后台得到的微信用户信息
        hasUserInfo: false,
        openId: "",
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    //小程序启动后
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        //静默操作  获取用户信息，调用wx.login
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code;
                if (code != null) {
                    wx.getUserInfo({
                        success: function (result) {
                            console.log('user info result ===' + JSON.stringify(result));
                            wx.request({
                                url: oauthUrl,
                                method: 'post',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    encryptedData: result.encryptedData,
                                    iv: result.iv,
                                    code: code
                                },
                                success: function (res) {
                                    that.globalData.userInfo = res.data;
                                },
                                fail: function (res) {
                                    var res = "";
                                    that.globalData.userInfoBackup = res;
                                }

                            })
                        }
                    })
                }
            }
        })

        if (that.globalData.userInfo) {
            userInfo = app.globalData.userInfo;
            hasUserInfo = true;
        } else if (this.data.canIUse) {
            that.userInfoReadyCallback = res => {
                that.globalData.userInfo = res.userInfo;
                hasUserInfo = true;
            }
        } else {
            wx.getUserInfo({
                success: res => {
                    that.globalData.userInfo = res.userInfo;
                    hasUserInfo = true;
                }
            })
        }

        // // 获取用户信息
        // wx.getSetting({
        //   success: res => {
        //     if (res.authSetting['scope.userInfo']) {
        //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //       wx.getUserInfo({
        //         success: res => {
        //           // 可以将 res 发送给后台解码出 unionId
        //           this.globalData.userInfo = res.userInfo

        //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //           // 所以此处加入 callback 以防止这种情况
        //           if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //           }
        //         }
        //       })
        //     }
        //   }
        // })

    },
    getUserInfo: function (callback) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof callback == 'function' && callback(this.globalData.userInfo);
        } else {
            //调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            console.log("app.js ===" + res.userInfo);
                            that.globalData.userInfo = res.userInfo;
                            typeof callback == 'function' && callback(that.globalData.userInfo);
                        }
                    })
                }
            })
        }
    },
    globalData: {
        //登录用户信息
        userInfo: null,
        userInfoBackup: null
    }
})