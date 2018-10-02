const app = getApp();
Page({
  data:{
    UserExt : {
      name : '',
      phone : '',
      type : 2,
      image : [],
      companycode : ''
    }
  },
  submitForm : function(e) {
    var WxValidate = this.createValidate();
        // 传入表单数据，调用验证方法
    if (!WxValidate.checkForm(e)) {
        const error = WxValidate.errorList[0];
        this.WxService.showToast({
            title : error.msg,
            icon : 'none'
        });
        return false
    }else{
      var value = e.detail.value;
      this.setData(value);
      var data = this.data.UserExt;
      var cupload = this.selectComponent('#cupload');
      var image = cupload.getImages();
      console.log(image);
      if(image.length == 0){
        this.WxService.showToast({
          title : '请上传身份证',
          icon : 'none'
        });
        return false;
      }else{
        data.image = image[0]['key'];
      }
      data.phone = this.data.phone;
      data.openid = app.globalData.wxUser.openid;

      var params = {}
      this.Global._.each(data,function(v,k) {
        params['UserExt[' + k + ']'] = v;
      });
      this.Api.regis(params).then(obj=>{
        if(obj['status'] === 'success'){
          this.Global.initPhoneLogin(data.phone);
          var UserExt = this.data.UserExt;
          app.globalData.wxUser.user_data = {
            name : UserExt['name'],
            phone : UserExt['phone'],
            image : image[0],
            type : UserExt['type']
          };
          console.log(app.globalData.wxUser);
          //这里获取用户信息
          this.Global.showOkMsg(obj.msg).then(obj=>{
            this.Global.WxService.switchTab('/pages/index/index');
          });
        }else{
          this.Global.showErrorMsg(obj.msg);
        }
      });
    }
  },
  goApplyMd : function() {
    app.Global.WxService.navigateTo('/pages/login/applymd');
  },
  setType : function(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      'UserExt.type' : type
    });
  },
  onLoad: function(options){
    var phone = options.phone;
    var wxUser = app.globalData.wxUser;
    console.log(wxUser);
    var user_data = wxUser['user_data'];

    this.Global = app.Global;
    this.WxService = app.Global.WxService;
    this.Api = this.Global.Api;
    this.Api.getUserType().then(obj=>{
      this.setData({
        types : obj
      })
    });
    if(!this.Global._.isEmpty(user_data)){
      this.setData({
        UserExt : {
          name : user_data['name'],
          image : [user_data['image']],
          type : 2
        }
      })
    }
    this.setData({
      phone : phone
    });
  },
  createValidate : function() {
    var WxValidate = this.Global.WxValidate;
    if(this.data.UserExt.type == 2){
      var rules = {
          'UserExt.name': {
              required: true,
          },
          'UserExt.companycode': {
              required: true
          }
      }
      var messages = {
          'UserExt.name': {
              required: '请输入姓名',
          },
          'UserExt.companycode': {
              required: '请输入门店码'
          }
      }
    }else{
      var rules = {
          'UserExt.name': {
              required: true,
          }
      }
      var messages = {
          'UserExt.name': {
              required: '请输入姓名',
          }
      }
    };
    return new WxValidate(rules,messages);
  }
})
