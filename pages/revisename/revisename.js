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
      if (obj.status == 'success') {
        //this.Global.pubsub.emit('genjin');
        this.Global.showOkMsg(obj.msg).then(obj => {
          wx.navigateBack();
        });
      } else {
        this.Global.showErrorMsg(obj.msg);
      }
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      voteTitle: e.detail.value
    })
  },
})