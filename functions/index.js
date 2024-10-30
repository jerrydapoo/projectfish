const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.post("/submit-login", async (req, res) => {
  const {username, password} = req.body;
  try {
    await db.collection("users").add({username, password});
    res.send("User data saved successfully.");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data: " + error);
  }
});

exports.app = functions.https.onRequest(app);
