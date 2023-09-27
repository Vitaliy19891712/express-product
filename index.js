const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3010;
const allowedOrigins = ["https://vitaliy19891712.github.io/portfolio/", "https://vitaliy19891712.github.io"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
    res.set("Access-Control-Allow-Origin", "https://vitaliy19891712.github.io/portfolio");
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
