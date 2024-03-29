const mongoose = require('mongoose');
const md5 = require("md5");
const moment = require("moment");
const Schema = mongoose.Schema;
const name = 'user';
const modulesData = require('../db/dataModels/models')

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const schema = new Schema({
        name: {type: String, default: ''},
        surname: {type: String, default: ''},
        patronymic: {type: String, default: ''},
        job: {type: String},
        division: {type: String},
        isAdmin: {type: Boolean},
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        passwordHash: {type: String},
        resetCode: {type: String},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.methods.checkPasswd = function (passwd) {
    return md5(passwd) === this.passwordHash;
}

schema.statics.population = [
    ...modulesData.modelsArray.map(p=>({path:p.model})),
    'prnds'
]

schema.virtual('password')
    .get(function () {
        return '';
    })
    .set(function (value) {
        this.passwordHash = md5(value)
    })

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })

schema.virtual('fields')
    .get(function () {
        return [{name: 'surname', label: 'Фамилия'}, {name: 'name', label: 'Имя'}, {name: 'patronymic', label: 'Отчество'}, {name: 'job', label: 'Должность'}, {name: 'division', label: 'Подразделение'}]
    })

schema.virtual('fullName')
    .get(function () {
        const name = this.surname + ' ' + this.name +' ' +this.patronymic

        return name.trim() || this.email;
    })


schema.virtual('tokens', {
    ref: 'token',
    localField: '_id',
    foreignField: 'user'
})

schema.virtual('prnds', {
    ref: 'prnd',
    localField: '_id',
    foreignField: 'user'
})

for(const model of modulesData.modelsArray) {
    schema.virtual(model.model, {
        ref: model.model,
        localField: '_id',
        foreignField: 'user',
        count: true
    })
}


module.exports = mongoose.model(name, schema)


