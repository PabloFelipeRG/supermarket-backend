const AWS = require('aws-sdk');
const { ID_ACCESS_KEY, SECRET_KEY, BUCKET_NAME } = require('../global');

AWS.config.update({
    accessKeyId: ID_ACCESS_KEY,
    secretAccessKey: SECRET_KEY
});

const s3 = new AWS.S3();

const uploadFile = (file, superMarketId) => {
    let params = {
        Bucket: BUCKET_NAME,
        Body: 'file.txt',
        Key: `${superMarketId}/`
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        }

        if (data) {
            console.log("Uploaded in:", data.Location);
        }
    });
}

module.exports = {
    uploadFile
}