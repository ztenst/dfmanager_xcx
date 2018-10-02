Component({
    properties : {
      item : {
        type : Object
      }
    },
    data : {
    },
    methods : {
      onInput : function(e) {
        var value = e.detail.value;
        var name = this.data.item.param;
        this.triggerEvent('change',{
          name : name,
          value : value
        });
      }
    },
    ready : function() {
      //console.log(this.data.item);
    }
})
