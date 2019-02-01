chrome.runtime.sendMessage({todo:'activate'})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.getTT){
            getData()
        }
    });

parseTT=function(dom){
    slots=[]
    for(i=64,k=0; i<dom.length;i+=step[(k++)%2]){
        z=[]
        for(x=0,y=0;x<14;x++,y++){
            if($(dom[i+x]).attr('bgcolor')=='#CCFF33')
                z.push(y)
            else if((x==3||x==10) && k%2 && $(dom[i+x+1]).attr('bgcolor')=='#CCFF33')
                z.push(y)   //extra slot
            if(x==4 || x==11) x++;
        }
        slots.push(z)
    }
    reducedSlot=[]
    for (i=0;i<14;i+=2){
        reducedSlot.push([...slots[i],...slots[i+1]])
    }
    return reducedSlot;
}

parseDetails=function(dom){
    dom2=dom.find('#1a').find('td')
    dom3=dom.find('#6a').find('td')

    name=dom2[5].innerHTML
    gender=dom2[9].innerHTML
    phno=dom2[59].innerHTML
    email=dom2[61].innerHTML
    hostel=dom3[9].innerHTML+' '+dom3[7].innerHTML
    return({name,gender,phno,email,hostel})
}

sendData=function(data){
    var encoded = window.btoa(JSON.stringify(data));
    var decoded = window.atob(encoded)
    window.open('https://freeslot.acmvit.in/?data='+encoded,'freeslot')
    console.log(JSON.parse(decoded))
    
}

unableToGetData=function(){ // not connect or logged in but has tt
    try{
        sendData({slots:parseTT($('#timeTableStyle').find('td'))})
    } catch(e){
        console.log(e)
        // error message
    }
}

getData=function(){
    try{
        reg=$('.VTopHeaderStyle')[2].innerHTML.slice(0,9)
        $.ajax({
            url:'https://vtop.vit.ac.in/vtop/studentsRecord/StudentProfileAllView',
            type:'POST',
            data: {
                verifyMenu: true,
                winImage: undefined,
                authorizedID: reg,
                nocache: '@(new Date().getTime())'
            }
        }).done(function(data){
            try{
                details=parseDetails($('<output>').append($.parseHTML(data)))
                if($('#timeTableStyle')[0])
                    return sendData({
                        slots:parseTT($('#timeTableStyle').find('td')),
                        reg,...details
                    })
                $.ajax({
                    url:'https://vtop.vit.ac.in/vtop/processViewTimeTable',
                    type:'POST',
                    data: {
                        semesterSubId: 'VL2018195',
                        authorizedID: reg,
                        x:new Date().toGMTString()
                    }
                }).done(function(data){
                    try{
                        step=[15,16]
                        dom=$('<output>').append($.parseHTML(data)).find('#timeTableStyle').find('td')
                        slots=parseTT(dom)
                        sendData({reg,...details,slots})
                    } catch(e){ unableToGetData()}
                }).catch(e=>{
                    alert()
                    unableToGetData()
                })
            } catch(e){ unableToGetData()}
        }).catch(e=>{
            unableToGetData()
        })

        
    } catch(e){ unableToGetData()}
}