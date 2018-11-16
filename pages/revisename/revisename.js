// pages/revisename/revisename.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voteTitle:null,
  },

  submit: function (e) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Api.revisename({
      uid: app.globalData.wxUser.uid,
      name: this.data.voteTitle,
      type: 1
    }).then(obj => {
      wx.showToast({
        title: obj.msg,
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      console.log(obj.msg)
    });
  },
  voteTitle: function (e) {
    this.data.voteTitle = e.detail.value;
    console.log(this.data.voteTitle)
  },
})