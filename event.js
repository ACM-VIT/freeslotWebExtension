chrome.runtime.onMessage.addListener((req,sender,res)=>{
    console.log(req)
    if(req.todo='activate'){
        // chrome.tabs.querry()
        chrome.tabs.query({active:true,currentWindow:true},tabs=>{
            chrome.pageAction.show(tabs[0].id)
        })
    }
})

// chrome.cookies.onChanged.addListener(function(){
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {cookies: "changeedddd"}, function(response) {
//         //   alert()
//         });
//     }); 
// })



// if(urlText=='doLogin'){
//     alert();
// }