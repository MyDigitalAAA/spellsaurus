const smtp = require('./config');
const fs = require('fs');
const handlebars = require('handlebars');

// Sender address for mail service
const sender = 'tymos@auracle.io';

// Fetches a HTML template file for parsing
const getTemplateFile = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      })
    })
};

/**
 * SEND REGISTRATION MAIL FUNCTION
 * @param {Object} data
 * - user
 *    - name
 *    - mail
 *    - token
 */
const sendRegistrationMail = (data) => {
    getTemplateFile(__dirname + '/templates/template-sign-up.html')
    .then(html => {
        let template = handlebars.compile(html);
        let template_parsed = template(data);

        let message = {
            from: sender,
            to: data.user.mail,
            subject: 'Inscription Auracle.io',
            html: template_parsed,
        };

        smtp.transport.sendMail(message, (err, info) => {
            if (err) {
                throw err;
            } else {
                console.log(info);
            }
        });
    })
    .catch(err => {
      console.log(err);
    });
}

const sendBanEmail = (date) => {
  return null;
}

module.exports = {
  sendRegistrationMail,
}