
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9pLlMbTPrpIriWrRrHj89aiLo0viRYmo",
    authDomain: "ntu-im-camp-2018.firebaseapp.com",
    databaseURL: "https://ntu-im-camp-2018.firebaseio.com",
    projectId: "ntu-im-camp-2018",
    storageBucket: "ntu-im-camp-2018.appspot.com",
    messagingSenderId: "63894631558"
  };
  firebase.initializeApp(config);

var database = firebase.database();


$(".submit").on("click",function(){
    writeUserData("31","gino","a@a.com","url");
});

function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
      });
}

// // Custom method to validate username
$.validator.addMethod("usernameRegex", function(value, element) {
  return this.optional(element) || /^[a-zA-Z0-9]*$/i.test(value);
}, "Username must contain only letters, numbers");
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var exclamation = "<i class='fa fa-exclamation-triangle warning' aria-hidden='true'></i><span class='warning' style='font-family:Microsoft JhengHei'>";
$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

$(".next").click(function(){
  var form = $("#msform");
  form.validate({
    rules: {
      check:{required:true}, //radio
      username:{required:true},
      gender:{required:true}, //radio
      birthday:{required:true,date:true,dateISO:true},
      password:{required:true},
      bloodType:{required:true}, //radio
      school:{required:true},
      grade:{required:true}, //radio
      type:{required:true}, //radio
      vegan:{required:true}, //radio
      mSpecial:{required:true}, //radio
      mSpecialText:{required:'#mSpecial-yes:checked'},
      sSpecial:{required:true}, //radio
      sSpecialText:{required:'#sSpecial-yes:checked'},
      size:{required:true}, //radio
      tel:{required:true,digits:true},
      facebook:{required:true},
      email:{required:true,email:true},
      emergencyContact:{required:true},
      emergencyRel:{required:true},
      emergencyTel:{required:true,digits:true},
      selfIntro:{required:true,maxlength:180},
      mot:{required:true,maxlength:180},
      demand:{required:true,maxlength:180},
    },
    messages: {
      mSpecialText:{
        required: exclamation + "請詳述</span>"
      },
      sSpecialText:{
        required: exclamation + "請詳述</span>"
      },
      facebook:{
        required: exclamation + "此欄位為必填，若無請填'無'</span>"
      }
    },
    errorPlacement: function(error, element){
      error.appendTo( element.parents('.form-group') );
    }
  });
  if ($("#msform").valid() === true){
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50)+"%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          'transform': 'scale('+scale+')',
          'position': 'absolute'
        });
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800,
      complete: function(){
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });
  }
});

// 用來修改預設的規則的錯誤文字;
jQuery.extend(jQuery.validator.messages, {
  required: exclamation + "此欄位必填</span>",
  remote: exclamation + "Please fix this field</span>",
  email: exclamation + "請輸入正確的 Email 信箱</span>",
  date: exclamation + "請輸入正確的日期</span>",
  dateISO: exclamation + "請輸入正確的日期格式</span>",
  number: exclamation + "本欄位請填入數字</span>",
  digits: exclamation + "本欄位請填入數字</span>",
  equalTo: exclamation + "請再次輸入相同的值</span>",
  maxlength: exclamation + "至多輸入 150 個字</span>",
  minlength: $.validator.format(exclamation + "至少輸入 {0} 個字</span>"),
  rangelength: $.validator.format(exclamation + "請輸入 {0} 到 {1} 個字</span>"),
  range: $.validator.format(exclamation + "請輸入 {0} 到 {1} 的數字</span>"),
  max: $.validator.format(exclamation + "請輸入小於等於 {0} 的值</span>"),
  min: $.validator.format(exclamation + "請輸入大於等於 {0} 的值</span>"),
  // notEqualsto:"此處請勿留白"
});

$(".submit").click(function(){
    //Submission starts from here.
  if($('#msform').valid() === false){
    event.preventDefault();
    return false;
  }
  event.preventDefault();
    var reg = $('#msform').serializeObject();
    $.ajax({
        type: 'POST',
        url: './register',//到時候會變成正確的位置
        data: JSON.stringify(reg),
        success: function(data,Textmsg){
      console.log(data)
      if(data.msg=="success"){
        $("#regpopup").fadeIn();
        return $("#regpopup").addClass('activePopup');

      }
      else{
        alert("請洽粉專管理團隊：\n"+data.msg.message);
        return window.location = "./register";
      };

        },
        contentType: "application/json",
        dataType: 'json'
    });



})

// 當點擊popup上的"OK!"按鈕，popup會關閉，並連結到首頁
$(document).on('click', "#regpopBtn", function() {
  location.href = "/";
});

// 查看尺寸表
$("#checkSize").hover(function(){
  $("#clothSize").addClass('activePopup');
  $("#clothSize").fadeIn(500);
})
$("#clothSize").mouseleave(function(){
  $("#clothSize").fadeOut('fast');
})
