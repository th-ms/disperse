
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const accountSid = "AC2dd8ce809f336455b79a03b30ad4d9f4";
const authToken = "eaa9cc2440b402ac30d5dc14a3bc2815";

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

var numbers = [];

function generate_code(){
    const code = Math.floor(Math.random()*9000000)+1000000;
    return code;
}

function verify_number(recipient){
    const code = generate_code();
    numbers.push({recipient:code});
    client.messages.create({
        to: '+1'+recipient,
        from: '+16206043290',
        body: 'Your verification code is '+code.toString(),
    }).then(message => console.log(message.sid));
}

app.post('/get_verification', function(req,res){
    const number = req.body.number;
    console.log(number);
    verify_number(number);
    res.send("Number received");
})

app.post('/verify', function(req,res){
    const number = req.body.number;
    const code = req.body.code;
    numbers.forEach((combo) => {
        if(combo==={number:code}){
            res.send("success");
        }
    })
    res.send("failure");
})

app.listen(8003, () => {
    console.log("Server is currently pogging");
  })