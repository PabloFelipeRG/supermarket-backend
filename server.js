// Server Configuration and DB Connection
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { DB_PASSWORD } = require("./global");
const supermarkets = require('./controllers/supermarkets');

app.use(express.json());

mongoose.connect(`mongodb+srv://Application:${DB_PASSWORD}@cluster0-zsiku.mongodb.net/Development?retryWrites=true`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connection made successfully');
})

// Routes
app.post('/supermarket', supermarkets.createSuperMarket);

app.get('/supermarkets', supermarkets.findSuperMarkets);

app.get('/supermarket', supermarkets.findSuperMarketById);

app.put('/supermarket', supermarkets.updateSuperMarket);

app.delete('/supermarket', supermarkets.deleteSuperMarketById);

app.listen(3000, () => {
    console.log("App is running on port 3000");
});