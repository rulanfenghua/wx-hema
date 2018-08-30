//index.js
//获取应用实例
const app = getApp();

/* Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
 */
Page({
  data: {
    background: [
      'https://gw.alicdn.com/tfs/TB1AoIXeLDH8KJjy1XcXXcpdXXa-750-291.jpg_Q90.jpg',
      'https://img.alicdn.com/imgextra/i1/771510470/TB21SB0fIbI8KJjy1zdXXbe1VXa-771510470.jpg_Q90.jpg',
      'https://img.alicdn.com/imgextra/i2/745949152/TB2ATrSexPI8KJjSspfXXcCFXXa_!!745949152.jpg_Q90.jpg',
      'https://img.alicdn.com/tfs/TB1OYB8elfH8KJjy1XbXXbLdXXa-750-291.jpg_Q90.jpg',
      'https://img.alicdn.com/imgextra/i2/745949152/TB2ATrSexPI8KJjSspfXXcCFXXa_!!745949152.jpg_Q90.jpg'
    ],
    scrollXList: [],
    goodsSorts: []
  },
  scan() {
    wx.scanCode({
      success: (res) => {
        console.log(res);
      }
    })
  },
  chooseAddr() {
    wx.navigateTo({
      url:''
    })
  },
  linkToList(e) {
    app.globalData.goodsSortsChoice= e.currentTarget.id;
    wx.navigateTo({
      url: ''
    });
  },
  addInCart(e) {
    console.log(e);
    const good= this.data.scrollXList[e.currentTarget.id];
    const cart = app.globalData.cartList;
    var flag = false;
    flag = cart.some((item) => {
      return item === good;
    })
    console.log(flag);
    if (!flag) {
      cart.push(good);
      wx.showToast({
        title: '商品已加入购物车',
        icon: 'success',
        duration: 2000
      })
    } else {
      this.data.scrollXList[e.currentTarget.id].count++;
    }
  },
  onLoad() {
    wx.request({
      url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/getIndexScrollX",
      success: (res) => {
        // console.log(res.data);
        this.setData({
          scrollXList: res.data.data.goods
        })
        // console.log(res.data.data.goods);
      }
    })
    wx.request({
      url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/index_goodsSort",
      success: (res) => {
        // console.log(res.data.data);
        this.setData({
          goodsSorts: res.data.data.sorts
        })
      }
    })
  },
})