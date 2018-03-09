
$(
    function(){

        
        detectos();
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
        move("convene4",3000);
        move("activity",2000);
        move("art",3700);
        move("editor",1900);
        move("course",3000);
        move("mis",3180);
        move("accompany",5750);
    }
)


function detectos(){
    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

    if(OSName == "Windows"){
        $("#convene1").css("top","9.7vw").css("left","29.5vw");
        $("#convene2").css("left","15vw");
        $("#convene3").css("width","13.5vw");
        $("#convene4").css("top","23vw").css("left","51.5vw");
        $("#activity-back").css("top","49vw").css("width","18.3vw");
        $("#activity").css("top","54vw").css("width","18.3vw");
        $("#finance").css("width","9vw").css("top","59vw").css("left","20vw");
        $("#editor").css("top","49vw").css("left","29.3vw");
        $("#course-back").css("top","49vw");
        $("#course").css("top","55vw");
        $("#art").css("top","69vw").css("width","20vw").css("height","19vw");
        $("#mis").css("top","88.8vw").css("width","13.5vw");
        $("#accompany").css("top","88.8vw").css("left","43.8vw");
    }
};
function move(id,time){
    var src = $("#"+id).attr("src");
    var len = src.length;
    var filetype = src.substring(len-3,len);
    var file = src.substring(0,len-3);
    if(filetype == "jpg"){
        $("#"+id).attr("src",file+"gif");
        setTimeout(function(){$("#"+id).attr("src",file+"jpg");},time);
        setTimeout(function(){move(id,time);},(Math.random()*20+time/1000)*1000);
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
