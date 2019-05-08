const model = require('../models/supermarkets');
const SuperMarket = model.superMarketSchema();
const { uploadPhoto, deletePhotoByKey } = require('../services/s3service');

const createSuperMarket = (req, res) => {
    const { name, description, location, photo } = req.body;

    const newSuperMarket = {
        name,
        description,
        location
    };

    SuperMarket.create(newSuperMarket, (error, superMarket) => {
        if (error) {
            res.status(400).json(error);
        } else {
            if (photo) {
                uploadPhoto(photo, superMarket['_id']);
            }
            res.json(superMarket);
        }
    });
};

const findSuperMarkets = async (req, res) => {
    SuperMarket.find((error, superMarkets) => {
        if (error) {
            res.status(404).json(error);
        } else {
            res.json(superMarkets);
        }
    });
};

const findSuperMarketById = (req, res) => {
    const { id } = req.params;

    SuperMarket.findById(id, (error, superMarket) => {
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
        location
    };

    SuperMarket.findByIdAndUpdate(_id, superMarketToUpdate, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            if (photo) {
                uploadPhoto(photo, response['_id']);
            }

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
            deletePhotoByKey(_id);

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