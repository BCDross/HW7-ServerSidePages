var express = require("express");
var path = require("path");

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [
  {
    id: "The Way of Kings",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    date: "2011"
  },
  {
    id: "Words of Radiance",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    date: "2011"
  },
  {
    id: "Oathbringer",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    date: "2011"
  },
  {
    id: "Timegods World",
    author: "LE Modesite Jr",
    genre: "SciFi",
    date: "1985"
  },
  {
    id: "The Forever Hero",
    author: "LE Modesitt Jr.",
    genre: "SciFi",
    date: "1990"
  }
];

// just one "site" with 2 pages, / and about
let fantasyArray = [];
let sciFiArray = [];

// use res.render to load up an ejs view file
// index page
app.get("/", function(req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function(req, res) {
  res.render("pages/about");
});

app.get("/allBooks", function(req, res) {
  dataArray = app.dataArray;
  res.render("pages/allBooks", {
    dataArray: app.dataArray
  });
});

app.get("/sortedByDateBooks", function(req, res) {
  dataArray = app.dataArray.sort(app.dataArray.date);
  res.render("pages/sortedByDateBooks", {
    dataArray: app.dataArray
  });
});

app.get("/fantasyBooks", function(req, res) {
  for (let i = 0; i < app.dataArray.length; i++) {
    if (app.dataArray[i].genre == "Fantasy") {
      fantasyArray.push(app.dataArray[i]);
    }
  }
  res.render("pages/fantasyBooks", {
    fantasyArray: app.fantasyArray
  });
});

app.get("/sciFiBooks", function(req, res) {
  for (let i = 0; i < app.dataArray.length; i++) {
    if (app.dataArray[i].genre == "SciFi") {
      app.sciFiArray.push(app.dataArray[i]);
    }
  }
  res.render("pages/sciFiBooks", {
    sciFiArray: app.sciFiArray
  });
});

// upLoadData page
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2
app.get("/addBooks", function(req, res) {
  let id = req.param("id");
  let author = req.param("author");
  let genre = req.param("genre");
  let date = req.param("date");
  if (id != null) {
    let aBook = {
      id: id,
      author: author,
      genre: genre,
      date: date
    };
    app.dataArray.push(aBook);
  }
  res.render("pages/addBooks", {
    dataArray: app.dataArray
  });
});

// error page
app.get("/error", function(req, res) {
  // should get real data from some real operation, but instead ...
  let message = "some text from someplace";
  let error = {
    status: "this is real bad",
    stack: "somebody called somebody who called somebody"
  };
  res.render("pages/error", {
    // pass the data to the page renderer
    message: message,
    error: error
  });
});

if (app.get("env") === "development") {
  app.listen(3000);
  console.log("3000 is the magic port");
} else {
  app.listen(443); // not setting port number in www.bin, simple to do here
  console.log("443 is the magic port");
}

module.exports = app;
