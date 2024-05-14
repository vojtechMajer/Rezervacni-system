let list = ["Line 1","Line 2","Line 3"];

$(function(){
  $("input#SetDate").on("change", function(){
    if(this.value != "") {
      console.log(this.value);
    } else {
      console.log(Date());
      this.value = Date()
    }
  })
  list.forEach(function(item){
    console.log(item)
  })  
});
  
