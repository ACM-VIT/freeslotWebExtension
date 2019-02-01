chrome.runtime.sendMessage({todo:'activate'})

parseTT=function(dom){
    slots=[]
    for(i=64,k=0; i<dom.length;i+=step[(k++)%2]){
        z=[]
        for(j=0;j<14;j++){
            if(j!=6 && $(dom[i+j]).attr('bgcolor')=='#CCFF33')
                z.push(j)
            else if((j==3||j==9) && (k++)%2 && $(dom[i+j+1]).attr('bgcolor')=='#CCFF33')
                z.push(j)   //extra slot
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

unableToGetData=function(){
    console.log('unable')
}

try{
    reg=$('.VTopHeaderStyle')[2].innerHTML.slice(0,9)
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
                    console.log({reg,...details,slots})
                } catch(e){ unableToGetData()}
            }).catch(e=>{
                unableToGetData()
            })
        } catch(e){ unableToGetData()}
    }).catch(e=>{
        alert()
        unableToGetData()
    })
} catch(e){ unableToGetData()}