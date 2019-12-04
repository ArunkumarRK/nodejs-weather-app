console.log('CLient side Java Script file loaded')


const weatherForm = document.querySelector('form');
const lat=document.querySelector('#lat')
const long=document.querySelector('#long')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
const message3=document.querySelector('#message-3')
const message4=document.querySelector('#message-4')
const message5=document.querySelector('#message-5')
const message6=document.querySelector('#message-6')
const message7=document.querySelector('#message-7')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

//Note::
//Fetch API work witg Promises concept of JS
const getWeather=(lat,long)=>{
    fetch('/weather?lat='+ lat +'&long='+ long)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log('Error:: '+data.error)    
                message1.textContent='Error::'+data.error
            }else{
               
                console.log(data[0].sunrisetime)
                //const dataJson=JSON.parse(data)
                message1.textContent='Time Zone::'+data[0].timezone
                message2.textContent='Today Summary::'+data[0].totay_summary
                message3.textContent='Temperature::'+data[0].temperature
                message4.textContent='Climate::'+data[0].precipType
                message5.textContent='Sun Rise Time::'+data[0].sunrisetime
                message6.textContent='Sun Set Time::'+data[0].sunsettime
                message7.textContent='Moon Phase::'+data[0].moonphase
            }
        })
    })

}




weatherForm.addEventListener('submit',(eventObject)=>{
    //avoid page refresh on load
    eventObject.preventDefault()
    getWeather(lat.value,long.value)

    //console.log('Testing!',lat.value,long.value)
})