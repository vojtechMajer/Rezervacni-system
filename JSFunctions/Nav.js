$(function(){
    $(window).scroll(function(){
      var position = $(this).scrollTop();
      if(position >= 200) {
        $('.navbar').addClass('exNavbar');
      } else {
        $('.navbar').removeClass('exNavbar');
      }
    });
  });