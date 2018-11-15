import WxService from '../libs/wx-service/WxService';
import WxValidate from '../libs/wx-validate/WxValidate';
import _ from '../libs/underscore.modified';
import wxParse from '../libs/wxParse/wxParse';
import Promise from '../libs/es6-promise';
import coordtransform from'../libs/coordtransform';
import Api from '../utils/api';
import PubSub from '../libs/pubsub';

class Global{
  constructor(){
    this.WxService = new WxService;
    this._ = _;
    this.wxParse = wxParse;
    this.Promise = Promise;
    this.WxValidate = WxValidate;
    this.coordtransform = coordtransform;
    this.Api = new Api;
    this.pubsub = new PubSub();
  }
  //获取用户信息
  initUserInfo(data){
    var app = getApp();
    return new Promise(resolve=>{
      this.Api.userIndex(data).then(obj=>{
        resolve(obj);
      })
    })
  }
  //获取用户信息
  getUser(){
    return new Promise(resolve=>{
      var app = getApp();
      var user = app.globalData.user;
      if(user){
        resolve(user);
      }else{
        app.loginCallback.push(function(user) {
          resolve(user);
        })
      }
    })
  }
  initUidLogin(obj){
    return this.initCommonLogin(obj);
  }
  initCommonLogin(data){
    return new Promise((resolve,reject)=>{
      this.initUserInfo(data).then(obj=>{
        if(obj.status === 'error'){
          reject();
        }else{
          var data = obj.data;
          //这个肯定是登录成功了才能获取数据
          data.uid = data.id;
          //这边统一更新wxUser，可能手机号登录的用户并不是微信用户
          this.setUser(data);
          resolve(data);
        }
      })
    })
  }
  //初始化手机号登录，替换用户信息
  initPhoneLogin(phone){
    return this.initCommonLogin({
      'kw' : phone
    });
  }
  getUid() {
    var app = getApp();
    return app.globalData.user.id;
  }
  getStaticUser(){
    var app = getApp();
    return app.globalData.user;
  }
  //微信登录
  wxLogin(){
    return this.WxService.login().then(res=>{
      return this.Api.getOpenidAn({
        code : res.code
      }).then(obj=>{
        const app = getApp();
        app.globalData.wxUser = obj;
        return obj;
      });
    })
  }
  //登陆
  initLogin(){
    return new Promise(resolve=>{
      this.wxLogin().then(obj=>{
        var app = getApp();
        if(obj.uid){
          this.initUserInfo({
            uid : obj.uid,
            user_type : obj.type
          }).then(obj=>{
            app.globalData.user = obj.data;
            this._.each(app.loginCallback,function(v) {
              v(app.globalData.user);
            })
          })
        }else{
            app.globalData.user = {};
            this._.each(app.loginCallback,function(v) {
              v(app.globalData.user);
            })
        }
      });
    })
  }
  //获取微信用户信息
  getWxUser(){
    const app = getApp();
    return new Promise(resolve=>{
      var user = app.globalData.wxUser;
      if(user){
        resolve(user);
      }else{
        app.wxLoginCallback.push(function(obj) {
          resolve(obj);
        });
      }
    })
  }
  //设置用户
  setUser(user){
    const app = getApp();
    app.globalData.user = user;
    return this;
  }
  //获取当前page
  getCurrentPage(){
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      return page;
  }
  checkLogin(){
    return new Promise((resolve,reject)=>{
      var app = getApp();
      var user = app.globalData.user;
      console.log(user);
      user.is_true = 1;
      if(user.is_true){
        resolve(user);
      }else{
        this.showLoginDialog();
        reject();
      }
    })
  }
  //重新登录
  refreshLogin(){
    this.getUser().then(obj=>{
      this.showLoginDialog(1);
    });
  }
  showLoginDialog(isRefresh){
    var page = this.getCurrentPage();
    var loginDialog = page.selectComponent("#j-login-dialog");
    loginDialog.show(isRefresh);
  }
  hideLoginDialog(){
    var page = this.getCurrentPage();
    var loginDialog = page.selectComponent("#j-login-dialog");
    loginDialog.hide();
  }
  showErrorMsg(msg){
    this.WxService.showToast({
      title : msg,
      icon : 'none'
    });
  }
  showOkMsg(msg){
    this.WxService.showToast({
      title : msg
    })
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve()
      },2e3);
    })
  }
  //显示地理位置
  showMapLocation(shop){
    //console.log('helloworld');
    var lat = shop.map_lat;
    var lng = shop.map_lng;
    var scale = shop.map_zoom;
    var name = shop.name;
    var address = shop.address;

    var bd09togcj02 = this.coordtransform.bd09togcj02(lng, lat);

    wx.openLocation({
      latitude: Number(bd09togcj02[1]),
      longitude: Number(bd09togcj02[0]),
      name: name,
      scale: scale,
      address : address
    });
  }
  makePhone(phone){
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  }
  //这里判断新房列表
  link(url){
    //如果是首页、新房、个人中心则跳转使用switchTab否则使用navigateTo
    var switchTabUrl = ['/pages/index/index','/pages/my/index'];
    var isSwitch = false;
    var _ = this._;
    _.each(switchTabUrl,(v,k)=> {
      if(v === url){
        if(k == 1){
          var obj = this.getRequest(url);
        }
        this.WxService.redirectTo(v);
        isSwitch = true;
      }
    })
    if(!isSwitch){
      this.WxService.navigateTo(url);
    }
  }
  getRequest(url) {
      var result = {};
      var query = url.split("?")[1];
      if(query){
        var queryArr = query.split("&");
        queryArr.forEach(function(item){
          var name = item.split("=")[0];
          var value = item.split("=")[1];
          result[name] = value;
        });
      }
      return result;
  }
  //获取用户地理位置
  getUserMap(){
    return new Promise(resolve=>{
      var app = getApp();
      if(app.globalData.userMap){
        resolve(app.globalData.userMap);
      }else{
        app.userMapCalllback.push(function(obj) {
          resolve(obj);
        });
      }
    })
  }
  //退出登录，清空微信数据，用户数据
  quit() {
    var app = getApp();
    app.globalData.user = {
      is_true : 0
    };
    return this;
  }
  checkUser() {
    return this.getUser().then(obj=>{
      return this.checkLogin();
    })
  }
  goMy(){
    this.WxService.navigateTo('/pages/my/index');
  }
  //读取字体
  loadFontFace() {
    wx.loadFontFace({
      family: 'DINMittelschriftLT',
      source: 'url("https://oss-sysweet-demo.huafangweiyuan.com/zongdai/images/LT.ttf")',
      success: function(res) {
        //console.log('字体加载成功');
        //console.log(res.status) //  loaded
      },
      fail: function(res) {
        //console.log('字体加载失败');
        //console.log(res.status) //  error
      },
      complete: function(res) {
        //console.log('字体加载完成');
        //console.log(res.status);
      }
    });
  }
  //获得底部配置
  getBottom() {
    return new Promise(resolve => {
      var app = getApp();
      if (app.globalData._bottom) {
        resolve(app.globalData._bottom);
      } else {
        app._bottomCallback.push(function (obj) {
          resolve(obj);
        });
      }
    })
  }
  //获得配置
  getConfig(){
    return new Promise(resolve=>{
      var app = getApp();
      if(app.globalData._config){
        resolve(app.globalData._config);
      }else{
        app._configCallback.push(function(obj) {
          resolve(obj);
        });
      }
    })
  }
  //获取isLogin
  
}


export default Global;
