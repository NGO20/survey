const nodemailer = require('nodemailer');

const exmailQQConfig = {
  host: 'smtp.exmail.qq.com',
  secure: true,
  port: 465,
  auth: {
    user: 'ngo-email',
    pass: 'password',
  },
};
const transporter = nodemailer.createTransport(exmailQQConfig);

let id = 1234;
transporter.sendMail({
  from: 'info@ngo20.org',
  to: 'scuzyt@outlook.com',
  subject: 'ngo第六次调查个性化报告',
  text: `您的个性化报告已经生成，请访问：http://s.ngo20.org/reports/${id}`,
  html: `<p>您的个性化报告已经生成，请访问：<a href="http://s.nog20.org/reports/${id}">您的个性报告</a></p>`,
}, (err, info) => {
  if (err) return console.log(err);
  console.log("mail sent: %s", info.messageId);
})