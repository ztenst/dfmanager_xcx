const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpwd:null,
    newpwd:null
  },
  voteTitle: function (e) {
    this.data.oldpwd = e.detail.value;
    console.log(this.data.oldpwd)
  },
  voteTitle1: function (e) {
    this.data.newpwd = e.detail.value;
    console.log(this.data.newpwd)
  },
  submit: function (e) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Api.password({
      uid: app.globalData.wxUser.uid,
      oldpwd: this.data.oldpwd,
      newpwd: this.data.newpwd,
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
})