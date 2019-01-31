chrome.runtime.sendMessage({todo:'activate'})
$.post('https://vtop.vit.ac.in/vtop/processViewTimeTable',{
    semesterSubId: 'VL2018195',
    authorizedID: '17BIT0319',
    x:new Date().toGMTString()
},function(data){
    step=[15,16]
    dom=$('<output>').append($.parseHTML(data)).find('#timeTableStyle').find('td')
    z=0
    slots=[]
    for(i=64,k=0; i<dom.length;i+=step[(k++)%2]){
        for(j=0;j<14;j++){
            if(j!=6){
                if($(dom[i+j]).attr('bgcolor')=='#CCFF33')
                    slots.push(1)
                else slots.push(0)
            }
        }
    }
})