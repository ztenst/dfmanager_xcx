Component({
    properties : {
      type : {
        type : String,
        value : 1,
        observer : function(newValue,oldValue) {
          this.setData({
            type : newValue
          });
        }
      },
      'addClass' : {
        type : String
      }
    },
    data : {
    },
    methods : {
    },
    ready : function() {
        console.log(this.data.type);
    }
})
