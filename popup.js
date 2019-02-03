chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {getTT: true});
}); 
function failed(){
    $("#btn").removeClass("btn-load");
    $("#btn").addClass("btn-err");
    $('#btn').html('Failed! Try again?');
    $('#showMore').css('background','#e53935')
}
function loading(){
    $("#btn").addClass("btn-load");
    $("#btn").removeClass("btn-err");
    $('#btn').html('Extracting...');
    $('#showMore').css('background','rgb(105, 118, 136)')
}
function sucess(){
    $("#btn").removeClass("btn-err");
    $("#btn").removeClass("btn-load");
    $('#btn').html('Get TimeTable');
    $('#showMore').css('background','rgb(0, 78, 195)')
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

$('#showMore').click(function(e){
    if($('#errorText').css('display')=="none"){
        $('#errorText').slideDown(205);
        $('#showMore').html('&#x21E1;')
    } else{
        $('#errorText').slideUp(200)//,()=>{window.close()})
        $('#showMore').html('&#x21E3;')
        $('body').animate({'height':'80px'},205,()=>{
            setTimeout(()=>{
                $('body').css('height','auto')
            },200)
        })
        $('html').animate({'height':'80px'},205,()=>{
            setTimeout(()=>{
                $('html').css('height','auto')
            },200)
        })
    }
})