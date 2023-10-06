var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML= "/api/iml";
var stuDBName = "Student";
var stuRelationName = "Student-Rel";
var connToken = "90931646|-31949326675785566|90961911";
$("#sturollno").focus();
function saveRecNo2LS(jsonObj) {
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
// function getStuRollnoAsJsonObj() {
//     var sturollno=${"#sturollno"}.val();
//     var jsonStr = {
//     rollno: sturollno;
//     };
//     return JSON.stringify (jsonStr);
//     };
function getStuRollnoAsJsonObj() {
    var sturollno = $("#sturollno").val(); // Corrected syntax here
    var jsonStr = {
        rollno: sturollno, // Corrected syntax here
    };
    return JSON.stringify(jsonStr);
}

    
    function fillData (jsonObj) {
        saveRecNo2LS(jsonObj);
        var data=JSON.parse(jsonObj.data) .record;
        $("#stuname").val(data.name);
        $('#stuclass').val (data.stuclass);
        $("#studob").val(data.studob);
        $("#stuaddress").val(data.stuaddress);
        $("#stuedob").val (data.stuedob);
    }
function resetForm() {
    $("#sturollno").val("");
    $("#stuname").val("");
    $("#stuclass").val("");
    $("#studob").val("");
    $("#stuaddress").val();
    $("#stuedob").val ("");
    $('#sturollno').prop ("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop ("disabled", true);
    $('#sturollno').focus();
}
function SaveData() { 
    var jsonStrobj= validateData();
    if (jsonStrobj==='') {
    return "";
    }
    
    var putRequest = createPUTRequest(connToken, jsonStrobj, stuDEName, stuRelationName);
    jQuery.ajaxSetup({async: false});
    var resisonobj = executeCommandAtGivenBaseUrl(putRequest, jpdbEaseLFL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#sturollno").focus ();
}
function validateData() {
    var sturollno, stuname, stuclass;
    var studob, stuaddress, stuedob;
    sturollno= $("#sturollno").val;
    stuname = $("# stuname ").val();
    stuclass=$("#stuclass").val();
    studob =$("#stuname").val();
    stuaddress=$("#stuaddress").val();
    stuedob = $("#stuedob").val();
    if (sturollno === " ") {
        alert("Student Rollno missing");
        $("#sturollno").focus();
        return "";
    } 
    if(stuname === "") {
    alert("Student Name missing");
    $("#stuname").focus();
    return "";
    }
    if(stuclass === "") {
        alert("Student's Class is missing");
        $("#stuclass").focus();
        return "";
        }
    if(studob === "") {
         alert("Student Date Of Birth is missing");
         $("#studob").focus();
         return "";
         }
    if(stuname === "") {
        alert("Student Name missing");
        $("#stuname").focus();
         return "";
        }
    if(stuaddress === "") {
        alert("Student's Address is missing");
        $("#stuaddress").focus();
        return "";
        }
    if(stuedob === "") {
         alert("Student's Enrollment Date is missing");
         $("#stuedob").focus();
        return "";
         }
         var jsonstrobj = {
            rollno: sturollno,
            name: stuname,
            class: stuclass,
            dob: studob,
            address:stuaddress,
            endate: stuedob
            };
            return JSON.stringify (jsonStrobj);
}
function getStu() {
    var sturollnoJsonObj= getStuRollnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest (connToken, stuDBName, stuRelationName, sturollnoJsonObj);
    jQuery.ajaxSetup ({async: false});
    var resJsonobj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonobj.status=== 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#stuname").focus();
    } 
    else if (resJsonObj.status===200){
    $("#sturollno").prop("disabled",true);
    fillData(resJsonObj);
    $("#change") .prop ("disabled", false);
$("#reset").prop("disabled", false);
$("#stuname").focus();
    }
}
function updateData() {
    $("#change").prop("disabled", true);
    jsonChg=validateData();
    var updateRequest = createLPDATERecordRequest (connToken, jsonChg, stuDBName, stuRelationName, Localstorage.getItem("recno"));
    jQuery.ajaxSetup ({async: false});
    var resJsonobj = executeCommandAtGivenBaseUrl (updateRequest, jpdbBaseURL, jpdbIML);
    jquery.ajaxsetup ({async: true});
    console.log(ressonObj);
    resetForm();
    $("#sturollno").focus ();
}