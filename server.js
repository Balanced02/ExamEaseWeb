const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
var path = require("path");
const sendEmail = require("./mail.js");

dotenv.config({ path: `./config.env` });

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/assets"));
app.set("view engine", "html");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});

app.post("/contact", (req, res) => {
  const { name, mail, subject, text } = req.body;

  sendEmail(name, mail, subject, text, function (err, data) {
    if (err) {
      res.status(500).json({ err });
    } else {
      console.log("Contact details sent successfully Hurry!!");
      res.status(200).json({ message: "Email sent successfully!!!", data });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
