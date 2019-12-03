const path=require('path')
const express=require('express')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname,'../public'))
const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')

//hbs view engine assigning
app.set('view engine','hbs')

app.use(express.static(publicDirectoryPath))
//hbs index template calling here
app.get('',(request,response)=>{
    response.render('index',{
        title:'weather app',
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
// // url:: http://localhost:3000/
// app.get('',(request,response)=>{
//     response.send('<H1>Hello Express!</H1>')
// })

// // url:: http://localhost:3000/help
// app.get('/help',(request,response)=>{
//     response.send('Help Page')
// })
// // url:: http://localhost:3000/about
// app.get('/about',(request,response)=>{
//     response.send([{
//         name:"Arunkumar",
//         age:34
//     },{
//         name:"Reshma",
//         age:31
//     }])
// })
// url:: http://localhost:3000/weather
app.get('/weather',(request,response)=>{
//    response.send('[{"name":"Arunkumar","age":34},{"name":"Reshma","age":30}]')
    response.send([{
        name:"Arunkumar",
        age:34
    },{
        name:"Reshma",
        age:31
    }])
})
app.listen(3000,()=>{
    console.log('Web server initiated on the port 3000')
})