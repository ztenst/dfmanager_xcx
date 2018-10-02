const app = getApp();
Component({
    properties : {
    },
    data : {
      msg : ''
    },
    methods : {
      setMsg : function(msg) {
        this.Global.wxParse.wxParse('_msg', 'html', msg, this,15);
      },
      show : function() {
        this.setData({
          'show' : true
        })
      },
      hide : function() {
        this.setData({
          'show' : false
        })
      },
      onTapCall : function() {
        this.triggerEvent('call');
      },
      onTapOk: function() {
        this.triggerEvent('ok');
      }
    },
    created: function() {
      this.Global = app.Global;
    }
});
