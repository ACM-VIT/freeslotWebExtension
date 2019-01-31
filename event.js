chrome.runtime.onMessage.addListener((req,sender,res)=>{
    console.log(req)
    if(req.todo='activate'){
        // chrome.tabs.querry()
        chrome.tabs.query({active:true,currentWindow:true},tabs=>{
            chrome.pageAction.show(tabs[0].id)
        })
    }
})



// if(urlText=='doLogin'){
//     alert();
// }