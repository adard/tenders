 
//$('.message a').click(function () {
//    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
//});

function clicki()
{
    var text = [];
    var data =
        {
        userNameCont: $('#user').val().trim(),
        passCont: $('#password').val().trim(),
        }
   //var u = document.getElementById("user").value;
   //  var p = document.getElementById("password").value;
   //    text [0] = document.getElementById("user").value;
   //    text [1]= document.getElementById("password").value;
    $.ajax({
        type: 'POST',
        url: '/Login/CheckPassword',
        data: JSON.stringify(data),
        contentType: 'application/json', success: function (data) {
             //here we will clear the for
            if (data != -1)
            {
             ///   alert(data);
                //document.cookie = "user=" + data;
                //user = document.cookie;
                //// user = $.cookie("user")
                //alert("cookie");
                //alert(user + " user");
                //alert(user.split("=")[1]);
                 window.location.href = '/Client';

            }
             if (data == -1)
            {
                 document.getElementById("user").value="";
                 document.getElementById("password").value = "";
                 document.getElementById("error").innerHTML = 'The User or Password not correct';

            }
        },
        error: function (error) {
            console.log(error);

        }
    });
}

 

