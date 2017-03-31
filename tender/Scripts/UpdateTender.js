var url = null;
var list = [];
var arrTenders = [];
var numP = 0;
var Categories = [];
var arrEditors = [];
var arrType = [];
var tender;

function LoadUrl() {

    if (!url) {
        url = window.location.href;
        url = url.substr(url.indexOf('=') + 1);
    }
}
   
    //fetch categories from database
    function LoadCategory(element) {
       
        if (Categories.length == 0) {
            //ajax function for fetch data
            $.ajax({
                type: "GET",
                url: '/home/getProductCategories',
                data: { 'numTender': url },
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

    function getTender() {
        if (!url) {
            url = window.location.href;
            url = url.substr(url.indexOf('=') + 1);
        }
     
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/home/getTender',
            data: { 'numTender': url },
            success: function (data) {
                tender = data;
                //render tender
                renderTender(tender);
                

            }
        })


    }

    function renderTender(tender) {
       // alert(tender.hourStart);
        //if (parseInt(tender.hourStart.Hours) < 10)
        //    sh = "0" + tender.hourStart.Hours;
        //else
        //    sh = tender.hourStart.Hours;
     
        //if (parseInt(tender.hourFinish.Hours) < 10)
        //    fh = "0" + tender.hourFinish.Hours;
        //else
        //    fh = tender.hourFinish.Hours;


        //if (parseInt(tender.hourStart.Seconds) < 10)
        //    ss = "0" + tender.hourStart.Seconds;
        //else
        //    ss = tender.hourStart.Seconds;

        //if (parseInt(tender.hourFinish.Seconds) < 10)
        //    fs = "0" + tender.hourFinish.Seconds;
        //else
        //    fs = tender.hourFinish.Seconds;
    
        //if (parseInt(tender.hourStart.Minutes) < 10)
        //    sm = "0" + tender.hourStart.Minutes;
        //else
        //    sm = tender.hourStart.Minutes;

        //if (parseInt(tender.hourFinish.Minutes) < 10)
        //    fm = "0" + tender.hourFinish.Minutes;
        //else
        //    fm = tender.hourFinish.Minutes;
   
        //var s1 = sh + ":" + sm + ":" + ss;
        //console.log(tender)
        //var s2 = fh + ":" + fm + ":" + fs;



        
        // date is expected to be a date object (e.g., new Date())
        const dateToInput = date =>
            `${date.getFullYear()
            }-${('0' + (date.getMonth() + 1)).slice(-2)
            }-${('0' + date.getDate()).slice(-2)
            }`;

        // str is expected in yyyy-mm-dd format (e.g., "2017-03-14")
        const inputToDate = str => new Date(str.split('-'));
        
        var date1 = new Date(parseInt(tender.from.substr(6)));

        var date2 = new Date(parseInt(tender.till.substr(6)));

        var s = new Date(parseInt(tender.hourStart.substr(6)));

        var f = new Date(parseInt(tender.hourFinish.substr(6)));
        //alert(tender.time_update)
        var myDate1 = s.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        var myDate2 = f.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        $("#tenderNum").val(tender.numTender)
        $("#tenderName").val(tender.name)
        $("#productCategory").val(tender.codCategory)
        //alert("num"+tender.codCategory);
        $("#Editors").val(tender.numEditor)
        $("#typeTender").val(tender.numType)
        $("#typeAcquire option[value='1']").prop('selected', true);
        $("#statatus option[value='2']").prop('selected', true);

      

        $('#from').val(dateToInput(date1));
        $('#till').val(dateToInput(date2));
       // alert(myDate1)
        $("#start").val(myDate1);
        $("#finish").val(myDate2);

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
            var table = document.getElementById("tblProduct");
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
           
            cell1.innerHTML = "<label>" + v.numProduct + "</label>";
            cell2.innerHTML = "<input type=text value=" + v.NameProduct + ">";
            cell3.innerHTML = "<input type=number value=" + v.Amount + ">";
            cell4.innerHTML = "<input type=number value=" + v.sizeRoomy + ">";
            cell5.innerHTML = "<input type=number value=" + v.PriceLimit + ">";
            cell6.innerHTML = "<input type=button class=remove btn-danger value = remove>";
          
        })
        //    var $ele = $(element);
        //$ele.empty();
        //    $ele.append($('<option/>').val('0').text('Select'));
        //   $.each(data, function (i, v) {
        //        $ele.append($('<option/>').val(v.TenderDetailsID).text(v.NameProduct));
        //
    }

    $(document).ready(function () {
        
        //Add button click event
        $('#add').click(function () {
           
            //validation and add order items
            var isAllValid = true;
          
          /*  if ($('#product').val() == "0") {
                isAllValid = false;
                $('#product').siblings('span.error').css('visibility', 'visible');
                alert('isAllValid product' + isAllValid);
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
            }*/

           // if (isAllValid) {
            // var $newRow = $('tr:last-child:last').clone().removeAttr('id');
            if (!url) {
                url = window.location.href;
                url = url.substr(url.indexOf('=') + 1);
            }
         //   alert(numP);
            //ajax function for fetch data
            if (numP == 0) {
               // alert(url);
                $.ajax({
                    type: "GET",
                    url: '/home/getNumOfProd',
                    data: { 'numTender': url },
                    success: function (data) {
                      //  alert(data);
                        numP = data;
                        $('#tblProduct tr:last').after('<tr><td><label>' + numP + '</label><td><input type=text></td><td><input type=text></td><td><input type=number></td><input type=number></td><td><input type=number></td><td> <input type=button class=remove btn-danger value = remove></td></tr>');


                    }
                })
            }
            else {
                //alert(numP);
                numP++;
                $('#tblProduct tr:last').after('<tr><td><label>' + numP + '</label><td><input type=text></td><td><input type=text></td><td><input type=number></td><input type=number></td><td><input type=number></td><td> <input type=button class=remove btn-danger value = remove></td></tr>');

            }

                //remove id attribute from new clone row
                //$('#numProduct,#product,#quantity,#roomy,#price,#add', $newRow).removeAttr('id');
                //$('span.error', $newRow).remove();
                //append clone row
                //$('#tblProduct').append($newRow);

                //clear select data
               
                $('#orderItemError').empty();
            //}

        })

        //remove button click event
        $('#tblProduct').on('click', '.remove', function () {
            $(this).parents('tr').remove();
        });

        $('#submit').click(function () {
            var isAllValid = true;

            //validate order items
          /*  $('#orderItemError').text('');
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
                    alert('pass the iff');
                    errorItemCount++;
                    $(this).addClass('error');
                } else {
                    alert($('#tenderNum').val());
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
            }*/

        
         
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
        

            $("#tblProduct").find('tr').not(':first').each(function () {
                
                var numProduct = $(this).find('td:eq(0) label').text();
                var Product = $(this).find('td:eq(1) input').val();
                var amount = $(this).find('td:eq(2) input').val();
                var roomy = $(this).find('td:eq(3) input').val();
                var priceLimit = $(this).find('td:eq(4) input').val();
              //  alert(numProduct);
                var orderItem = {
                    numTender:$('#tenderNum').val().trim(),
                    numProduct: numProduct,
                    NameProduct: Product,
                    Amount: amount,
                    sizeRoomy: roomy,
                    numTender: parseInt($('#tenderNum').val()),
                    PriceLimit: priceLimit,
                    PriceUpdate: priceLimit,
                
                }
                list.push(orderItem);
               // alert(numProduct + " " + Product + " " + amount + " " + roomy + " " + priceLimit);
                
            });



            if (isAllValid) {
               
                var data = {
                    numTender: $('#tenderNum').val().trim(),
                    name: $('#tenderName').val().trim(),
                    numEditor: $('#Editors').val().trim(),
                    codCategory: $('#productCategory').val().trim(),
                    status: $('#statatus option:selected').val().trim(),
                    typeAcquire: $('#typeAcquire').val().trim(),
                    numType: $('#typeTender').val().trim(),
                    from: $('#from').val().trim(),
                    till: $('#till').val().trim(),
                    hourStart: $("#start").val().trim(),
                    hourFinish: $("#finish").val().trim(),
                    // Description: $('#description').val().trim(),
                    //ProducToTender: list
                }

                $(this).val('Please wait...');

                $.ajax({
                    type: 'POST',
                    url: '/Home/saveUpdateTender',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.status) {
                           // alert('Successfully saved');
                            //here we will clear the form
                            list = [];
                            $('#tenderNum,#tenderName,#from,#til,l,#description').val('');
                            $('#orderdetailsItems').empty();
                           // alert('Successfully 2');

                        }
                        else {
                           // alert('Error');
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
                    url: '/Home/saveProductTender',
                    data: JSON.stringify(list),
                    contentType: 'application/json',
                    success: function (data) {
                        if (data.status) {
                         //   alert('Successfully saved');
                            //here we will clear the form
                            list = [];
                            $('#tenderNum,#tenderName,#from,#til,l,#description').val('');
                            $('#orderdetailsItems').empty();
                           // alert('Successfully 2');

                        }
                        else {
                          //  alert('Error');
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

    LoadUrl();
    getTender();
LoadCategory($('#productCategory'));
LoadEditor($('#Editors'));
LoadType($('#typeTender'));


LoadProduct();