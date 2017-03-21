/// <reference path="suggestion.js" />
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
   //     alert(v.name + " v name");
        // alert(v.till+v.hourFinish+2);

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
       // alert(v.nameType + " type");
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
       // alert(v.NameProduct);
        //alert(v.Amount);
        cell1.innerHTML = v.numProduct;
        cell2.innerHTML = v.NameProduct;
        cell3.innerHTML = v.Amount;
        cell4.innerHTML = '<input id="price" type="text" />'
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

//$(document).on('click','sub1',function () {
//    //Add button click event
//        var d1 = $("[dt]").val();
//        alert(d1);


//            });

//        });

$(document).ready(function () {
    //Add button click event
    $('#submit').click(function () {
        //validation and add order items
        var isAllValid = true;
        if ($('#price').val() == "0") {
            isAllValid = false;
            $('#price').siblings('span.error').css('visibility', 'visible');
            //   alert('isAllValid product' + isAllValid);
        }
        else {
            $('#price').siblings('span.error').css('visibility', 'hidden');
        }
        if (isAllValid) {
            var $newRow = $('#mainrow').clone().removeAttr('id');
            $('.numProduct', $newRow).val($('#numProduct').val());
            $('.product', $newRow).val($('#product').val());
            $('.quantity', $newRow).val($('#quantity').val());
            $('.roomy', $newRow).val($('#roomy').val());
            $('.price', $newRow).val($('#price').val());

            //Replace add button with remove button
            $('#add', $newRow).addClass('remove').val('Remove').removeClass('btn-success').addClass('btn-danger');

            //remove id attribute from new clone row
            $('#numProduct,#product,#quantity,#roomy,#price,#add', $newRow).removeAttr('id');
            $('span.error', $newRow).remove();
            //append clone row
            $('#orderdetailsItems').append($newRow);

            //clear select data
            $('#product').val('');
            $('#numProduct,#quantity,#roomy,#price').val('');
            $('#orderItemError').empty();
        }

    })

    //remove button click event
    $('#orderdetailsItems').on('click', '.remove', function () {
        $(this).parents('tr').remove();
    });

    $('#submit').click(function () {
        var isAllValid = true;

        //validate order items
        $('#orderItemError').text('');
        var list = [];
        var errorItemCount = 0;
        $('#orderdetailsItems tbody tr').each(function (index, ele) {
            if (
                //$('select.product', this).val() == "0" ||
                ($('.numProduct', this).val()) == 0 ||
                (parseInt($('.quantity', this).val()) || 0) == 0 ||
                $('.product', this).val() == "" ||
                (parseInt($('.quantity', this).val()) || 0) == 0 ||
                 (parseInt($('.price', this).val()) || 0) == 0
                ) {
                //  alert('pass the iff');
                errorItemCount++;
                $(this).addClass('error');
            } else {
                // alert($('#tenderNum').val());
                var orderItem = {
                    numProduct: parseInt($('.numProduct', this).val()),
                    NameProduct: $('product', this).val(),
                    Amount: parseInt($('.quantity', this).val()),
                    sizeRoomy: parseFloat($('.roomy', this).val()),
                    numTender: parseInt($('#tenderNum').val()),
                    PriceLimit: parseFloat($('.price', this).val())
                }
                list.push(orderItem);
            }
        })

        if (errorItemCount > 0) {
            $('#orderItemError').text(errorItemCount + " invalid entry in order item list.");
            isAllValid = false;
        }

        if (list.length == 0) {
            $('#orderItemError').text('At least 1 order item required.');
            isAllValid = false;
        }

        if ($('#tenderNum').val().trim() == '') {
            $('#tenderNum').siblings('span.error').css('visibility', 'visible');
            isAllValid = false;
        }
        else {
            $('#tenderNum').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#tenderName').val().trim() == '') {
            $('#tenderName').siblings('span.error').css('visibility', 'visible');
            isAllValid = false;
        }
        else {
            $('#tenderName').siblings('span.error').css('visibility', 'hidden');
        }



        if ($('#from').val().trim() == '') {
            $('#from').siblings('span.error').css('visibility', 'visible');
            isAllValid = false;
        }
        else {
            $('#from').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#till').val().trim() == '') {
            $('#till').siblings('span.error').css('visibility', 'visible');
            isAllValid = false;
        }
        else {
            $('#till').siblings('span.error').css('visibility', 'hidden');
        }

        if (isAllValid) {
            var data = {
                numTender: $('#tenderNum').val().trim(),
                name: $('#tenderName').val().trim(),
                numEditor: $('#Editors').val().trim(),
                codCategory: $('#productCategory').val().trim(),
                status: $('#status').val().trim(),
                typeAcquire: $('#typeAcquire').val().trim(),
                numType: $('#typeTender').val().trim(),
                from: $('#from').val().trim(),
                till: $('#till').val().trim(),
                // Description: $('#description').val().trim(),
                ProducToTender: list
            }

            $(this).val('Please wait...');

            $.ajax({
                type: 'POST',
                url: '/home/save',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (data) {
                    if (data.status) {
                        //  alert('Successfully saved');
                        //here we will clear the form
                        list = [];
                        $('#tenderNum,#tenderName,#from,#til,l,#description').val('');
                        $('#orderdetailsItems').empty();
                        //    alert('Successfully 2');

                    }
                    else {
                        alert('Error');
                    }
                    $('#submit').val('Save');
                },
                error: function (error) {
                    console.log(error);
                    $('#submit').val('Save');
                }
            });
        }

    });

});

LoadProduct();
LoadDTender();
LoadType();

