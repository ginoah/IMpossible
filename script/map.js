
$(
    function(){
        
        $("#map").scrollTop(document.getElementById("map").scrollTop + $("#home").offset().top);
        $("#map").scrollLeft(document.getElementById("map").scrollLeft + $("#home").offset().left);
        sail("boat");
        sail("ship");
        dogwalk("dog1");
        setTimeout(dogwalk,100,"dog2");
        setInterval(wagtail,250,"dog1");
        setInterval(wagtail,250,"dog2");
        var audio = new Audio('audio/mapBgm.m4a');
        audio.play();
        audio.loop=true;
        audio.volume=0.1;
        move("convene1",3500);
        move("convene2",1200);
        move("convene3",5000);
    }
)

function move(id,time){
    console.log(id,time);
    var src = $("#"+id).attr("src");
    var len = src.length;
    var filetype = src.substring(len-3,len);
    var file = src.substring(0,len-3);
    console.log(filetype);
    if(filetype == "jpg"){
        $("#"+id).attr("src",file+"gif");
        setTimeout(function(){$("#"+id).attr("src",file+"jpg");console.log(id,file)},time);
        setTimeout(function(){move(id,time);},(Math.random()*10+time/1000)*1000);
    }
};

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
//var home=true;
var changing=false;

function sail(id){
    $("#"+id).addClass("sail");
    setTimeout(function(){$("#"+id).removeClass("sail")},5000);
    setTimeout(function(){sail(id);},(Math.random()*10+7)*1000);
};

function dogwalk(id){
    var Class=$('#'+id).attr('class');
    $('#'+id).removeClass(Class);
    $("#"+id).addClass("walk"+id[id.length-1]+" "+Class);
    setTimeout(function(){$("#"+id).removeClass("walk"+id[id.length-1])},5000);
    setTimeout(function(){dogwalk(id);},(Math.random()*10+7)*1000);
};



function wagtail(id){
    var lastClass = $('#'+id).attr('class').split(' ').pop();
    $('#'+id).removeClass(lastClass);
    if(lastClass=="dog1")
        $('#'+id).addClass("dog2");
    else
        $('#'+id).addClass("dog1");
};





$(".schedule-img").hover(function(){
    var src = $(this).attr("src").substring(0,12);
    src+="1.png";
    $(this).attr("src",src);
});
$(".schedule-img").mouseleave(function(){
    var src = $(this).attr("src").substring(0,12);
    src+="0.png";
    $(this).attr("src",src);
});

$("#btn-mode").click(function(){

    if(!changing){
        changing=true;
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
        setTimeout(function(){changing=false;},duration);
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
    //home=false;
});

// $(".homebtn").click(function(){
//     $("#manu").fadeOut(duration);
// });

$("#btn-home").click(function(){
    setTimeout(function(){$(".homebtn").fadeIn(duration); $("#manu").fadeIn(duration);/*home=true;*/},wait);
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
//     if(!home){
//         $("#manu").fadeOut(duration);
//     }
// });
