const smtpTransport = require('../config/mail');

module.exports = {
  send: (mail, code) => {
    const type = typeof(mail);
    const mailOptions = {
      from: 'DELETE',
      to: '',
      subject: 'Password Recovery Code[Bug Bounty]',
      html: `The requested password recovery codes are <b>${code}</b>. plz do not leak this. Thank you for using our services.`
    };
    
    if (type == 'object') { // Exception handling is still in progress ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ
      mail.forEach(element => {
        mailOptions.to = element;
        smtpTransport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log(`[+] Email sent: ${info.response}`);
            console.log(`[+] Email sent to ${element}`);
          }
        }); 
      })
    } else {
      mailOptions.to = mail;
      smtpTransport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log(`[+] Email sent: ${info.response}`);
          console.log(`[+] Email sent to ${mail}`);
        }
      });  
    }
  },
  email_checker: (mail) => {
    const whitespace = /[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    mail= mail.replace(whitespace, '');
  
    const INVALID_CHARS = [',', '|', '+', '!', '#']
    let CHARS = ''
    try{
      INVALID_CHARS.forEach(element => {
        if (mail.indexOf(element) != -1) {
          CHARS = element;
          throw new Error(`Used INVALID CHARS. : ${element}`);
        }
      });
      if (regEmail.test(mail) === true) {
        return mail;
      }
    } catch{
      parsed = mail.split(CHARS);
      return parsed
    }
  }
}