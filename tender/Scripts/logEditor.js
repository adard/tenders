/// <reference path="C:\Users\user\Desktop\tender 0703\tender\Views/Home/Add_Tender.cshtml" />
/// <reference path="logEditor.js" />
   
    function goto()
    {
        var data = {
            passEditor: $("#password").val(),
            nameEditor: $("#userName").val()
        }

        $.ajax({
            type: "POST",
            url: '/home/log',
            data: data,
            success: function (data) {
                num = data;
                document.cookie = "user=" + num;
                if (num != -1) {
                    alert("the user is not exist ");
                    //$.ajax({
                    //    type: "GET",
                    //    url: '/home/Add_Tender'
                        
                    //});
                    window.location.href ='/Home/MyTenders';
                }

            }
        });

  

       
    }
              