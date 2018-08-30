//获取应用实例
const app = getApp();

Page({
  data: {
    goods: []
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/getGoods',
      success: (res) => {
        this.setData({
          goods: res.data.data[app.globalData.goodsSortsChoice]
        });
      }
    })
  },
  toSort: function () {
    wx.switchTab({
      url: '../shopping/shopping'
    });
  },
  addInCart(e) {
    const good = this.data.goods[e.currentTarget.id];
    const cart = app.globalData.cartList;
    const flag = false;
    flag = cart.some((item) => {
      return item === good;
    });
    if (!flag) {
      cart.push(good);
      wx.showToast({
        title: '商品已加入购物车',
        icon: 'success',
        duration: 2000
      })
    } else {
      this.data.goods[e.currentTarget.id].count++;
    }
  }
})