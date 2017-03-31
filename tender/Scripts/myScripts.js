var Categories = [];
var arrEditors = [];
var arrType = [];
var arrTenders = [];
var flag = 0;
//fetch categories from database
function LoadCategory(element) {

    if (Categories.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/home/getProductCategories',
            success: function (data) {
                Categories = data;
                //render catagory
                renderCategory(element);

            }
        })
    }
    else {
        //render catagory to the element
        renderCategory(element);
    }
}

function renderCategory(element) {
    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Categories, function (i, val) {
        $ele.append($('<option/>').val(val.codeCategory).text(val.nameCategory));
    })
}

//fetch Editors from database
function LoadEditor(element) {
    if (arrEditors.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/home/getEditor',
            success: function (data) {
                arrEditors = data;

                //render Editor
                renderEditors(element);

            }
        })
    }
    else {
        //render catagory to the element
        renderEditors(element);
    }

}

function renderEditors(element) {

    var $ele = $(element);
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(arrEditors, function (i, val) {
        $ele.append($('<option/>').val(val.numEditor).text(val.nameEditor));
    })

}
//fetch tender type from database
function LoadType(element) {

    if (arrType.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/home/getType',
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

function renderType(element) {

    var $ele = $(element);
    $ele.empty();

    $ele.append($('<option/>').val('0').text('Select'));
    $.each(arrType, function (i, val) {
        $ele.append($('<option/>').val(val.numType).text(val.nameType));
    })
}
////fetch products
//function LoadProduct(categoryDD) {
//    $.ajax({
//        type: "GET",
//        url: "/home/getProducts",
//        data: { 'categoryID': $(categoryDD).val() },
//        success: function (data) {
//            //render products to appropriate dropdown
//            renderProduct($(categoryDD).parents('.mycontainer').find('select.product'), data);
//        },
//        error: function (error) {
//            console.log(error);
//        }
//    })
//}

//function renderProduct(element, data) {
//    //render product
//    var $ele = $(element);
//    $ele.empty();
//    $ele.append($('<option/>').val('0').text('Select'));
//    $.each(data, function (i, val) {
//        $ele.append($('<option/>').val(val.ProductID).text(val.ProductName));
//    })
//}


var url = null;
//function LoadDTender() {

//    if (!url) {
//        url = window.location.href;
//        url = url.substr(url.indexOf('=') + 1);

//    }
//    //alert(url);
//    $.ajax({
//        type: "POST",
//        url: "/home/getDetail",
//        success: function (data) {
//            //  alert("sucsses");
//            //render products to appropriate dropdown
//            renderDTender(data);
//        },
//        error: function (error) {
//            console.log(error);
//            alert(error);
//        }
//    })
//}
//function renderDTender(data) {
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
        if (table != undefined) {
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            var cell3 = row.insertCell(1);
            var cell5 = row.insertCell(2);
            var cell6 = row.insertCell(3);
            var cell7 = row.insertCell(4);
            var cell8 = row.insertCell(5)
            //var cell9 = row.insertCell(6);
            //var cell10 = row.insertCell(6)
            var cell11 = row.insertCell(6)
            var cell12 = row.insertCell(7)

            cell1.innerHTML = v.numTender;
            cell3.innerHTML = v.name;
            cell5.innerHTML = v.typeAcquire;
            cell6.innerHTML = v.nameEditor;
            cell7.innerHTML = v.nameCategory;
            cell8.innerHTML = v.nameType
            // cell9.innerHTML = new Date(v.till.match(/\d/)[0] * 1).toLocaleDateString();
            //  cell10.innerHTML =new Date(v.from.match(/\d/)[0] * 1).toLocaleDateString();
            cell11.innerHTML = v.status;
            var href = "UpdateTender?id=" + v.numTender;
            cell12.innerHTML = "<a href=" + href + ">עדכן</a>";

        }


    }
    )
}




//    $.each(data, function (i, v) {
//        for (j = 0; j < arrEditors.length; j++) {
//            if (v.numEditor == arrEditors[j].numEditor) 
//                var editor = arrEditors[j].nameEditor;   
//        }
//        for (j = 0; j < Categories.length; j++) {
//            if (v.codCategory == Categories[j].codeCategory)
//                var cat = Categories[j].nameCategory;
//        }
//        for (j = 0; j < arrType.length; j++) {
//            if (v.numType == arrType[j].numType)
//                var ty = arrType[j].nameType;
//        }



//        var table = document.getElementById("table1");
//        var row = table.insertRow(i + 1);
//        var cell1 = row.insertCell(0);
//        var cell3 = row.insertCell(1);
//        var cell5 = row.insertCell(2);
//        var cell6 = row.insertCell(3);
//        var cell7 = row.insertCell(4);
//        var cell8 = row.insertCell(5)
//        //var cell9 = row.insertCell(6);
//        //var cell10 = row.insertCell(6)
//        var cell11 = row.insertCell(6)
//        var cell12 = row.insertCell(7)

