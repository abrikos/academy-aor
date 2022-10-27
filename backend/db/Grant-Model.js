const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'grant';

const fields = [
    {name: 'name', label: 'Название'},
    {name: 'theme', label: 'Тема проекта или контракта'},
    {name: 'number', label: 'Внутренний номер или шифр контракта'},
    {name: 'authors', label: 'Список авторов-сотрудников ГБУ АН РС (Я)'},
    {name: 'year', label: 'Год публикации', type: 'Number'},
]

const schemaObject = {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
}

for(const field of fields){
    if(!schemaObject[field.name])
        schemaObject[field.name] =  field.type || String
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


