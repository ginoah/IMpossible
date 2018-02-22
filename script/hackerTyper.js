

var skipHover = false;
var skipAll = false;


$(
    function(){
        $("#skip-button").hover(function() {
            $('#nav-container').toggleClass("pushed");
            $('#skip-button-text').html("Sure?");
            setTimeout(function(){skipHover = true},100);
        });
        $("#skip-button").mouseleave(function() {
            $('#skip-button-text').html("Skip");
        });
        $("#skip-button").click(function() {
            if(skipHover){
                if(skipAll)
                    window.location.assign("./map.html");
                skipAll=true;
                Typer.end();
            }
        });
    }
);



$(
    function(){
        var audio = new Audio('audio/gear.m4a');
        audio.play();
        $( document ).keydown(
            function ( event ) { 
                if(!Typer.garbleding)
                    Typer.addText( event ); //Capture the keydown event and call the addText, this is executed on page load
            }
        );
        $("#console").on("click",function(){Typer.autoAddText(500);});
        Typer.speed=1;
        Typer.init();
        setTimeout(function(){$("#console").fadeIn(2000);},10000);
    }
);


var Typer={
    text: null,
    accessCountimer:null,
    autoAddText:null,
    index:0, // current cursor position
    speed:2, // speed of the Typer
    file:"", //file, must be setted
    accessCount:0, //times alt is pressed for Access Granted
    deniedCount:0, //times caps is pressed for Access Denied
    pass:false,// if the user reach welcome to ntu im !!! 
    garbleding:false,
    lst:"|",
    init: function(){// inizialize Hacker Typer
        accessCountimer=setInterval(function(){Typer.updLstChr();},500); // inizialize timer for blinking cursor
        
        Typer.text = kernel;
    },
    
    content:function(){
        return $("#console").html();// get console content
    },
    
    write:function(str){// append to console content
        $("#console").append(str);
        return false;
    },

    rewrite:function(str){
        var text=$("<div/>").text(str).html();// parse the text for stripping html enities
        var rtn= new RegExp("\n", "g"); // newline regex
        var rts= new RegExp("\\s", "g"); // whitespace regex
        var rtt= new RegExp("\\t", "g"); // tab regex
        $("#console").html(text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
    },

    garbled:function(str,backup){// garblend str
        //garbled str
        Typer.garbleding=true;
        var allright = true;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#(){}<>;\""
        for(i = 0; i < str.length; i++){
            if(str[i] != backup[i]){
                allright = false;
                //
                str = str.substring(0,i) + possible[Math.floor((Math.random() * possible.length))] + str.slice(i+1,str.length);
                
            }
        }
        Typer.rewrite(str);
        if(!allright){
            setTimeout(function(){ Typer.garbled(str,backup); },5);
        }
        else{
            Typer.garbleding=false;
        }
        
    },
    
    addText:function(key){//Main function to add the code
        Typer.typeWriterAudio();
        if(key.keyCode == 192){
            var backup = Typer.text.substring(0,Typer.index);
            var garbledstr = backup;
            garbledstr = garbledstr.replace(/[^\n\s\t\.]/g, "@");//replace all chacracter witch is not space,tab,newline to '@'
            if(!Typer.garbleding){
                Typer.garbled(garbledstr,backup);
                var audio = new Audio('audio/noise.m4a');
                audio.play();
            }
        }else if(Typer.text){ // otherway if text is loaded
            var cont=Typer.content(); // get the console content
            
            if(Typer.index <= Typer.text.length){
                if(cont.substring(cont.length-1,cont.length)==Typer.lst) // if the last char is the blinking cursor
                    $("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text
                if(key.keyCode!=8){ // if key is not backspace
                    Typer.index+=(Typer.speed+2);   // add to the index the speed
                }else{
                    if(Typer.index>0) // else if index is not less than 0 
                        Typer.index-=Typer.speed;// remove speed for deleting text
                }
                Typer.rewrite(Typer.text.substring(0,Typer.index));
                $('#console').scrollTop(1000); // scroll to make sure bottom is always visible
            }else{
                if(!Typer.pass){
                    
                    var backup = Typer.text.substring(0,Typer.index);
                    var garbledstr = backup;
                    garbledstr = garbledstr.replace(/[^\n\s\t\.]/g, "@");//replace all chacracter witch is not space,tab,newline to '@'
                    if(!Typer.garbleding){
                        Typer.garbled(garbledstr,backup);
                        var audio = new Audio('audio/noise.m4a');
                        audio.play();
                    }
                    setTimeout(function(){Typer.pass = true;},3000);
                }
                else{
                    skipAll=true;
                    Typer.end();
                }
            }
        }
        if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
            key.preventDefault();
        };  
        if(key.keyCode != 122){ // otherway prevent keys default behavior
            key.returnValue = false;  
        }
    },

    autoAddText:function(interval){
        { // otherway if text is loaded
            
            var cont=Typer.content(); // get the console content
            
            if(Typer.index <= Typer.text.length){

                if(interval >= 100)
                interval -= 50;
                setTimeout(function(){Typer.autoAddText(interval);},interval);


                if(cont.substring(cont.length-1,cont.length)==Typer.lst) // if the last char is the blinking cursor
                    $("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text
                
                Typer.index+=Typer.speed;   // add to the index the speed
                
                Typer.rewrite(Typer.text.substring(0,Typer.index));
                Typer.typeWriterAudio();
                $('#console').scrollTop(1000); // scroll to make sure bottom is always visible
            }else if(interval == 500){
                if(!Typer.pass){
                    var backup = Typer.text.substring(0,Typer.index);
                    var garbledstr = backup;
                    garbledstr = garbledstr.replace(/[^\n\s\t\.]/g, "@");//replace all chacracter witch is not space,tab,newline to '@'
                    if(!Typer.garbleding){
                        Typer.garbled(garbledstr,backup);
                        var audio = new Audio('audio/noise.m4a');
                        audio.play();
                    }
                    setTimeout(function(){Typer.pass = true;},3000);
                }
                else{
                    $("#skip-button").remove();
                    Typer.end();
                }
            }
        }
    },

    end:function(){
        setTimeout(function(){var audio = new Audio('audio/show.m4a');audio.play();},11000);
        $('#symbol').css("animation","decline 15s 4s ease-in-out both");
        setTimeout(function(){$(".cd-transition-layer .bg-layer ").css("animation","cd-sequence 1.5s steps(24) both")},20000);
        setTimeout(function(){$("#glow1").fadeIn(2000)},8000);
        setTimeout(function(){$("#glow2").fadeIn(2000)},9500);
        setTimeout(function(){$("#glow3").fadeIn(2000)},11000);
        setTimeout(function(){$("#glow4").fadeIn(2000)},12500);
        $('body').css("animation","to-white 5s 10s ease-in both");
        // $('#console').css("animation","console-disappear 1.5s 3s linear both"); 
        $("#console").css("display","initial");
        $("#console").off();
        setTimeout(function(){$("#console").fadeOut(1500);},3000);
        setTimeout(function(){$('#console').remove();},4500);
        clearInterval(accessCountimer);
        $('#console').css("text-align","center");
        var backup = "WELCOME TO NTU IM !!!";
        var garbledstr = backup;
        garbledstr = garbledstr.replace(/[^\n\s\t\.]/g, "@");//replace all chacracter witch is not space,tab,newline to '@'
        if(!Typer.garbleding){
            Typer.garbled(garbledstr,backup);
        }
        $(document).unbind('keydown');
        setTimeout(function(){$('#symbol').remove();window.location.assign("./map.html");},23000);
    },
    updLstChr:function(){ // blinking cursor
        var cont=this.content(); // get console 
        if(cont.substring(cont.length-1,cont.length)==Typer.lst) // if last char is the cursor
            $("#console").html($("#console").html().substring(0,cont.length-1)); // remove it
        else
            this.write(Typer.lst); // else write it
    },
    typeWriterAudio:function(){ // blinking cursor
        var audio = new Audio('audio/typeWriter.m4a');
        audio.play();
    },
}


var kernel = "\
#include <iostream>\n\
using namespace std;\n\
\n\
int main(){\n\
    cout << \"WELCOME TO NTU IM!!!\";\n\
    return 0;\n\
}\n\
\
\
"