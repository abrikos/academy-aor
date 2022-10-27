const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'expert';

const fields = [
    {name: 'name', label: 'Название'},
    {name: 'program', label: 'Программа НИР'},
    {name: 'project', label: 'Проекты НИР'},
    {name: 'innovation', label: 'Инновационные проекты'},
    {name: 'grants', label: 'Проекты на получение грантов в том числе РНФ'},
    {name: 'concurs', label: 'Проекты на конкурс Государственных премий РС (Я) '},
    {name: 'completing', label: 'Отчеты о выполнении НИР и ОКР'},
    {name: 'expertCommission', label: 'Участие в работе экспертных комиссий'},
    {name: 'articleReview', label: 'Рецензия на научную статью'},
    {name: 'dissertationReview', label: 'Отзыв на автореферат диссертации'},
    {name: 'organisationReview', label: 'Отзыв ведущей организации'},
    {name: 'opponent', label: 'Официальный оппонент - докторской / кандидатской диссертации'},
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


