const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//include some json
const data = require('./data.json');

app.use(express.static(path.join(__dirname, 'public'))); //static

// first route
// app.get('/', (req, res) => {
//  res.send("Hello Turtles"); 
// });

app.get('/api', (req, res) => {
  res.json(data); //return the json
});

app.get('/api/:cat', (req,res) => {
  console.log(req.params);

  let categoryName = req.params.cat.toLowerCase();

  let category = data[categoryName]

  if(category){ //if categroy exists
    let name = req.query.name; //look for a query param for name

    if(name){ //if there is a name, filter the category by the name
      const filtered = category.filter(cat => cat.name.toLowerCase().includes(name.toLowerCase()));
      console.log(filtered);

      if(filtered.length){
        //return the first find
        res.json(filtered[0]);
      } else {
        res.json(`${name} not in ${categoryName}`);
      }
    } else { //no name query
      res.json(category);
    }

  } else { //category not found
    res.json(`${categoryName} not found`); //could improve this
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
