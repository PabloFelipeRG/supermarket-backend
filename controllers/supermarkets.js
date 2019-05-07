const model = require('../models/supermarkets');
const SuperMarket = model.superMarketSchema();
const { uploadFile } = require('../services/s3service');

const createSuperMarket = (req, res) => {
    const { name, description, location, photo } = req.body;

    const newSuperMarket = {
        name,
        description,
        location,
        photo
    };

    SuperMarket.create(newSuperMarket, (error, superMarket) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json(superMarket);
        }
    });
};

const findSuperMarkets = (req, res) => {
    SuperMarket.find((error, superMarkets) => {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(superMarkets);
        }
    });
};

const findSuperMarketById = (req, res) => {
    const { _id } = req.body;

    SuperMarket.findById(_id, (error, superMarket) => {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(superMarket);
        }
    });
};

const updateSuperMarket = (req, res) => {
    const { _id, name, description, location, photo } = req.body;

    const superMarketToUpdate = {
        name,
        description,
        location,
        photo
    };

    SuperMarket.findByIdAndUpdate(_id, superMarketToUpdate, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json({
                result: "success",
                _id: response._id
            });
        }
    });
};

const deleteSuperMarketById = (req, res) => {
    const { _id } = req.body;

    SuperMarket.findByIdAndDelete(_id, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.json({
                result: "success",
                response
            });
        }
    });
};

module.exports = {
    createSuperMarket,
    findSuperMarkets,
    findSuperMarketById,
    updateSuperMarket,
    deleteSuperMarketById
}