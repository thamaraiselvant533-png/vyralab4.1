const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
    try {
        const { name, email, service, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form - ${service}`,
            html: `
        <h3>New Message from VYRA LAB</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `
        });

        res.json({ success: true, message: "Message Sent Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
const sendMessage = async () => {
    const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            service,
            message,
        }),
    });

    const data = await response.json();
    alert(data.message);
};