//        cell1.innerHTML = v.numTender;
//        cell3.innerHTML = v.name;
//        cell5.innerHTML = v.typeAcquire;
//        cell6.innerHTML = editor;
//        cell7.innerHTML = cat;
//        cell8.innerHTML = ty
//        // cell9.innerHTML = new Date(v.till.match(/\d/)[0] * 1).toLocaleDateString();
//        //  cell10.innerHTML =new Date(v.from.match(/\d/)[0] * 1).toLocaleDateString();
//        cell11.innerHTML = v.status;
//        var href = "UpdateTender?id=" + v.numTender;
//        cell12.innerHTML = "<a href=" + href + ">עדכן</a>";




//    }
//    )
//}

$(document).ready(function () {
    //Add button click event
    $('#add').click(function () {
        //validation and add order items
        var isAllValid = true;
        if ($('#product').val() == "0") {
            isAllValid = false;
            $('#product').siblings('span.error').css('visibility', 'visible');
            alert('isAllValid product');
            log("hkluhfkuheklhkleh");
        }
        else {
            $('#product').siblings('span.error').css('visibility', 'hidden');
        }
        if (!($('#quantity').val().trim() != '' && (parseInt($('#quantity').val()) || 0))) {
            isAllValid = false;
            $('#quantity').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#quantity').siblings('span.error').css('visibility', 'hidden');
        }
        if ($('#roomy').val() == "0") {
            isAllValid = false;
            $('#roomy').siblings('span.error').css('visibility', 'visible');
        }
        else {
            $('#roomy').siblings('span.error').css('visibility', 'hidden');
        }

        if (!($('#price').val().trim() != '' && (parseInt($('#quantity').val()) || 0))) {
            isAllValid = false;
            $('#price').siblings('span.error').css('visibility', 'visible');
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
            $('#numProduct').text(parseInt($('#numProduct').text()) + 1);
            $('#quantity,#roomy,#price').val('');
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
                ($('.numProduct', this).text()) == '0' ||
                (parseInt($('.quantity', this).val()) || 0) == 0 ||
                $('.product', this).val() == "" ||
                (parseInt($('.quantity', this).val()) || 0) == 0 ||
                 (parseInt($('.price', this).val()) || 0) == 0
                ) {
                //  alert('pass the iff');
                errorItemCount++;
                $(this).addClass('error');
                alert();
            } else {
                // alert($('#tenderNum').val());
                alert($('.numProduct', this).text());
                var orderItem = {
                    numProduct: parseInt($('.numProduct', this).text()),
                    NameProduct: $('.product', this).val(),
                    Amount: parseInt($('.quantity', this).val()),
                    sizeRoomy: parseFloat($('.roomy', this).val()),
                    numTender: parseInt($('#tenderNum').val()),
                    PriceLimit: parseFloat($('.price', this).val()),
                    PriceUpdate: parseFloat($('.price', this).val()),
                    weight: parseFloat($('.weight', this).val()),
                    DateUpdate: new Date(),

                }
                list.push(orderItem);
            }
        });

        if (errorItemCount > 0) {
            $('#orderItemError').text(errorItemCount + " invalid entry in order item list.");
            isAllValid = false;
        }

        if (list.length == 0) {
            $('#orderItemError').text('At least 1  item required.');
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
                    time_update: $('#time_update').val().trim(),
                    hourStart: $("#hourStart").val().trim(),
                 }
               
            }
            $(this).val('Please Wait...');

            $.ajax({
                type: 'POST',
                url: '/home/save',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (data) {
                    if (data.status) {
                         //here we will clear the form
                        list = [];
                        //$('#tenderNum,#tenderName,#from,#till,#description').val('');
                        //$('#orderdetailsItems').empty();
                        //    alert('Successfully 2');

                    }
                    else {
                        alert('Error To save tender');
                    }
                    $('#submit').val('Save');
                },
                error: function (error) {
                    console.log(error);
                    $('#submit').val('Save');
                }
            });
            $.ajax({
                type: 'POST',
                url: '/home/saveP',
                data: JSON.stringify(list),
                contentType: 'application/json',
                success: function (data) {
                    if (data.status) {
                         //here we will clear the form
                        list = [];
                        //$('#tenderNum,#tenderName,#from,#till,#description').val('');
                        //$('#orderdetailsItems').empty();
                        //    alert('Successfully 2');

                    }
                    else {
                        alert('Error to product');
                    }
                    $('#submit').val('Save');
                },
                error: function (error) {
                    console.log(error);
                    $('#submit').val('Save');
                }
            });
        

    });

});
LoadType($('#typeTender'));
LoadEditor($('#Editors'));
LoadCategory($('#productCategory'));
LoadDTender();
