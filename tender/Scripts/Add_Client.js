var numOfCon = 0;

function findLastCon() {
    if (numOfCon == 0) {
        //ajax function for fetch data
        $.ajax({
            type: "GET",
            url: '/Client/getNumOfCon',
            success: function (data) {
                numOfCon = data;
                //render NumOfCon
                renderNumOfCon(data);
            }
        })
    }
    else {
        //render NumOfCon to the element
        renderNumOfCon(data);
    }
}
function renderNumOfCon(data) {
    $("#numCon").val(data)
}


$(document).ready(function () {
    $("#add").click(function () {
        var costumer = {
            numCon: $("#numCon").val(),
            userNameCont: $("#nameCompanyCont").val(),
            passCont: $("#numCon").val(),
            nameCont: $("#nameCont").val(),
            familyCont: $("#familyCont").val(),
            nameCompanyCont: $("#nameCompanyCont").val(),
            Seniority: $("#Seniority").val(),
            addressCont: $("#adressCont").val(),
            phoneCont: $("#phoneCont").val(),
            tellOfiiceCont: $("#tellOfficeCont").val(),
            emailCont: $("#emailCont").val(),
            area: $("#area").val(),
        }
      //  alert(costumer);
        $.ajax({
            type: 'POST',
            url: '/Client/save',
            data: JSON.stringify(costumer),
            contentType: 'application/json',
            success: function (data) {
                if (data.status) {
                  //  alert('Successfully saved');
                    //here we will clear the form

                    $('#numCon,#nameCont,#familyCont,#nameCompanyCont,#Seniority,#adressCont,#phoneCont,#tellOfficeCont,#emailCont,#area').val('');
                    location.reload();

                }
                //else {
                //    alert('Error');
                //}

            },
            error: function (error) {
                console.log(error);

            }
        });
    });

});
findLastCon();
