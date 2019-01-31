const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = process.env.PORT || 3000




const API_KEY = '30416c0be9723ca874e140fccfbd39f2'
const app = express()

let queryObj = {show: false}


//Middleware
app.use(express.json()) // required to get json requests from the client
app.use(express.static(__dirname + '/html')) //static server

//Routes
app.get(['/','/recipes.html','/index.html','/index'],
(request, response) => {
  queryObj.show = false
  response.sendFile(__dirname + '/html/index.html')
})

//saves query parameteres in queryObj for user to display later, if there are any
app.get('/recipes', (request, response) => {
  if (request.query.ingredients){
    queryObj.queryText = request.query.ingredients;
    queryObj.show = true;
  }
  response.sendFile(__dirname + '/html/index.html')
})

//Handles POST requests with text from the user
app.post('/userText', function (request, response) {
  //console.log("Recieved "+request.body)
  let ingredients = request.body.text
  console.log("Ingredient: "+ingredients)
  if(!ingredients) {
    return response.json({message: 'Please enter an ingredients name'})
  }
  const url = `http://www.food2fork.com/api/search?q=${ingredients}&key=${API_KEY}`
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(data)
  })
})
//Handles a POST request asking for query parameters
app.post('/query', function (request, response) {
  let data = JSON.stringify(queryObj)
  return response.contentType('application/json').json(data)
})


//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/recipes?ingredients=Cake, Blueberry`)
    console.log(`http://localhost:3000/recipes.html`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000`)
  }
})
