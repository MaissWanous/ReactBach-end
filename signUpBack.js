const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { isEmpty } = require("lodash");
const bodyparser = require("body-parser");
const { result } = require("lodash");
const Login = require("./loginB")
const dataBase = require("./dataBase");
const app = express();
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cors());
Login.Login(app, __dirname)
dataBase.dataBase(app,__dirname)
const monk = require("monk");
var url = "mongodb://0.0.0.0:27017/React";
const db = monk(url);
const collection = db.get("SignUP");
var obj;
var testEmail = false;
app.post("/Registe", async (req, res) => {
  testEmail = false;
  const { name, email, password, passwordR } = req.body;
  console.log(name + " " + email + " " + password + " " + passwordR);
  obj = {
    Name: name,
    Email: email,
    Password: password,

  }
  async function TEmail() {
    return new Promise((resolve, reject) => {
      collection.find({ Email: email }, function (err, docs) {
        if (err) {
          console.log(err);
          reject(err);
        }
        Info = docs;
        resolve({ Info });
      });
    });
  }

  const result2 = await TEmail();
  var result4 = result2.Info;
  if (!isEmpty(result4)) {
    testEmail = true;
  }
  if (!testEmail) {
    collection
      .insert(obj)
      .then((doc) => {
        console.log("Document inserted successfully:", doc);
      })
      .catch((err) => {
        console.error("Error while inserting document:", err);
      })
      .then(() => {
        db.close();
      });

  }

  if (testEmail)
    res.status(422).json({ error: "The Email has already been token" })
  else
    res.send("The data was successfully received");
});

app.listen(3333, function (req, res) {
  console.log("server started on port 3333");
});
