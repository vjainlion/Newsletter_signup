//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request =  require("request");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  //console.log(firstName,lastName,email);
  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
 var options = {
   url: "https://us4.api.mailchimp.com/3.0/lists/e9d4583716",
   method:"POST",
   headers:{
     "Authorization": "vaibhav 9f9b64939f356b622aad63ad64a8686f-us4"
   },
   body:jsonData
   

 };
  request(options,function(error,response,body){
    if(error)
    {
     res.sendFile(__dirname + "/failure.html");
    }
    else {
      if(response.statusCode==200)
      {
        res.sendFile(__dirname + "/success.html");
      }
      else
      {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is starting at port 3000");
});

// 9f9b64939f356b622aad63ad64a8686f-us4

// List
// e9d4583716
