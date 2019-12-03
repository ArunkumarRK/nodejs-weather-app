const request=require('request')

const getWeatherDetails=(lat,long,callback)=>{
    if(lat===undefined || long===undefined){
        callback('please provide validate LAT and LONG values',undefined)
    }else{
        const url='https://api.darksky.net/forecast/7e1574cd75dda21f9a056ae8eabf53f4/'+ lat +','+ long
        //request({url:url},(error,response)=>{
        // object destrucuring applied on response====> {body}
        request({url:url,json:true},(error,{body})=>{
            if(error){
                callback('Unable to connect weather service!',undefined)
            //}else if(response.body.error){
            }else if(body.error){
                callback('Unable to find the location!',undefined)
            }else{
                //callback(undefined,response.body)
                callback(undefined,body)
            }

        })
    }
    
}

module.exports={
    getWeatherForcast:getWeatherDetails
}