var prices = [];
var url = null;
var sRommy = [];
var numproduct = [];
var myvar;
var flag = 0;
var cell1 = [];
var cell2 = [];
var cell3 = [];
var numCont=1;

function time(x, time) {
    var diff = (time - x) * 1000;
    //   alert(diff+" diff");
    setTimeout(function () {
         //  alert("this the message for fun set time out");
    }, diff);
    timeInterval(time);
}

function timeInterval(time) {
 
    var setTime = time * 1000;
    //  alert(time + " time timer");
    setInterval(function () {
        $.ajax({
            type: "POST",
            url: "/Suggestions/ChangePrice",
            data: { 'numTender': url },
            success: function (data) {
            },
            error: function (error) {
                console.log(error);
            }
        })
        LoadAgain();
    }, (120000));
}



function changePrice(x) {

    for (var i = 0; i < x; i++) {
        if (!url) {
            url = window.location.href;
            url = url.substr(url.indexOf('=') + 1);
        }

        $.ajax({
            type: "POST",
            url: "/Suggestions/ChangePrice",
            data: { 'numTender': url },
            success: function (data) {
            },
            error: function (error) {
                console.log(error);
            }
        })
    }//for

    LoadAgain();

}


function LoadTime() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);

    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/LoadTime",
        dataType: 'json',
        data: { 'numTender': url },
        success: function (data) {
            // alert("update");
            updateTime(data);

        },
        error: function (error) {
            console.log(error);
        }
    })
}

function LoadAgain() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);

    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionDetail",
        dataType: 'json',
        data: { 'numTender': url },
        success: function (data) {
            //render products to appropriate dropdown
            var x = data.includes("close");
            if (!x) {
                renderAgain(data);
            }
            else {
                document.getElementById("dd").innerHTML = "המכרז סגור";
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderAgain(data) {
    //  alert("again");

    $.each(data, function (i, v) {


        var table = document.getElementById("t01");
        //table.rows[i].cells[0].innerHTML = "helllllo";
        ////table.rows[i].cells[1].innerHTML = v.PriceUpdate;
        ////table.rows[i].cells[2].innerHTML = v.Amount;
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = v.NameProduct;
        cell2.innerHTML = v.PriceUpdate;
        cell3.innerHTML = v.Amount;
 



    })

}



function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);

    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionDetail",
        dataType: 'json',
        data: { 'numTender': url },
        success: function (data) {
            //render products to appropriate dropdown
            var x = data.includes("close");
            if (!x) {
                renderDTender(data);
            }
            else {
                document.getElementById("dd").innerHTML = "המכרז סגור";
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderDTender(data) {
    LoadTime();

    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("t01");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
     
        cell1.innerHTML = v.NameProduct;
        cell2.innerHTML = v.PriceUpdate;
        cell3.innerHTML = v.Amount;
    })
}


function updateTime(data) {
    var time_update;
    $.each(data, function (i, v) {
        //
        if (flag == 0) {
            var my_date = ConvertJSONDateToDate(v.DateUpdate);
            //alert(JSON.stringify(v.time_update));
            var j = JSON.stringify(v.time_update);
            var json = $.parseJSON(j);
            $(json).each(function (i, val) {
                $.each(val, function (k, v) {
                    if (k == "TotalMilliseconds")
                        time_update = v;
                });
            });
            var diff = checkTime(my_date);
            //var count = diff + 1;
            var count = Math.floor(diff / time_update);
            //   alert(count + " count");
            if (count > 0) {
                  // alert("update time and the count  " + count);
                changePrice(count);
            }
            var module = diff % time_update;
            //   alert(module + "  module");

            time(module, time_update);
            //   alert(time_update + " time ");
            flag = 1;


        }
    })
}

function ConvertJSONDateToDate(jsonDate) {
    var dateSlice = jsonDate.slice(6, 24);
    var milliseconds = parseInt(dateSlice);
    var date = new Date(milliseconds);
    return date;
}

function checkTime(s) {
    var date = new Date();
    var diff = Math.abs(date - s);
    return diff;

}
function ToJavaScriptDate(value) { //To Parse Date from the Returned Parsed Date
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}
function ToJavaScriptTime(value) { //To Parse Date from the Returned Parsed Date
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getHours()) + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ":" + dt.getMilliseconds();
}
function stopTender() {

    $.ajax({
        type: "POST",
        url: "/Suggestions/stopTender",
        data: { 'numTender': url },
        success: function () {
            // alert("Tender stoped!");
            $("#stop").Attr('disabled');
            //render products to appropriate dropdown
            // renderDTender(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}


$(document).ready(function () {
    //Add button click event
    $('#stop').click(function () {
            url = window.location.href;
            url = url.substr(url.indexOf('=') + 1);

               var tender =
       {
            numTender:url,
            winner: numCont,
            till:new Date(),
         }
        $.ajax({
            type: 'POST',
            url: '/Suggestions/updateTender',
            data: JSON.stringify(tender),
            contentType: 'application/json',
            success: function (data) {
                //if (data.status) {
                ////    alert('Successfully saved');
                //    //here we will clear the form

                //    //$('#LastDetail,#LastSuggest,product[i],price[i]').val('');
                //    //location.reload();
                           
                //}
                //else {
                // //   alert('Error');
                //}

            },
            error: function (error) {
                console.log(error);

            }
        });


             


              window.location.href = '/Client/Tenders';

        // setTimeout(hello, 10000);

    })//button 
});
LoadDTender();
