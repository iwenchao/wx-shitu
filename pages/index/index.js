//index.js
//获取应用实例
const app = getApp();


Page({
  data: {
    motto: '你好 小马哥',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    routers:[
      {
        id:'0',
        name:"菜品识别",
        url:'../dish/dish',
        icon:'../../image/dishNine.png'
      },
      {
        id: '1',
        name: "车型识别",
        url: '../car/car',
        icon: '../../image/carNine.png'
      },
      {
        id: '2',
        name: "植物识别",
        url: '../plant/plant',
        icon: '../../image/plantNine.png'
      },
      {
        id: '3',
        name: "花卉识别",
        url: '../flower/flower',
        icon: '../../image/flower.png'
      },
      {
        id: '4',
        name: "大头贴",
        url: '../faceticker/faceticker',
        icon: '../../image/facesticker.png'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../identity/identifyface'
    })
  },
 
 //跳转到识别功能的具体页面
  gotoPage:function(event){
    console.info(event.currentTarget.id);
    let route = event.currentTarget.id;
    switch(route){
        case 0:
          wx.navigateTo({
            url: '/page/dish/dish',
          });
        break;
        case 1:
        wx.navigateTo({
          url: '/page/dish/dish',
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/page/dish/dish',
        });
        break;
      case 3:
        wx.navigateTo({
          url: '/page/dish/dish',
        });
        break;
      case 4:
        wx.navigateTo({
          url: '/page/dish/dish',
        });
        break;
      default:
        wx.showModal({
          title: '温馨提示',
          content: '功能暂未开放，以后可能也不会开放',
          showCancel:false,
          confirmText:'知道了',
        })
        break;
    }


  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
