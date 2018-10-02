const app = getApp();
Component({
    properties : {
      hid : {
        type : String
      }
    },
    data : {
      reasons : ['项目已售罄','代理公司已撤销','黑客翘客拖佣金','无法联系对接人','其他'],
      reasonId : -1,
      show : false
    },
    methods : {
      hide : function() {
        this.setData({
          'show' : false
        })
      },
      show : function() {
        this.setData({
          'show' : true
        })
      },
      tijiao : function() {
        var hid = this.data.hid;
        var reason = '';
        var reasonId = this.data.reasonId;
        var uid = this.Global.getUid();
        

        if(reasonId == -1){
          this.Global.showErrorMsg('请选择举报内容');
        }else if(reasonId == 4){
          reason = this.data._reason;
        }else{
          reason = this.data.reasons[reasonId];
        }

        this.Api.addReport({
          hid : hid,
          reason : reason,
          uid : uid
        }).then(obj=>{
          if(obj['status'] === 'error'){
            this.Global.showErrorMsg(obj.msg);
          }else{
            this.hide();
            this.Global.showOkMsg(obj.msg);
          }
        });

      },
      setReason : function(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
          reasonId : index
        })
      },
      onInputReason : function(e) {
        var value = e.detail.value;
        this.setData({
          _reason : value
        });
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
    }
})
