chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {getTT: true});
}); 
function failed(){
    $("#btn").removeClass("btn-load");
    $("#btn").addClass("btn-err");
    $('#btn').html('Failed! Try again?');
    $('#errormsg').show()
}
function loading(){
    $("#btn").addClass("btn-load");
    $("#btn").removeClass("btn-err");
    $('#btn').html('Extracting...');
    $('#errormsg').hide()
}
function sucess(){
    $("#btn").removeClass("btn-err");
    $("#btn").removeClass("btn-load");
    $('#btn').html('Get TimeTable');
    $('#errormsg').hide()
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.status=='failed'){
            failed()
        }
        if(request.status=='sucess'){
            sucess()
        }
        if(request.status=='loading'){
            loading()
        }
    });
$('#btn').click(function(e){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {getTT: true});
    }); 
})