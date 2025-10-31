$(document).ready(function () {
  if ($("#site-header").length) {
    const header = $("#site-header");
    const stickyPoint = header.offset().top + header.height();

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > stickyPoint) {
        header.addClass("sticky");
      } else {
        header.removeClass("sticky");
      }
    });
  }

  if ($("#view-more-arrow").length) {
    $("#view-more-arrow").on("click", function () {
      const arrowButton = $(this);
      arrowButton.fadeOut(400);
      $(".testimonial-hidden").removeClass("testimonial-hidden");
    });
}
});
