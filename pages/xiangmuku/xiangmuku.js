const app = getApp();
Page({
  data: {
    list: [],
    id: null,
  },

  onLoad: function (options) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.getData();
  },
  onSearch: function (e) {
    var kw = e.detail;
    this.setData({
      kw: kw,
      list: '',
    });
    this.getData();
  },
  getData: function () {
    this.Api.xmlist({
      staffuid: app.globalData.wxUser.uid,
      user_type: 2,
      kw: this.data.kw ? this.data.kw.value : '',
      isShowCompanyNum: 1
    }).then(obj => {
      this.setData({
        list: obj.data.list,
      })
      console.log(obj.id)
    });
  },
  goxm: function(e) {
    var id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../qudao/qudao?id=' + id + "&title=" + title
    })
  }

})