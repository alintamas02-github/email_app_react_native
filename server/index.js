const express = require("express");
const sendgrid = require("@sendgrid/mail");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Setează cheia API SendGrid
sendgrid.setApiKey("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");

app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { from, to, subject, body } = req.body;

  sendgrid
    .send({ from, to, subject, text: body })
    .then(() => {
      res.status(200).send("Email sent successfully!");
    })
    .catch((error) => {
      res.status(500).send(error.toString());
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

