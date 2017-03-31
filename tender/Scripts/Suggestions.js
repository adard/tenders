var product = [];
var sizeRoomy = [];
var price = [];
var flag = false;
var url = null;
var isValid = false;
var inputText = [];
var LastSuggest=0;
var LastDetail=0;
var weight = [];
var avg = 0;
var numT;
var flag = 0;
var numCont = 1;
function LoadDTender() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
    numT = url;
    $.ajax({
        type: "POST",
        url: "/Suggestions/getTender",
        data: { 'numTender': url },
        success: function (data) {
            var x = data.includes("close");
            if (!x) {
                renderDTender($('#numProduct'), data);
            }
            else {
                alert("close");
                flag = 1;
                document.getElementById("dd").innerHTML = "המכרז סגור";

            }            //render products to appropriate dropdown
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
        var cell3 = row.insertCell(2);

        cell1.innerHTML = v.numTender;
        cell2.innerHTML = v.name;
        var NewDate = ToJavaScriptDate(v.till);
        cell3.innerHTML = NewDate;
        var NewTime = ToJavaScriptTime(v.hourFinish);

    }
    )
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
    return (dt.getHours()) + ":" + dt.getMinutes();
}

function LoadType(element) {
    if (arrType.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: "/Suggestions/getType",
            success: function (data) {
                if (flag != 1)
                {
                    arrType = data;
                    renderType(element);
                }
                else {
                    alert("close");
                    document.getElementById("dd").innerHTML = "המכרז סגור";
                }


              
            }
        })
    }
    else {
        if (flag != 1) {
            renderType(element);

        }
        else {
            alert("close");
            document.getElementById("dd").innerHTML = "המכרז סגור";
        }
        //render catagory to the element
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
        var cell5 = row.insertCell(3);
        var cell6 = row.insertCell(4);
        var cell4 = row.insertCell(5);
        var cell7 = row.insertCell(6);
         //=======var cell5 = row.insertCell(4);
        cell1.innerHTML = v.numproduct;
        cell2.innerHTML = v.NameProduct;
        cell3.innerHTML = v.Amount;
        cell5.innerHTML = v.priceToProduct + v.sizeRoomy;
        cell6.innerHTML = v.weight;
        var t = ToJavaScriptDate(v.dataSuggestion);
        var d = ToJavaScriptTime(v.dataSuggestion);
        cell4.innerHTML = t+" "+d;
        cell7.innerHTML = '<input id="price" type="number" name="prices"/>'
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
     }
}
function loadNew() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
     //   $("#tenderNum").val(url);

    }
  //  alert("before");
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionDetails1",
        data: { 'numTender': url },
        datatype: "json",
        success: function (data) {
            alert("sucsses");
            //render products to appropriate dropdown
        },
        error: function (error) {
            console.log(error);
        }
    })
}
function loadDetail() {
    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
      //  $("#NumTender").val(url)
    }
    //alert(url);
    $.ajax({
        type: "POST",
        url: "/Suggestions/getSuggestionMax",
        data: { 'numTender': url },
        //complete: function (jqXHR, status) {
        //if (status=='success')
        //},
        success: function (data) {
            renderDetail(data);
          //  alert("renderDetail suceess");
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function renderDetail(data) {
    $.each(data, function (i, v) {
        product[i] = v.numproduct;
        price[i] = v.priceToProduct + v.sizeRoomy;
        weight[i] = v.weight;
    });
   
    flag = true;
 //   alert("i update the weight");
    check();
}


function check() {
    var input = document.getElementsByName("prices");
  //  alert(price.length);
    if (flag = true) {
        for (var index = 0; index < price.length; ++index) {
            inputText[index] = input[index].value;
            if (price[index] < input[index].value);
            if (price[index] > input[index].value) {
                input[index].value = "";
                alert("error ");
                flag = false;
                document.getElementById("error").innerHTML = 'Please enter a Correct Price/s.';
            }
        }
        if (flag = true)
            isValid = true;
   //     alert("isvalid=true");
        findAverage();
    }

    else {
        BlankText();
    }
}

function findLastSuggest() {
   // if (LastSuggest == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/Suggestions/findLastSuggest',
            success: function (data) {
              //  alert("findLastSuggest");
                LastSuggest = data;
                //render NumOfCon
                renderLastSuggestion(data);
            }
        })
   // }
    
}
function findLastDetail() {
    if (LastDetail == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/Suggestions/findLastDetail',
            success: function (data) {
              //  alert("findLastDetail");
                LastDetail = data;
                //render NumOfCon
                renderLastDetail(data);
            //    alert("after ajax last detail " + data);
            }
        })
    }
    else {
        //render NumOfCon to the element
        renderLastDetail(data);
    }
}

function renderLastDetail(data) {
 //   alert("LastDetail " + data);
    $("#LastDetail").val(data)
    LastDetail = data;
}

function renderLastSuggestion(data) {
 //   alert(" data " + data);
    $("#LastSuggest").val(data)
}

function findAverage() {
     avg = 0;
  
    for (var index = 0; index < price.length; ++index) {
   //     avg =  (price[index] * weight[index]);
      //  alert(index);
        var p = price[index];
        var w = weight[index];
        var count = p * w;
     //   alert(count + " count");
        avg = avg + count;
       // alert(avg + " avgerage");
        //alert(weight[index] + " weight[index]");
        //alert(price[index] + "  price[index]");
    }
    var lenght=price.length;
    var avg = Math.floor(avg / lenght);

    //avg = ;
    //alert(" avg final" + avg);

    $("#avg").val(avg)
    next();
}
 
function BlankText() {
    for (var index = 0; index < price.length; ++index) {
        input[index].value = "";
        document.getElementById("error").innerHTML = 'Error with the value Please Renter the price/s.';
    }

}
function next()
{
    var d1 = Date.now();
    $("#dateNow").val(d1)
    alert(d1 + " date boulette");
    if (isValid == true) {
      //  alert(" after  if ");
    var suggestion = {
                numSuggestion: $("#LastSuggest").val(),
                numTender: numT,
                numCont:numCont,
                priceToproduct: $("#avg").val(),
                dataSuggestion: new Date(),

            }
         //   alert("save please");
          //  alert(suggestion);
    $.ajax({
        type: 'POST',
        url: '/Suggestions/save',
        data: JSON.stringify(suggestion),
        contentType: 'application/json',
        success: function (data) {
            if (data.status) {
                alert('Successfully saved');
                //here we will clear the form

                //$('#LastDetail,#LastSuggest,product[i],price[i]').val('');
                //location.reload();

            }
            else {
                alert('Error');
            }

        },
        error: function (error) {
            console.log(error);

        }
    });

            LastDetail = LastDetail - 1;

 
            for(var i=0;i<price.length;++i)
            {
                LastDetail = LastDetail + 1;

             //   alert("helo last detail");
                var t = $("#LastDetail").val()
//alert(x + " last detail val ll");
                var suggestionDetail = {
                    numDetailSuggestion:LastDetail,
                    numsuggest: $("#LastSuggest").val(),
                    numproduct: product[i],
                    priceToProduct: inputText[i],
                 }
                
       //         alert(suggestionDetail);
                $.ajax({
                    type: 'POST',
                    url: '/Suggestions/saveDetail',
                    data: JSON.stringify(suggestionDetail),
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


             


            }//for
             window.location.href = '/Client/Tenders';

    }
}

$(document).ready(function () {
    //Add button click event
    $('#submit').click(function () {
        loadDetail();
        findLastDetail();
        findLastSuggest();
       // setTimeout(hello, 10000);
  
    })//button 
});
LoadDTender();

LoadProduct();
LoadType();

 