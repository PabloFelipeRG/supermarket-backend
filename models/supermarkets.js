const mongoose = require('mongoose');

const superMarketSchema = () => {
    let Schema = mongoose.Schema;
    let superMarket = Schema({
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        photo: { type: String }
    });
    return mongoose.model('supermarkets', superMarket, 'SuperMarkets');
}

module.exports = {
    superMarketSchema
}