'use strict';

const rp = require('request-promise')

// send an email
exports.sendMail = (params) => {
    const payload = {
        from: params.from,
        personalizations: {
            to: params.to,
            dynamic_template_data: params.data
        },
        template_id: params.template_id

    }
    const options = {
        method: 'POST',
        uri: 'https://api.sendgrid.com/v3/mail/send',
        body: payload,
        headers: {
            Authorization: 'Bearer ' + process.env.SENGRID_APIKEY,
            'Content-Type': 'application/ json'
        },
        json: true // Automatically stringifies the body to JSON
    }
    return rp(options)
        .then(function (response) {
            return response
        })
        .catch(function (err) {
            console.error(err)
            return false
        });
}


// send some email
exports.sendMails = paramsArray => {
    let result = paramsArray.map(item => {
        return sendMail(item)
    })
    return Promise.all(result)
        .then(res => {
            return res
        })
}
