
$(
    function(){
        $('#map').animate({
            scrollTop : document.getElementById("map").scrollTop + $("#home").offset().top,
            scrollLeft : document.getElementById("map").scrollLeft + $("#home").offset().left
        }, 1, 'easeInOutExpo');
    }
)

var prevpage;

$(".btn").click(function(){
    var audio = new Audio('audio/click.m4a');
    audio.play();

    $(".btn").fadeOut(1000);
    var id = $(this).attr("id");
    id = id.substring(4);

    $("#map").animate({
        scrollTop : document.getElementById("map").scrollTop + $("#"+id).offset().top,
        scrollLeft : document.getElementById("map").scrollLeft + $("#"+id).offset().left
    }, 3000, 'easeInOutExpo');
    $(this).fadeOut(1000);
    if(id!="home")
        setTimeout(function(){$("#btn-home").fadeIn(1000);},3000);
});


$("#btn-home").click(function(){
    setTimeout(function(){$(".homebtn").fadeIn(1000);},3000);
});

$(".informationbtn").click(function(){
    var id = $(this).attr("id");
    var idNum = id[id.length-1];
    idNum++;
    setTimeout(function(){$("#btn-information-"+idNum).fadeIn(1000);},3000);
});

$("#btn-register-1").click(function(){
    setTimeout(function(){$("#btn-register-2").fadeIn(1000);},3000);
    $("#btn-home").removeClass("down").addClass("left");
});