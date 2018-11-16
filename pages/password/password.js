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
})