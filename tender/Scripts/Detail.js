﻿
var url = null;
function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);

    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/home/getDetail",
        success: function (data) {
          //  alert("sucsses");
            //render products to appropriate dropdown
            renderDTender(data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
function renderDTender(data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("table1");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell3 = row.insertCell(1);
        var cell5 = row.insertCell(2);
        var cell6 = row.insertCell(3);
        var cell7 = row.insertCell(4);
        var cell8 = row.insertCell(5)
        var cell9 = row.insertCell(6);
        var cell11 = row.insertCell(7);
        var cell12 = row.insertCell(8);

        cell1.innerHTML = v.numTender;
        cell3.innerHTML = v.name;
        cell5.innerHTML = v.typeAcquire;
        cell6.innerHTML = v.nameEditor;
        cell7.innerHTML = v.nameCategory;
        cell8.innerHTML = v.nameType
        var date1 = ToJavaScriptDate(v.from);
       //  var date2 = ToJavaScriptDate(v.till);
       //  var time2 = ToJavaScriptTime(v.hourFinish);
        cell9.innerHTML = date1;
     //   cell10.innerHTML = date2;
       cell11.innerHTML = v.status;
        var href = "UpdateTender?id=" +v.numTender;
        cell12.innerHTML = "<a href="+href+">עדכן</a>";

        
        
    
    }
    )
}


function ToJavaScriptDate(value) {
     var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}
function ToJavaScriptTime(value) { //To Parse Date from the Returned Parsed Date
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getHours()) + ":" + dt.getMinutes();
}

function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

LoadDTender();


