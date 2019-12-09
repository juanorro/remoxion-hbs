const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const esCategories = require('../constants/categories');
const jobType = require('../constants/jobsType');

const jobsSchema = new Schema (
    {
        title: {
            type: String, 
            require: true
        },
        category: {
            type: String,
            require: true,
            enum: esCategories
        },
        jobtype: {
            type: String, 
            require: true, 
            enum: jobType
        },
        region: {
            type: String
        },
        salary: {
            type: Number
        },
        apply: {
            type: String, 
            require: true
        },
        jobDes: {
            type: String, 
            require: true
        }
    }, { timestamps: true });

    const Jobs = mongoose.model('Jobs', jobsSchema);
    module.exports = Jobs; 