
//variable needed / frameworks npm's used
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();


//serves static files like css html js img's
app.use(express.static('public'));
//parses the body to be urlencoded
app.use(bodyParser.urlencoded({extended: true}));


//when someone gets "/here"__ callback to do something...
app.get("/", function (req, res) {
res.sendFile(__dirname + "/signup.html");

});

//What the user will post to the server
app.post("/", function (req, res) {
        //do something

//variables for requesting details sent to a server
var first = req.body.fName;
var last = req.body.lName;
var email = req.body.email;


//data for mailchimp api request to be added to their servers by user
var data = {
   members: [
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: first,
         LNAME: last
       }
   }
 ],
       update_existing: true
};

//variable to be passed as a string in options "body" which is
// the entire content that the user inputs / POSTS
jsonData = JSON.stringify(data);


//options to be passed


var options = {
     url: "https://{your dc}.api.mailchimp.com/3.0/lists/{your _list_ id}",
     method: "POST",
     headers: {
       "authorization": " {any string + your account api_key}",
     },

     body: jsonData

};


//requesting the info from external server (mailchimp)
request(options, function (error, response, body) {
        //do something
if(error) {
res.sendFile(__dirname + "/failure.html");
}
else {
  if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html");
}
  else {
    res.sendFile(__dirname + "/failure.html");
}
}

//logging the status code to see if it worked
console.log(response.statusCode);

});

//logging the user inputs in the console
 console.log(req.body);


});
//end of POST request


//redirect for the homepage
app.post("/failure.html", function (req, res) {
  res.redirect("/");
});



//server
app.listen(3000, function (req, res) {
console.log("Wormhole Opened on port 3000!");


});
