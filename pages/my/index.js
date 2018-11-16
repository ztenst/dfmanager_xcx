const app = getApp();
Page({
  data:{
  },
  quit : function() {
    this.Global.showLoginDialog(1);
  },
  relogin : function() {
        
  },
  refreshuser :function() {
    this.init();
  },
  changeCompany : function() {
    var cdialog = this.selectComponent('#cdialog');
    cdialog.show();
  },
  joinCompany : function() {
    this.Global.WxService.navigateTo('/pages/login/bind?phone=' + this.data._user.phone);
  },
  ok : function() {
    var user = this.data._user;
    this.Api.leave({
      uid : user.id
    }).then(obj=>{
      if(obj['status'] === 'success'){
        this.Global.showOkMsg(obj.msg).then(obj=>{
          app.globalData.wxUser.is_true = 0;
          this.quit();
        });
        //this.Global.showOkMsg(obj.msg).then(obj=>{
          //this.Global.WxService.switchTab('/pages/index/index');
        //});
      }else{
        this.Global.showErrorMsg(obj.msg);
      }
    });
  },
  cancel : function() {
    
  },
  getUserIndex : function(data) {
    this.Api.userIndex(data).then(obj=>{
      this.setData({
        user : obj.data
      })
    })
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Global.pubsub.on('refresh',this.onRefresh);
    //var uid = 2;
    //this.Api.getUserInfo({
      //kw : uid
    //}).then(obj=>{
      //this.setData({
        //user : obj
      //})
    //})
  },
  onRefresh : function() {
    this.Global.getUser().then(obj=>{
      this.Global.initCommonLogin({
        uid : obj.id,
        user_type : obj.type
      }).then(obj=>{
        this.Global.WxService.navigateBack();
      })
    })
  },
  call : function() {
    this.Global.makePhone(this.data.user.tel);
  },
  init : function() {
    this.Global.checkUser().then(obj=>{
        this.setData({
          user : obj,
          isLoad : true
        });
        this.Global.hideLoginDialog();
        //this.getUserIndex({
          //uid : obj.uid,
          //type : obj.type
        //});
    })
  },
  refresh : function() {
  },
  goLink : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.link(item.url);
  },
  onShow : function() {
    this.init();
  },
  //成为案场
  beAnchang : function() {
    this.relogin(1);
  },
  relogin : function(type) {
    this.Global.initUserInfo({
      uid : this.data.user.id,
      user_type : type
    }).then(obj=>{
      obj.data.is_true = 1;
      app.globalData.user = obj.data;
      this.setData({
        _user : obj.data,
        user : obj.data
      })
    })
  },
  beShichang : function() {
    this.relogin(2);
  },
  onChangeshenfen : function() {
    this.Global.WxService.navigateTo('/pages/my/shenfen');
  },
  gorevise:function(){
    wx.navigateTo({
      url: '../revisename/revisename',
    })
  },
  gopassword:function(){
    wx.navigateTo({
      url: '../password/password',
    })
  },
  goxm:function(){
    wx.navigateTo({
      url: '../xiangmuku/xiangmuku',
    })
  }
})
