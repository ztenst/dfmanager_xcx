const app = getApp();
Page({
  data: {
    name:'',
    sitename:''
  },
  onLoad: function (options) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    console.log(app.globalData.wxUser)
    this.Api.getTitle({
      type: 2,
      staff: app.globalData.wxUser.uid,
    }).then(obj => {
      this.setData({
        name: obj.name,
        sitename: obj.sitename
      })

      wx.setNavigationBarTitle({
        title: obj.title
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
      title: '钉房管家快速报备系统',
      desc: '最具人气的小程序!',
      path: '/api/user/getSharePic'
    }
  },

  copy: function(){
    wx.setClipboardData({
      data: '报备项目：龙湖滟澜山\n客户信息：刘先生186****9892 李先生187****2924\n带看人姓名：刘先生\n带看人电话：13800008888\n分销公司全称：钉房网络科技(上海)有限公司\n自驾车牌号码：沪A88888',
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
    var str1 = e.detail['value']['note'].replace(/\n/g, "tt");
    console.log(1);
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0];
      this.Global.showErrorMsg(error.msg);
    } else {
      this.Global.getUser().then(obj => {
        var app = getApp();
        var user = app.globalData.wxUser;
        var str1 = e.detail['value']['note'].replace(/\n/g, "tt");
        // console.log(e.detail);
        this.Api.getSumit({
          staff: obj.id,
          note: str1,
        }).then(obj => {
          if (obj.status == 'success') {
            this.Global.showOkMsg(obj.msg).then(obj => {
              wx.navigateTo({
                url: '/pages/my/index'
              })
            });
            // this.Global.showErrorMsg('请重新登录小程序');
          } else {
            this.Global.showErrorMsg(obj.msg);
          }
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