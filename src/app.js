const path=require('path')
const express=require('express')
const hbs = require('hbs')
const weatherDet=require('./utils/weatherDetails')

const app=express()
const port=process.env.PORT || 3000
//Define the path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//hbs(handlebars) view engine assigning and location path
app.set('view engine','hbs')
app.set('views',viewPath)

//hbs register partials
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//hbs index template calling here
app.get('',(request,response)=>{
    response.render('index',{
        title:'Weather App',
        name:'Arunkumar Rajan'
    })
})
//hbs about  template page 
app.get('/about',(request,response)=>{
    response.render('about',{
        title:'ABOUT Page',
        name:'Arunkumar Rajan'
    })
})
//hbs help template page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP Page',
        name:'Arunkumar Rajan'
    })
})

//NOte::: url::http://localhost:3000/weather?place=bangalore
app.get('/weather',(request,response)=>{
//    response.send('[{"name":"Arunkumar","age":34},{"name":"Reshma","age":30}]')
    if(!request.query.lat || !request.query.long){
        response.send({
           error:'require valid LAT and LONG parameters for request' 
        })
    }else{
        //function calling from weatherDetails and parameters are passing from request
        const {lat,long}=request.query
        weatherDet.getWeatherForcast(lat,long,(error,{timezone,daily,currently}={})=>{
            if(error){
                response.send({
                    error:'require valid LAT and LONG parameters  for request' 
                 })
            }else{
                console.log(daily.data[1].moonPhase)
                response.send([{
                    lat:request.query.lat,
                    long:request.query.long,
                    timezone:timezone,
                    totay_summary:daily.summary,
                    temperature:currently.temperature,
                    precipType:currently.precipType,
                    sunrisetime:daily.data[1].sunriseTime,
                    sunsettime:daily.data[1].sunsetTime,
                    moonphase:daily.data[1].moonPhase
                }])
            }
        })
       
    }
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        res.send({
            error:'search term not existed '
        })
    }else{
        res.send({
            search:req.query.search
        })
    }
})

//Error page======> Page Not found page
app.get('/help/*',(request,response)=>{
    response.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name:'Arunkumar Rajan'
    })
    //response.send('Help article not found')
})

app.get('*',(request,response)=>{
    response.render('404',{
        title:'404 Error: page not found',
        name:'Arunkumar Rajan',
        errorMessage:'Page Not Found'
    })
})
app.listen(port,()=>{
    console.log('Web server initiated on the port 3000')
})