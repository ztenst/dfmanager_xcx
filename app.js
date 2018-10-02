import Global from './utils/global';
import config from './config';
//app.js
App({
  onLaunch: function () {
    wx.clearStorageSync();
    this.Global = new Global;
    this.config = config;
    //这个只会执行一次，获取到wxUser 里面可以知道是否需要注册
    this.Global.initLogin();
    //授权地理位置
    this.Global.WxService.getLocation({
        type : 'gci02'
    }).then(obj => {
        this.globalData.userMap = obj;
        this.Global._.each(this.userMapCalllback,function(v) {
          v(obj);
        })
    },obj=>{
        this.globalData.userMap = {};
        this.Global._.each(this.userMapCalllback,function(v) {
          v({});
        });
    });
    //获得站点配置
    this.Global.Api.config().then(obj=>{
      this.globalData._config = obj;
      this.Global._.each(this._configCallback,function(v) {
        v(obj);
      });
    })
  },
  globalData: {
    userInfo: null,
    pages : {}
  },
  setPage : function(name,page) {
    this.globalData.pages[name] = page;
  },
  getPage : function(name) {
    return this.globalData.pages[name];
  },
  loginCallback: [],
  userMapCalllback : [],
  _configCallback : []
})
