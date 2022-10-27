const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'conference';

const fields = [
    {name: 'name', label: 'Название конференции'},
    {name: 'organizer', label: 'Организация - инициатор конференции'},
    {name: 'status', label: 'Статус (международная, с международным участием, всероссийская, региональная и т.д.)'},
    {name: 'timePlace', label: 'Время и место проведения конференции'},
    {name: 'count', label: 'Количество участников, в том числе иностранных'},
    {name: 'participation', label: 'Форма участия (член оргкомитета, член рабочей группы, иное - указать)'},
]

const schemaObject = {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
}

for(const field of fields){
    if(!schemaObject[field.name])
        schemaObject[field.name] = String
}
const schema = new Schema(schemaObject,
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.statics.fields = fields;
schema.statics.population = [
]



module.exports = mongoose.model(name, schema)


