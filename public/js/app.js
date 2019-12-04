console.log('CLient side Java Script file loaded')


const weatherForm = document.querySelector('form');
const lat=document.querySelector('#lat')
const long=document.querySelector('#long')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
const message3=document.querySelector('#message-3')


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
               
                console.log(data[0].temperature)
                //const dataJson=JSON.parse(data)
                message1.textContent='Today Summary::'+data[0].totay_summary
                message2.textContent='Temperature::'+data[0].temperature
                message3.textContent='Climate::'+data[0].precipType

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