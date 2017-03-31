
var Contes = [];
var Tenders = [];
function LoadCon(element) {
    if (Contes.length == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/conToTender/getcon',
            success: function (data) {
                Contes = data;
                //render catagory
                renderCon(element, data);
            }
        })
    }
    else {
        //render catagory to the element
        renderCon(element, data);
    }
}

function renderCon(element, data) {
    $.each(data, function (i, v) {
        var table = document.getElementById("tblcon");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = v.numCon;
        cell2.innerHTML = v.nameCont;
        cell3.innerHTML = v.familyCont;
        cell4.innerHTML = '<input type="checkbox" id="inTen"/>'


    })
}

function loadTenders() {
    $.ajax({
        type: "POST",
        url: "/Client/getDetail",
        success: function (data) {
            //render products to appropriate dropdown
            Tenders = data;
            console.log(Tenders);
            renderDTender();

        },
        error: function (error) {
            console.log(error);
        }
    });
}
function renderDTender() {

    var $ele = $("#tenderNum");
    $ele.empty();
    $ele.append($('<option/>').val('0').text('Select'));
    $.each(Tenders, function (i, val) {
        $ele.append($('<option/>').val(val.numTender).text(val.numTender));
    })

}
$(document).ready(function () {
    var list = [];
    var arrayOfValues = [];
    var tableControl = document.getElementById('tblcon');
    $("#save").click(function () {
        if ($('#tenderNum').find(":selected").text() != 'Select') {
            $('input:checkbox:checked', tableControl).each(function () {
                arrayOfValues.push($(this).closest('tr').find('td:first').text());
            }).get();

            $.each(arrayOfValues, function (i, v) {
                var item = {
                    numCon: v,
                    numTender: $("#tenderNum").val(),
                }
                list.push(item);
            });
            console.log(list);
            $.ajax({
                type: 'POST',
                url: '/conToTender/save',
                data: JSON.stringify(list),
                contentType: 'application/json',
                success: function (data) {
                    if (data.status) {
                      //  alert('Successfully saved');
                        //here we will clear the form
                        list = [];


                    }
                    else {
                     //   alert('Error');
                    }

                },
                error: function (error) {
                    console.log(error);

                }
            });

        }
        else
            alert("please select num tender");






    });
    /* $("#search").change(function () {
         $.each(Contes, function (i, v) {
             var table = document.getElementById("tblcon");
             //table.innerHTML = '';
             alert(v.numCon == $("#search").val())
             if (v.numCon == $("#search").val()) {
                 var row = table.insertRow(i + 1);
                 var cell1 = row.insertCell(0);
                 var cell2 = row.insertCell(1);
                 var cell3 = row.insertCell(2);
                 var cell4 = row.insertCell(3);
                 cell1.innerHTML = v.numCon;
                 cell2.innerHTML = v.nameCont;
                 cell3.innerHTML = v.familyCont;
                 cell4.innerHTML = '<input type="checkbox" id="inTen"/>'
             }


         })
     })*/
});

function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblcon");
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

LoadCon();
loadTenders();

