const app = getApp();
Page({
  data:{
    phone : '',
    qs_index : 0,
    qs : [{
      name : '+86(中国)',
      value : '+86'
    },{
      name : '+852(香港)',
      value : '+852'
    },{
      name : '+853(澳门)',
      value : '+853'
    },{
      name : '+886(台湾)',
      value : '+886'
    }],
  },
  //区号修改
  changeQs : function(e) {
    var value = e.detail.value;
    var _phone = this.data._phone;
    var qs = this.data.qs;
    if(value != 0){
      var phone = qs[value]['value'] + _phone;
    }else{
      var phone = _phone;
    }
    this.setData({
      qs_index : value,
      phone : phone
    });
  },
  sendYzm : function() {
    var phone = this.data.phone;
    if(phone.length == 0){
      this.Global.showErrorMsg('请输入手机号');
    }else if(!/^1[0-9]\d{9}$/.test(phone)){
      this.Global.showErrorMsg('手机号格式错误');
    }else{
      var cyzm = this.selectComponent('#cyzm');
      cyzm.start();
    }
  },
  onInputPhone : function(e) {
    var value = e.detail.value;
    var qs_index = this.data.qs_index;
    var qs = this.data.qs;
    if(qs_index != 0){
      var phone = phone = qs[qs_index]['value'] + value;
    }else{
      var phone = value;
    }
    this.setData({
      phone : phone,
      _phone : value
    })
  },
  submitForm(e){
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0];
        this.WxService.showToast({
            title : error.msg,
            icon : 'none'
        });
        return false
    }else{
        this.Api.checkPwd({
          'kw' : this.data.phone,
          'pwd' : e.detail.value['form[code]'],
          'openid' : app.globalData.wxUser.openid
        }).then(obj=>{
          if(obj['status'] == 'error'){
            this.Global.showErrorMsg(obj.msg);
          }else{
            this.Global.initUserInfo({
              uid : obj.data.uid,
              user_type : obj.data.type
            }).then(obj=>{
              obj.data.is_true = 1;
              app.globalData.user = obj.data;
              this.Global.showOkMsg('登录成功').then(obj=>{
                this.goMy();
              })
            })
            //校验是否是用户
            //this.Global.initPhoneLogin(this.data.phone).then(obj=>{
              //if(obj.is_true){
                //this.Global.showOkMsg('登陆成功').then((obj) => {
                  //this.Global.WxService.switchTab('/pages/index/index');
                //});
              //}else{
                //this.goReg();
              //}
              //console.log('是用户');
            //},obj=>{
              //this.goReg();
              //console.log('不是用户');
            //});
          }
        })
    }
  },
  goReg : function(){
    this.Global.WxService.navigateTo('/pages/login/bind?phone=' + this.data.phone);
  },
  goMy : function() {
    this.Global.WxService.redirectTo('/pages/my/index');
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var WxValidate = this.Global.WxValidate;
    this.WxService = this.Global.WxService;

    this.Global.getConfig().then(obj=>{
      this.setData({
        config : obj
      });
      wx.setNavigationBarTitle({
        title : obj.sitename1
      })
    })
    // 验证字段的规则
    const rules = {
        'form[phone]': {
            required: true,
            tel : true
        },
        'form[code]': {
            required: true
        }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
        'form[code]': {
            required: '请输入密码',
        },
        'form[phone]': {
            required: '请输入手机号',
            tel: '请输入正确的手机号',
        }
    }

    this.WxValidate = new WxValidate(rules,messages);

  }
})
