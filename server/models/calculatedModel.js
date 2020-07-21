const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalculatedSchema = new Schema({  
    calculated: String,
    date: Date
});

module.exports = Calculated = mongoose.model('calculated', CalculatedSchema);