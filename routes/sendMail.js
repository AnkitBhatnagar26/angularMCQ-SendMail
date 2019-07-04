require('dotenv').config();
var express = require('express');
const nodemailer = require("nodemailer");
var router = express.Router();

/* SendMail */
router.post('/', function (req, res, next) {
    const body = req.body;
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        console.log(__dirname,'__dirname');
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'ankitb2k14@gmail.com', // sender address
            to: body.email, // list of receivers
            subject: "Angular MCQ", // Subject line,
            html: `<div>
                <img src="cid:image" width="50" height="50"/>
                <h3>${body.name},</h3>
                <p>Thank you for taking the time to complete the test.</p>
                <p>You have scored <b>30%</b> marks.<p>
                <p>Thank You :)</p>
                <br />
                <br />
                <br />
                <br />
                <p>Many Thanks</p>
                --Ankit Bhatnagar <br />
                <em>Angular MCQ TEAM</em>
            </div>`,
            attachments: [{
                filename: 'images.png',
                path: __dirname +'/assets/images/images.png',
                cid: 'image' 
           }] 
        }, function (err, data) {
            if (err) {
                console.log('Error occures', err);
                return res.status(500).json({error: "Our server is temporarily down. Please visit us after some time."});
            } else {
                console.log('Email Sent!!!');
                return res.status(200).json({success: "We have successfully send an email to your emailId."});
            }
        });

    }

    main().catch(console.error);
});

module.exports = router;
