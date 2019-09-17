/*
 *
 * var radioButtons = document.getElementsByName("rc");
 for (var x = 0; x < radioButtons.length; x ++) {
 if (radioButtons[x].checked) {
 console.log(radioButtons[x].value);
 if(radioButtons[x].value == "user")
 {
 var mappa = document.getElementById('mappaFile');
 var mappaFile = mappa.value;
 console.log(mappa.value);
 var ext = mappaFile.substring(mappaFile.lastIndexOf('.') + 1);
 console.log(mappa.value+"ext"+ext);
 if( ext !== "tab" ||  )
 {
 fileMappaUploadError = true;

 }
 }
 }
 }*
 * var fileMappaUploadError= false;
 *
 */
function validateForm()
{
    var checkboxError = true;
    var chkErrorForLd= true;
    var uploadBedFileError = false;
    var supportedGenome = true;
    var chkErrorForMappa = true;

    var filterValueError = false;
    var filterValueError2 = false;

    var fup = document.getElementById('uploadfile').value;
    var name = document.getElementById('outname');
    console.log(name.value);
    console.log(fup.value);





    if(fup==null || fup==undefined || fup=='')
    {
        uploadBedFileError = true;
    }

    var sglist= document.getElementById("sglist");
    var sglistIndex = sglist.selectedIndex;




    if(sglistIndex != 0)
    {

        supportedGenome = false;

    }

    var no =document.getElementById('filter');
    var numValue = Number(no.value);
    console.log(numValue);
    console.log(no.value);

    if(numValue < 30)
    {

        filterValueError = true;
        console.log(filterValueError);
    }
    else if(isNaN(numValue) )
    {
        filterValueError2 = true;
        console.log(filterValueError2);
    }





    for(var i=0; i < document.upform.slist.length; i++)
    {
        if(document.upform.slist[i].checked)
        {
            checkboxError = false;
        }
    }


    for(var i=0; i < document.upform.ld.length; i++)
    {
        if(document.upform.ld[i].checked)
        {
            console.log(document.upform.ld[i]);
            chkErrorForLd = false;
        }
    }

    for(var i=0; i < document.upform.ismappable.length; i++)
    {
        if(document.upform.ismappable[i].checked)
        {
            console.log(document.upform.ld[i]);
            chkErrorForMappa = false;
        }
    }
    var sglist= document.getElementById("sglist");
    var sglistIndex = sglist.selectedIndex;
    var selection = sglist.options[sglistIndex].value;
    if(selection == "rn4" || selection == "mm10" ||selection == "dm3"){

        chkErrorForMappa = false;

    }


    if(uploadBedFileError)
    {
        alert("Please upload Bed file");
    }
    else if(supportedGenome)
    {
        alert("Please select a Supported genome");
    }

    else if(checkboxError)
    {
        alert("Please select a Supported geneset");
    }

    else if (filterValueError)
    {
        alert("Please provide number greater than 30");
    }
    else if (filterValueError2)
    {
        alert("Please provide numeric value filter.");
    }
    else if(chkErrorForMappa)
    {
        alert("Please select Mappability of the gene locus regions");
    }
    else
    {
        loadOnSubmit();
    }

}

function getCheckedValue(radioObj) {
    if(!radioObj)
        return "";
    var radioLength = radioObj.length;
    if(radioLength == undefined)
        if(radioObj.checked)
            return radioObj.value;
        else
            return "";
    for(var i = 0; i < radioLength; i++) {
        if(radioObj[i].checked) {
            return radioObj[i].value;
        }
    }
    return "";
}


function loadOnSubmit()
{
    document.getElementById("formContentPanel").style.display = "block";//if you set display:none, it hides the entire element
    document.upform.submit();

    //document.forms["upform"].submit();

}


function mypopwin()
{
    window.open( "resultHelp.jsp", "myWindow", "status = 1, height = 420, width = 560, resizable = 1" );

}

function myfisherwin()
{
    window.open( "fisherTestHelp.jsp", "myWindow", "status = 1, height = 420, width = 560, resizable = 1" );

}


function validate(elem){
    console.log("in validation");
    var alphaExp = /^[a-zA-Z0-9_-]+$/;
    if(elem.value.match(alphaExp)){
        return true;
    }else{
        alert("Special Characters and Spaces are not allowed for Analysis Name");
        elem.focus();
        return false;
    }
}









