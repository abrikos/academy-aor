const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'science';

const fields = [
    {name: 'name', label: 'Название'},
    {name: 'preparation', label: 'Подготовка проектов нормативно-правовых актов'},
    {name: 'member', label: 'Член комиссий, научно-технических / ученых  советов министерств, ведомств, Ил Тумэн'},
    {name: 'innovation', label: 'Участие в работе комиссий министерств, ведомств, Ил Тумэн'},
    {name: 'participation', label: 'Проекты на получение грантов в том числе РНФ'},
    {name: 'others', label: 'Другое'},
]

const schemaObject = {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
}

for (const field of fields) {
    if (!schemaObject[field.name])
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
schema.statics.population = []


module.exports = mongoose.model(name, schema)


