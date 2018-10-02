import WxValidate from '../../../libs/wx-validate/WxValidate';
Component({
    properties : {
    },
    data : {
    },
    methods : {
      submitForm : function(e) {
        // 传入表单数据，调用验证方法
        if (!this.WxValidate.checkForm(e)) {
            const error = this.WxValidate.errorList[0];
            this.WxService.showToast({
                title : error.msg,
                icon : 'none'
            });
            return false
        }else{
        }
      }
    },
    ready : function() {
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
              required: '请输入验证码',
          },
          'form[phone]': {
              required: '请输入手机号',
              tel: '请输入正确的手机号',
          }
      }
      this.WxValidate = new WxValidate(rules,messages);
    }
})
