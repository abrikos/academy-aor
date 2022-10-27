const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'report';

const fields = [
    {name: 'statusConference', label: 'Статус конференции', radio:['Российская','Международная']},
    {name: 'name', label: 'Название доклада'},
    {name: 'statusReport', label: 'Статус доклада', radio:['Пленарный','Устный','Стендовый']},
    {name: 'authors', label: 'Полный список авторов'},
    {name: 'reporter', label: 'Докладчик'},
    {name: 'year', label: 'Год проведения конференции', type: 'Number'},

    {name: 'confName', label: 'Название конференции'},
    {name: 'volume', label: 'Номер тома и страницы в сборнике тезисов'},
    {name: 'participation', label: 'Способ участия', radio:['Очно','Он-лайн (ВКС)']},
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


