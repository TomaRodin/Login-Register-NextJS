const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors({origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/check",function(req,res){
  if(req.cookies.LoggedIn === "true") {
    res.json({loggedIn:true})
  }
  else {
    console.log('Ok')
    res.json({loggedIn:false})
  }
})

app.get("/login",function(req,res){
  console.log(req.query.username)
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {

  });
  db.all("SELECT * FROM Users WHERE username ="+"'"+req.query.username+"'"+" AND password = "+"'"+req.query.password+"'", function (err, rows) {
    console.log(rows)
    if (rows.length < 1) {
      res.json({status:false})
    }
    else {
      const row = rows[0]
      res.json({status:true, username:row.username})
    }
  })
})

app.get("/data",function(req,res){
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {

  });
  db.all("SELECT * FROM Users WHERE username ="+"'"+req.query.username+"'", function (err, rows) {
      const row = rows[0]
    	res.json({username:row.username, id:row.ID})
  })

})

app.post("/register",function(req,res){
  const sqlite3 = require('sqlite3').verbose();
  console.log(req.body.username)
  let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
  
  });
  db.all("SELECT * FROM Users WHERE username ="+"'"+req.body.username+"'"+" OR password = "+"'"+req.body.password+"'", function (err, rows) {
    console.log(rows)
    if (rows.length < 1) {
      const sqlite3 = require('sqlite3').verbose();
      let db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
        db.run(`INSERT INTO Users (username,password) VALUES ('${req.body.username}','${req.body.password}')`);
        
      })

    }
    else {
      res.json({exist:true})
    }
  })
})


app.listen(3001)