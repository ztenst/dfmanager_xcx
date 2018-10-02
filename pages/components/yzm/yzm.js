const app = getApp();
Component({
    properties : {
      phone : {
        type : String,
        observer : function(newValue,oldValue) {
          this.setData({
            phone : newValue
          })
        }
      }
    },
    data : {
      run : false,
      _time : 5
    },
    methods : {
      start : function() {
        var self = this;
        var run = this.data.run;
        if(run) return;
        this._sendYzm(this.data.phone);
        this.setData({
          run : true
        });
        var tid = setInterval(()=> {
          var time = self.data.time - 1;
          if(time == 0){
            clearInterval(tid);
            this.setData({
              run : false,
              time : this.data._time
            });
          }else{
            this.setData({
              time : time
            });
          }
        },1e3);
      },
      isRunning : function() {
        return this.data.run;
      },
      _sendYzm : function(phone) {
        this.Api.getSmsCode({
          phone : phone
        }).then(obj=>{
          this.Global.showOkMsg(obj.msg);
          //console.log('对' + phone + '发送验证码了');
        },obj=>{
          this.Global.showErrorMsg(obj.msg);
        })
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
      this.setData({
        time : this.data._time
      })
    }
})
