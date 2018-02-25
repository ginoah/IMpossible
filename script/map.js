
$(
    function(){
        $('#map').animate({
            scrollTop : document.getElementById("map").scrollTop + $("#home").offset().top,
            scrollLeft : document.getElementById("map").scrollLeft + $("#home").offset().left
        }, 1, 'easeInOutExpo');
    }
)

var wait=2500;
var duration=1000;

$(".btn").click(function(){
    var audio = new Audio('audio/click.m4a');
    audio.play();

    $(".btn").fadeOut(duration);
    var id = $(this).attr("id");
    id = id.substring(4);

    $("#map").animate({
        scrollTop : document.getElementById("map").scrollTop + $("#"+id).offset().top,
        scrollLeft : document.getElementById("map").scrollLeft + $("#"+id).offset().left
    }, wait, 'easeInOutExpo');
    $(this).fadeOut(duration);
    if(id!="home"){
        setTimeout(function(){$("#btn-home").fadeIn(duration);},wait);

        var lastClass = $('#btn-home').attr('class').split(' ').pop();
        setTimeout(function(){$("#btn-home").removeClass(lastClass);},wait);
    }
});

$(".homebtn").click(function(){
    $("#manu").fadeOut(duration);
});

$("#btn-home").click(function(){
    setTimeout(function(){$(".homebtn").fadeIn(duration); $("#manu").fadeIn(duration);},wait);
});

$(".informationbtn").click(function(){
    var id = $(this).attr("id");
    var idNum = id[id.length-1];
    idNum++;
    setTimeout(function(){$("#btn-information-"+idNum).fadeIn(duration);},wait);
});

$("#btn-information-1").click(function(){
    $("#btn-home").addClass("rightup");
});

$("#btn-information-2").click(function(){
    setTimeout(function(){$("#btn-home").addClass("right");},wait);
});

$("#btn-information-3").click(function(){
    setTimeout(function(){$("#btn-home").addClass("rightdown");},wait);
});

$("#btn-information-4").click(function(){
    setTimeout(function(){$("#btn-home").addClass("down");},wait);
});

$("#btn-photos").click(function(){
    $("#btn-home").addClass("leftdown");
});

$("#btn-register-1").click(function(){
    setTimeout(function(){$("#btn-register-2").fadeIn(duration);},wait);
    $("#btn-home").addClass("left");
});

$("#btn-register-2").click(function(){
    setTimeout(function(){$("#btn-home").addClass("leftup");},wait);
});

$("#btn-about").click(function(){
    $("#btn-home").addClass("up");
});

$(".listbtn").click(function(){
    var id = $(this).attr("id");
    id = id.substring(8);
    $("#btn-"+id).trigger("click");
});