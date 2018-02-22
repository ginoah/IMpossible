
$(
    function(){
        $('html, body').animate({
            scrollTop: $("#a-0").offset().top,
            scrollLeft: $("#a-0").offset().left
        }, 1, 'easeInOutExpo');
        // $("#black-mask").fadeOut(3000);
    }
)


$(".btn").click(function(){
    var audio = new Audio('audio/click.m4a');
    audio.play();

    var id = $(this).attr("id");
    var idNum = id[id.length-1];
    $('html, body').animate({
        scrollTop: $("#a-"+idNum).offset().top,
        scrollLeft: $("#a-"+idNum).offset().left
    }, 3000, 'easeInOutExpo');
    $(".btn").fadeOut(1000);
    if(idNum!="0"){
        setTimeout(function(){$("#btn-0").fadeIn(1000);},3000);
        $(".btn").fadeOut(1000);
    }
    else{
        setTimeout(function(){$(".btn").fadeIn(1000);$("#btn-0").fadeOut(0);},3000);
        $("#btn-0").fadeOut(1000);
    }
});


$("#btn-0").click(function(){
    var audio = new Audio('audio/click.m4a');
    audio.play();

    var id = $(this).attr("id");
    var idNum = id[id.length-1];
    $('html, body').animate({
        scrollTop: $("#a-"+idNum).offset().top,
        scrollLeft: $("#a-"+idNum).offset().left
    }, 3000, 'easeInOutExpo');
    $(this).fadeOut(1000);
    setTimeout(function(){$(".btn").fadeIn(1000);$("#btn-0").fadeOut(0);},3000);
});