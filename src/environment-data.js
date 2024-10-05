/* eslint-disable no-console */
// importing the fs module
const fs = require('fs');
const {env} = require('node:process');

// initializing a JavaScript object
const data = {
    serviceId: env['EMAILJS_SERVICE_ID'],
    templateId: env['EMAILJS_TEMPLATE_ID'],
    publicKey: env['EMAILJS_PUBLIC_KEY'],
};

// converting the JSON object to a string
const emailData = JSON.stringify(data);
// writing the JSON string content to a file
fs.writeFile('src/environments/prod-environment-data.json', emailData, (error) => {
    // throwing the error
    // in case of a writing problem
    if (error) {
        // logging the error
        console.error(error);

        throw error;
    }

    console.log('environment-data.json written correctly');
});
