
$(
    function(){
        
        $("#map").scrollTop(document.getElementById("map").scrollTop + $("#home").offset().top);
        $("#map").scrollLeft(document.getElementById("map").scrollLeft + $("#home").offset().left);
        sail("boat");
        sail("ship");

        
    }
)

// window.onresize = function(event) {
//     var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//     var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
//     if(h < w*0.55){
//         var neww = h/0.55;
//         var newWidth = neww*0.95;
//         var newHeight = neww*0.55;
//         var newMargin = (w - newWidth)/2;
//         $("#map-container").css("height",newHeight.toString());
//         $("#map-container").css("width",newWidth.toString());
//         $("#map-container").css("margin-left",newMargin.toString());
//     }
// };


var wait=2500;
var duration=1000;
var scroll_mode=false;

function sail(id){
    $("#"+id).addClass("sail");
    setTimeout(function(){$("#"+id).removeClass("sail")},5000);
    setTimeout(function(){sail(id);},(Math.random()*10+7)*1000);
};


$("#btn-mode").click(function(){
    if(scroll_mode){
        $("#map").css("overflow","hidden");
        $("#btn-home").trigger("click");
        $("#manu-shadow").fadeIn(duration);
        scroll_mode=false;
    }
    else{
        $(".btn").fadeOut(duration);
        $("#manu").fadeOut(duration);
        $("#manu-shadow").fadeOut(duration);
        $("#map").css("overflow","auto");
        scroll_mode=true;
    }
});

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
    $("#manu").fadeOut(duration);
    if(id!="home"){
        setTimeout(function(){$("#btn-home").fadeIn(duration);},wait);
        var lastClass = $('#btn-home').attr('class').split(' ').pop();
        if(lastClass=="up"||lastClass=="down"||lastClass=="left"||lastClass=="right"
            ||lastClass=="leftup"||lastClass=="leftdown"||lastClass=="rightup"||lastClass=="rightdown")
            setTimeout(function(){$("#btn-home").removeClass(lastClass);},wait);
    }
    $('html body').scrollTop(100);
});

// $(".homebtn").click(function(){
//     $("#manu").fadeOut(duration);
// });

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
    setTimeout(function(){$("#btn-home").addClass("rightup");},wait);
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
    setTimeout(function(){$("#btn-home").addClass("leftdown");},wait);
});

$("#btn-register-1").click(function(){
    setTimeout(function(){$("#btn-register-2").fadeIn(duration);},wait);
    setTimeout(function(){$("#btn-home").addClass("left");},wait);
});

$("#btn-register-2").click(function(){
    setTimeout(function(){$("#btn-home").addClass("leftup");},wait);
});

$("#btn-about").click(function(){
    setTimeout(function(){$("#btn-home").addClass("up");},wait);
});

$(".listbtn").click(function(){
    var id = $(this).attr("id");
    id = id.substring(8);
    $("#btn-"+id).trigger("click");
});

$("#manu-shadow").hover(function(){
    $("#manu").fadeIn(duration);
});
// $("#manu-shadow").mouseleave(function(){
//     $("#manu").fadeOut(duration);
// });
