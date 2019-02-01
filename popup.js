// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {getTT: true});
// }); 
function failed(){
    $("#btn").removeClass("loading");
    $('#btn').html('Failed! Try again?');
    $('#errormsg').show()
}
function loading(){
    $('#btn').html('Loading...');
    $('#errormsg').hide()
    $("#btn").addClass("loading");
}
function sucess(){
    $("#btn").removeClass("loading");
    $('#btn').html('Get TimeTable');
    $('#errormsg').hide()
}