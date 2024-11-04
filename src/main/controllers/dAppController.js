// src/main/controllers/dAppController.js

const DApp = require('../models/DApp');

exports.getAllDApps = async (req, res) => {
    const dApps = await DApp.find();
    res.json(dApps);
};

exports.createDApp = async (req, res) => {
    const { name, description, url } = req.body;
    const dApp = new DApp({ name, description, url });
    await dApp.save();
    res.status(201).json(dApp);
};
