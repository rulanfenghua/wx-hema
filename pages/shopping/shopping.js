//获取应用实例
const app = getApp();

Page({
  data: {
    goodsList: [],
    sum: 0,
    allStatus: 'circle'
  },
  onload() {
    const cartList = app.globalData.cartList;
    cartList.map(item => {
      item.type = 'success';
    });
    this.setData({
      goodsList: cartList
    });
    this.data.goodsList.map(item => {
      item.type = 'success';
    });
    this.sumMoney();
    this.allSelected();
  },
  addCount(e) {
    const _this= this;
    const goodId = e.currentTarget.id;
    this.data.goodsList[goodId]++;
    this.setData({
      goodsList: _this.data.goodsList
    });
    this.sumMoney();
  },
  reduceCount() {
    const _this= this;
    const goodId = e.currentTarget.id;
    if (_this.data.goodsList[goodId].count <=1) {
      _this.data.goodsList[goodId].count= 1;
      wx.showModal({
        title: '数量小于1',
        content: '不允许操作',
        duration: 2000
      });
    }
    else {
      _this.data.goodsList[goodId].count--;
    }
    this.setData({
      goodsList: _this.data.goodsList
    })
    this.sumMoney();
  },
  sumMoney: function () {
    var count = 0;
    const goods = this.data.goodsList;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].type === 'success') {
        count += goods[i].count * goods[i].price;
      }
    }
    this.setData({
      sum: count.toFixed(2)
    })
  },
  selectGoods: function (e) {
    const selected = this.data.goodsList[e.currentTarget.id];
    if (selected.type === 'success') {
      selected.type = 'circle';
    } else {
      selected.type = 'success';
    }
    this.setData({
      goodsList: this.data.goodsList
    })
    this.allSelected();
    this.sumMoney();
  },
  allSelected: function () {
    const goods = this.data.goodsList;
    var symbol = goods.some(good => {
      return good.type === 'circle'
    })
    if (symbol) {
      this.data.allStatus = 'circle'
    } else {
      this.data.allStatus = 'success'
    }
    this.setData({
      allStatus: this.data.allStatus
    })
  },
  selOrUnsel: function () {
    const status = this.data.allStatus;
    const goods = this.data.goodsList;
    if (status === 'success') {
      this.data.allStatus = 'circle';
      goods.map(good => {
        good.type = 'circle';
      })
    } else {
      this.data.allStatus = 'success';
      goods.map(good => {
        good.type = 'success';
      })
    }
    this.setData({
      goodsList: this.data.goodsList
    })
    this.setData({
      allStatus: this.data.allStatus
    })
    this.sumMoney();
  },
  delGoods: function () {
    const goods = this.data.goodsList;
    const cart = app.globalData.cartList;
    const selGoods = goods.filter(good => good.type === 'success');
    wx.showModal({
      title: '确定要删除所选商品？',
      success: (res) => {
        if (res.confirm) {
          selGoods.map(sel => {
            const index = goods.indexOf(sel);
            goods.splice(index, 1);
            cart.splice(index, 1);
          })
          this.sumMoney();
          this.setData({
            goodsList: this.data.goodsList
          })
        }
      }
    })
    this.sumMoney();
  },
  toOrder() {
    wx.navigateTo({
      url: ''
    });
  },
  onReady() {
    this.setData({
      goodsList: app.globalData.cartList
    });
    this.sumMoney;
    this.data.goodsList.map(item => {
      item.type= 'success';
    });
  },
  onShow: function () {
    this.setData({
      goodsList: app.globalData.cartList
    });
    this.sumMoney();
    this.data.goodsList.map(item => {
      item.type = 'success';
    });
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      goodsList: app.globalData.cartList
    });
    this.sumMoney();
    this.data.goodsList.map(item => {
      item.type = 'success';
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      goodsList: app.globalData.cartList
    });
    this.sumMoney();
    this.data.goodsList.map(item => {
      item.type = 'success';
    });
  }
})