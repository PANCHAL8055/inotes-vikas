import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER, // gmail id
    pass: process.env.PASSWORD, // password
  },
});


const mail= async(user)=> {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"iNotes 👻" <vikaspanchal8044@gmail.com>', // sender address
      to: user, 
      subject: "Welcome To iNotes", // Subject line
      text: "Welcome To inotes, With iNotes, you can create different notebooks for different subjects or topics, just like you would with physical notebooks. Whether you're at school, at work, or at home, iNotes is  always there to help you stay organized and productive.", // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
  }

  export default mail;