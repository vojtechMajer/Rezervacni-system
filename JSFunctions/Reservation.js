$(function() {
    $("table").each(function() {
      table = $(this)
      table.before("<div></div>")
      table.find("thead th").each(function(index){ 
        pomocna = $(this).text();
        table.prev().append("<button>" + pomocna + "</button>")
      });
    });
    $("button").on("click", function() {
          papousek = $(this).index()+1;
          $(this).parent().next().find("th:nth-child("+papousek+"),td:nth-child("+papousek+")").toggle()
        });
  });