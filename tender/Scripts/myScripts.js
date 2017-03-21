var Categories = [];
var arrEditors = [];
var arrType = [];
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
            $('#numProduct').text(parseInt($('#numProduct').text())+1);
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
               
                var orderItem = {
                    numProduct: parseInt($('.numProduct', this).val()),
                    NameProduct: $('product', this).val(),
                    Amount: parseInt($('.quantity', this).val()),
                    sizeRoomy: parseFloat($('.roomy', this).val()),
                    numTender: parseInt($('#tenderNum').val()),
                    PriceLimit: parseFloat($('.price', this).val()),
                    PriceUpdate: parseFloat($('.price', this).val()),
                    DateUpdate:Date.now()
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

LoadCategory($('#productCategory'));
LoadEditor($('#Editors'));

LoadType($('#typeTender'));