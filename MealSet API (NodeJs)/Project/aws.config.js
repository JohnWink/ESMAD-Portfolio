
const aws = require('aws-sdk')

module.exports = {
aws,
config:aws.config.update({
    accessKeyId:'AKIAJNLVEF27ZAQRFIIA',
    secretAccessKey:'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',
    //paramValidation: false,
    region: "eu-west-2" ,
    signatureVersion: 'v4'
})
}