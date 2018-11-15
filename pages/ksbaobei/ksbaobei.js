const app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Api.getTitle({
      type: 2
    }).then(obj => {
      // console.log(obj)
      wx.setNavigationBarTitle({
        title: obj
      })
    });
    var WxValidate = this.Global.WxValidate;
    const rules = {
      'note': {
        required: true,
      }
    }
    const messages = {
      'note': {
        required: '请填写报备内容',
      }
    }
    this.WxValidate = new WxValidate(rules, messages);
  },
  onShareAppMessage: function () {
    return {
      title: '分享给好友',
      desc: '最具人气的小程序!',
      path: ''
    }
  },

  copy: function(){
    wx.setClipboardData({
      data: '报备项目：龙湖滟澜山\n客户信息：刘先生186****9892 李先生187****2924 王小姐136****7341\n带看人姓名：刘涛\n带看人电话：18621657355\n分销公司全称：上海贺诺网络科技有限公司\n自驾车牌号码：沪A88888',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  add: function (e) {
    console.log(1);
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0];
      this.Global.showErrorMsg(error.msg);
    } else {
      this.Global.getUser().then(obj => {
        // console.log(e.detail);
        this.Api.getSumit({
          staff: obj.id,
          note: e.detail['value']['note']
        }).then(obj => {
          this.Global.showErrorMsg(obj.msg);
        });
      })
    }
  },
  backhome: function () {
    console.log(1)
    // this.Global.WxService.redirectTo('/pages/index/index');
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }
})