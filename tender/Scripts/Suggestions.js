/// <reference path="Suggestions.js" />
/// <reference path="Suggestions.js" />
var url = null;
function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    $.ajax({
        type: "POST",
        url: "/Suggestions/getTender",
        data: { 'numTender': url },
        success: function (data) {
            //   alert("sucsses");
            //render products to appropriate dropdown
            renderDTender($('#numProduct'), data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function renderDTender(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tbldtender");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = v.numTender;
        cell2.innerHTML = v.name;
    }
    )
}


function LoadType(element) {
    if (arrType.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: "/Suggestions/getType",
            success: function (data) {
                arrType = data;
                renderType(element);
            }
        })
    }
    else {
        //render catagory to the element
        renderType(element);
    }
}


function renderType(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tbType");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = v.nameType;
    }
    )
}

function LoadProduct() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    $.ajax({
        type: "POST",
        url: "/Suggestions/getProduct",
        data: { 'numTender': url },
        success: function (data) {

            //render products to appropriate dropdown
            renderProduct($('#numProduct'), data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
//});

function renderProduct(element, data) {
    //render product
    $.each(data, function (i, v) {
        var table = document.getElementById("tblsuggest");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        //=======var cell5 = row.insertCell(4);
        cell1.innerHTML = v.numProduct;
        cell2.innerHTML = v.NameProduct;
        cell3.innerHTML = v.Amount;
        cell4.innerHTML = '<input id="price" type="number" name="prices"/>'
        //========cell5.innerHTML = '<a href="/suggestion/suggestion?numtender='+v.numProduct+'><img src="~/Images/next.jpg" width="50" height="50" /></a>'
    })
    //    var $ele = $(element);
    //$ele.empty();
    //    $ele.append($('<option/>').val('0').text('Select'));
    //   $.each(data, function (i, v) {
    //        $ele.append($('<option/>').val(v.TenderDetailsID).text(v.NameProduct));
    //
}

function clickAndDisable() {

    url1 = window.location.href;

    // disable subsequent clicks
    url1.onclick = function (event) {
        event.preventDefault();
        alert("hello");
    }
}

    




$(document).ready(function () {
    //Add button click event
    $('#submit').click(function () {
        var input = document.getElementsByName("prices");
        for (index = 0; index < input.length; ++index)
        {
            alert(input[index].value);
        }

    })//button 
});

LoadProduct();
LoadDTender();
LoadType();

