
currentSem=''
function getSem(callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            currentSem=atob(JSON.parse(this.responseText).content);
            if(callback) callback(currentSem)
        }
        else if(this.readyState == 4){
            if(callback) callback()
        }
    };
    xhttp.open("GET", "https://api.github.com/repos/awasthishubh/freeslot-chromeExtension/contents/support/currentsem.txt", true);
    xhttp.send();
}
getSem()

chrome.runtime.onMessage.addListener((req,sender,res)=>{
    if(req.todo=='activate'){
        chrome.tabs.query({active:true,currentWindow:true},tabs=>{
            chrome.pageAction.show(tabs[0].id)
        })
    }
    if(req.getSem==true){
        if(currentSem) res(currentSem)
        else getSem(res)
    }
})