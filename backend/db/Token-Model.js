const mongoose = require('mongoose');
const md5 = require("md5");
const Schema = mongoose.Schema;
const name = 'token';


const schema = new Schema({
        access_token: {type: String},
        refresh_token: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        resetCode: {type: String},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.methods.refresh = async function() {
    this.access_token = md5(Math.random())
    await this.save()
}

schema.pre('save', function (next) {
    // do stuff
    this.refresh_token = this.access_token = md5(Math.random())
    next();
})

module.exports = mongoose.model(name, schema)


