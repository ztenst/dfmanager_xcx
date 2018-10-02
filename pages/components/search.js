Component({
    properties : {
      placeholder : {
        type : String,
        value : '搜索项目名称、公司、房源'
      },
      value : {
        type : String,
        value : ''
      }
    },
    data : {
    },
    methods : {
      'confirm' : function(e) {
        var value = e.detail.value;
        this.triggerEvent('confirm',value);
      }
    }
})
