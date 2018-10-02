//import is from '../../libs/is';
const app = getApp();
Page({
  data:{
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var _ = this.Global._;
    //这个只是临时账号，用户不大，微信哪个比较关键。
    //this.Global.initPhoneLogin('13861242596').then(obj=>{});

    //this.Global.getUser().then(obj=>{
      ////如果没有用户信息说明登录失败
      //if(_.isEmpty(obj)){
        //this.Global.showLoginDialog();
      //}
    //});
    //校验是否登录
    //this.Global.checkLogin()
    //重新登录
    //this.Global.refreshLogin();

    //对象处理
    //var obj = {
      //name : 1,
      //age : 2
    //};
    //var param = {}
    //this.Global._.each(obj,function(v,k) {
      //param['UserExt[' + k + ']'] = v;
    //})
    //console.log(param);

    //手机号发送验证码
    //获取用户信息
    //this.Api.getUserInfo({
      //phone : '15380039099'
    //}).then(obj=>{
      //console.log(obj);
    //})
    //wx.setStorageSync('loginPhone','15380039099');
    //var phone = wx.getStorageSync('loginPhone');
    //console.log(phone);
    //wx.chooseLocation({
      //success :function() {
        //console.log(arguments);
      //},
      //fail : function() {
        //console.log('拒绝');
      //}
    //});
    //获取用户地理位置
    //this.Global.getUserMap().then(obj=>{
      //console.log(obj);
    //});

    //新房列表
    //this.Api.xfList(options).then(obj=>{
      //this.setData(obj);
    //});
    //自定义链接跳转
    //var obj = this.Global.getRequest('/pages/xinfang/list?city=1&area=2');
    //console.log(obj);
    //var obj = this.Global.link('/pages/xinfang/list?city=1&area=2');
    //console.log(obj);

    //var obj = this.Global.link('/pages/my/manage');
    //console.log(obj);
    //加载测试
    //wx.showNavigationBarLoading();
    //setTimeout(()=>{
      //wx.hideNavigationBarLoading();
    //},2e3);
    //获取用户信息
    //this.Global.getUser().then(obj=>{
      //console.log(obj);
    //})
    //获取微信用户
    //this.Global.getWxUser().then(obj=>{
      //console.log(obj);
    //});
    //订阅发布测试
    //this.Global.pubsub.on('select',function() {
      //console.log(111);
    //})
    //console.log('5s后');
    //setTimeout(()=> {
      //this.Global.pubsub.emit('select',function() {
        //console.log('成功了');
      //})
    //},5e3);
  },
  jubao : function() {
    //没有用户信息就弹框
    this.Global.checkLogin().then(obj=>{
      var cjubao = this.selectComponent('#cjubao');
      cjubao.show();
    });
  },
  send : function() {
    this.Api.getSmsCode({
      phone : '15380039099'
    });
  },
  check : function() {
    this.Api.checkCode({
      phone : '15380039099',
      code : this.data.code
    }).then(obj=>{
      console.log(obj);
    });
  },
  onInput : function(e) {
    console.log(e.detail.value);
    this.setData({
      code : e.detail.value
    })
  },
  //搜索的回调
  onSearch : function(e) {
    var kw = e.detail;
    console.log(kw);
  }
})
