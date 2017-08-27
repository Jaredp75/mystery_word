//Packages
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');


//Calling objects from game_data.js
const game_data = require('./game_data');

let title = 'Mystery Word Game';
var guessedLetter = '';
const rememberGuess = [];
var guessesLeft = 8;



let randomWord = game_data.randomWord;
var secretWord = randomWord;
console.log("display.randomWord:", secretWord);
var swArray = randomWord.split("");

let displaySW = game_data.makeD(swArray);
let joinSW = game_data.makeD(swArray);
let displayableSW = joinSW.join('');
console.log("display.secretWord:", secretWord);
console.log("display.displayableSW:", displayableSW);


const app = express();

//app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
  extended: false
}));



//app.use(session({
//  secret: 'keybord cat',
//  resave: false,
//  saveUninitialized: true
//}));



//app.use(function (req, res, next) {
//  var views = req.session.views;

//  if (!views) {
//    views = req.session.views = {};
//  }

//next();

//})

//function authenticate(req, username, password) {
//  var authenticatedUser = data.users.find(function (user) {
//    if (username === user.username && password === user.password) {
//      req.session.authenticated = true;
//      console.log('User & Password Authenticated');
//    } else {
//      return false
//    }
//  });
//  console.log(req.session);
//  return req.session;
//}



app.use(expressValidator());


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
  guessString = '';
  res.render('index', {
    title: title,
    word: displayableSW,
    remaining: guessesLeft
  });
  console.log("app.get.displayableSW:", displayableSW);
});


app.post('/', function (req, res) {
  guessedLetter = req.body.yourGuess.toLowerCase();
  req.checkBody('yourGuess', "Please enter one letter").notEmpty().isLength( {
    min: 0,
    max: 1
  }).isAlpha();



  var errors = req.validationErrors();
  if (errors) {
    res.render('game', {
      word: displayableSW,
      errors: errors,
      guessedLetters: rememberGuess,
      remaining: guessesLeft
    });
    console.log("app.post.errors:", errors);
}
  else {
    rememberGuess.push(guessedLetter.toLowerCase());
    let guess = game_data.isNewLetter(guessedLetter, guessedLetter)
    console.log("app.post.rememberGuess:", rememberGuess);


    if (secretWord.includes(guessedLetter)) {
      for (i=0; i < secretWord.length; i++) {
        if (secretWord[i] === guessedLetter) {
          secretWord[i] = displayableSW[i].replace('_', guessedLetter);
          console.log("app.post.guessedLetter: guessedLetter");
        }
      }
    }
    else {
      guessesLeft -= 1;
    };

    res.render('game', {
      word: displayableSW,
      errors: errors,
      guessedLetters: rememberGuess,
      remaining: guessesLeft
    });
    console.log("app.post.errors:", errors);
  } else {
    rememberGuess.push(guessedLetter.toLowerCase());
    let guess = game_data.isNewLetter(guessedLetter, guessedLetter);
    console.log("app.post.rememberGuess:", rememberGuess);


    if (secretWord.includes(guessedLetter)) {
      for (i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guessedLetter) {
          secretWord[i] = displayableSW[i].replace('_', guessedLetter);
        }
      }
    }
    else {
      guessLeft -= 1;
    };

    res.render('game', {
      title: title,
      word: displayableSW,
      guessedLetters: rememberGuess,
      remaining: guessLeft
    });



    app.listen(3000, function() {
      console.log('Successfully started express application!')
    });





  //  app.get('/login', function (req, res) {
  //    if (req.session && req.session.authenticated) {
  //      res.render('index', {username: req.session.username});
  //    } else {
  //      res.render('index');
  //    }
  //  });
