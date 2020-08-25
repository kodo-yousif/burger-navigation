// Hide Navbar on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("nav").outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $("nav").removeClass("nav-down").addClass("nav-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("nav").removeClass("nav-up").addClass("nav-down");
    }
  }

  lastScrollTop = st;
}

var $els = $(".menu a, .menu header");
var count = $els.length;
var grouplength = Math.ceil(count / 3);
var groupNumber = 0;
var i = 1;

$(".menu").css("--count", count + "");
$els.each(function (j) {
  if (i > grouplength) {
    groupNumber++;
    i = 1;
  }
  $(this).attr("data-group", groupNumber);
  i++;
});

$(".menu footer button").on("click", function (e) {
  e.preventDefault();
  console.log($els);
  $els.each(function (j) {
    $(this).css(
      "--top",
      $(this)[0].getBoundingClientRect().top +
        $(this).attr("data-group") * -15 -
        8.5
    );
    $(this).css("--delay-in", (j * 0.1) / 1.5 + "s");
    $(this).css("--delay-out", ((count - j) * 0.1) / 1.5 + "s");
  });
  $(".menu").toggleClass("closed");
  e.stopPropagation();
});
