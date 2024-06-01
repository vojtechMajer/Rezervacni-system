$(function () {
  $(window).scroll(function () {
    var position = $(this).scrollTop();
    if (position >= 215) {
      $('.navbar').addClass('conNavbar');
      $('.navbar').removeClass('exNavbar');
    } else {
      $('.navbar').addClass('exNavbar');
      $('.navbar').removeClass('conNavbar');
    }
  });
});