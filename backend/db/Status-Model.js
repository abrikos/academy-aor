const mongoose = require('mongoose');
const md5 = require("md5");
const Schema = mongoose.Schema;
const name = 'status';


const schema = new Schema({
        name: {type: String},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('publications', {
    ref: 'publication',
    localField: '_id',
    foreignField: 'status'
})

module.exports = mongoose.model(name, schema)


