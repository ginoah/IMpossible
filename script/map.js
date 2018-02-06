
$(
    function(){
        $('html, body').animate({
            scrollTop: $("#a-0").offset().top,
            scrollLeft: $("#a-0").offset().left
        }, 1000, 'easeInOutExpo');
    }
)

$("#btn-1").click(function() {
    $('html, body').animate({
        scrollTop: $("#a-1").offset().top,
        scrollLeft: $("#a-1").offset().left
    }, 3000, 'easeInOutExpo');
});



$("#btn-2").click(function() {
    $('html, body').animate({
        scrollTop: $("#a-2").offset().top,
        scrollLeft: $("#a-2").offset().left
    }, 3000, 'easeInOutExpo');
});