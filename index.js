const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

var app = express();

// app.configure(function () {
//   this.use("/public", express.static("public"));
// });
const port = process.env.PORT || 3010;

app.use(cors());

//app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/pdf", express.static(__dirname + "/public/Resume.pdf"));

// app.get("/resume", (req, res) => {
//   res.sendFile("Resume.pdf", { root: path.join(__dirname, "public") });
// });
const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: "vitaliymyrafa@yandex.ru",
    pass: "zmdtdyemxwxfpkty",
  },
});

app.post("/sendMessage", async (req, res) => {
  let { email, name, phone, message } = req.body;
  try {
    const info = await transporter.sendMail({
      from: '"Письмо с портфолио" <vitaliymyrafa@yandex.ru>',
      to: "vitaliymyrafa@yandex.ru",
      subject: "Связаться со мной",
      html: `<h1>Сообщение с портфолио</h1>
    <div><h2>Имя</h2>${name}</div>
    <div><h2>Телефон</h2>${phone}</div>
    <div><h2>Email</h2>${email}</div>
    <div><h2>Сообщение</h2>${message}</div>`,
    });
    res.sendStatus(200);
  } catch (err) {
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
