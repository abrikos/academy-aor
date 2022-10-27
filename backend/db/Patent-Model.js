const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'patent';

const fields = [
    {name: 'name', label: 'Название конференции'},
    {name: 'type', label: 'Организация - инициатор конференции'},
    {name: 'authors', label: 'Полный список авторов'},
    {name: 'certificate', label: 'Статус (международная, с международным участием, всероссийская, региональная и т.д.)'},
    {name: 'publishDate', label: 'Время и место проведения конференции'},
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


