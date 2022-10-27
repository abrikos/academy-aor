const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'publication';

const fields = [
    {name: 'name', label: 'Название'},
    {name: 'place', label: 'Издание', relation: true},
    {name: 'status', label: 'Статус', relation: true},
    {name: 'type', label: 'Тип публикации'},
    {name: 'authors', label: 'Полный список авторов'},
    {name: 'publishData', label: 'Выходные данные'},
    {name: 'bases', label: 'Базы данных'},
    {name: 'isbn', label: 'Шифр ISBN (для монографий)'},
    {name: 'year', label: 'Год публикации', type:'Number'},
    {name: 'volume', label: 'Том, выпуск, страница'},
    {name: 'doi', label: 'DOI'},
]

const schemaObject = {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'place'},
    status: {type: mongoose.Schema.Types.ObjectId, ref: 'status'},
}

for(const field of fields){
    if(!schemaObject[field.name])
        schemaObject[field.name] = field.type || String
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
    {path: 'place'},
    {path: 'status'},
]

module.exports = mongoose.model(name, schema)


