$(function () {
  $(window).scroll(function () {
    var position = $(this).scrollTop();
    if (position >= 215) {
      $('.navbar').addClass('conNavbar');
      $('.navbar').removeClass('exNavbar');
      $('.navBG').addClass('navBGex');
      $('.navBG').removeClass('navBGcon');
    } else {
      $('.navbar').addClass('exNavbar');
      $('.navbar').removeClass('conNavbar');
      $('.navBG').addClass('navBGcon');
      $('.navBG').removeClass('navBGex');
    }
  });

  $("div.zprava").on("click", function () {
    $(this).hide();
  })
});