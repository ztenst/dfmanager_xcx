Component({
    properties : {
      title : {
        type : String,
        value : '提示信息'
      },
      msg: {
        type : String
      }
    },
    data : {
    },
    methods : {
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
      setMsg : function(msg) {
        this.setData({
          msg : msg
        });
        return this;
      },
      ok : function() {
        this.triggerEvent('ok');
        this.hide();
      },
      cancel : function() {
        this.hide();
        this.triggerEvent('cancel');
      }
    },
    ready : function() {
    }
});
