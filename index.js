const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>
<h1 style="text-align:center;">Send Email </h1>
    <form action="/send-email" method="post" style="max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="margin-bottom: 15px;">
            <label for="email" style="display: block; font-weight: bold; margin-bottom: 5px;">Email:</label>
            <input type="email" id="email" name="email" style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" required>
        </div>
        <div style="margin-bottom: 15px;">
            <label for="subject" style="display: block; font-weight: bold; margin-bottom: 5px;">Subject:</label>
            <input type="text" id="subject" name="subject" style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" required>
        </div>
        <div style="margin-bottom: 15px;">
            <label for="message" style="display: block; font-weight: bold; margin-bottom: 5px;">Message:</label>
            <textarea id="message" name="message" rows="5" style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" required></textarea>
        </div>
        <div style="text-align: center;">
            <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Send Mail</button>
        </div>
    </form>
</body>
</html>`);
});

app.post("/send-email", (req, res) => {
  const mailOptions = {
    from: "no-reply@getMaxListeners.com",
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.message,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.json({
        message: "Error Occured " + e,
      });
    } else {
      res.end("Email Sent Successfully");
    }
  });
});

app.listen(5000, () => console.log("Server is up and running"));
