const mongoose = require("mongoose");
const moment = require("moment/moment");
const models =  {
    publication: {
        label: "Публикации",
        fields: [
            {name: 'name', label: 'Название'},
            {name: 'place', label: 'Издание', type: mongoose.Schema.Types.ObjectId, ref: 'place'},
            {name: 'status', label: 'Статус', type: mongoose.Schema.Types.ObjectId, ref: 'status'},
            {name: 'type', label: 'Тип публикации'},
            {name: 'authors', label: 'Полный список авторов'},
            {name: 'publishData', label: 'Выходные данные'},
            {name: 'bases', label: 'Базы данных'},
            {name: 'isbn', label: 'Шифр ISBN (для монографий)'},
            {name: 'date', label: 'Дата публикации', type:'Date'},
            {name: 'volume', label: 'Том, выпуск, страница'},
            {name: 'doi', label: 'DOI'},
        ]
    },
    grant: {
        label: "Гранты, контракты",
        fields:  [
            {name: 'name', label: 'Название'},
            {name: 'theme', label: 'Тема проекта или контракта'},
            {name: 'number', label: 'Внутренний номер или шифр контракта'},
            {name: 'authors', label: 'Список авторов-сотрудников ГБУ АН РС (Я)'},
            {name: 'date', label: 'Год публикации', type: 'Date'},
        ]
    },
    conference: {
        label: "Конференции",
        fields:[
            {name: 'name', label: 'Название конференции'},
            {name: 'organizer', label: 'Организация - инициатор конференции'},
            {name: 'status', label: 'Статус (международная, с международным участием, всероссийская, региональная и т.д.)'},
            {name: 'timePlace', label: 'Время и место проведения конференции'},
            {name: 'count', label: 'Количество участников, в том числе иностранных'},
            {name: 'participation', label: 'Форма участия (член оргкомитета, член рабочей группы, иное - указать)'},
        ]
    },
    report: {
        label: "Доклады",
        fields: [
            {name: 'name', label: 'Название доклада', required: true},
            {name: 'statusConference', label: 'Статус конференции', radio:['Российская','Международная']},
            {name: 'statusReport', label: 'Статус доклада', radio:['Пленарный','Устный','Стендовый']},
            {name: 'authors', label: 'Полный список авторов'},
            {name: 'reporter', label: 'Докладчик'},
            {name: 'date', label: 'Дата проведения конференции', type: 'Date'},

            {name: 'confName', label: 'Название конференции'},
            {name: 'volume', label: 'Номер тома и страницы в сборнике тезисов'},
            {name: 'participation', label: 'Способ участия', radio:['Очно','Он-лайн (ВКС)']},
        ]
    },
    patent: {
        label: "Патенты",
        fields: [
            {name: 'name', label: 'Вид РИД (патент на изобретение, база данных, иное - указать'},
            {name: 'authors', label: 'Полный список авторов'},
            {name: 'number', label: 'Номер свидетельства РИД'},
            {name: 'publishDate', label: 'Дата публикации'},
        ]
    },
    expert: {
        label: "Экспертная работа",
        fields:  [
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
    },
    science: {
        label: "Научно-организационная работа",
        fields: [
            {name: 'name', label: 'Название'},
            {name: 'preparation', label: 'Подготовка проектов нормативно-правовых актов'},
            {name: 'member', label: 'Член комиссий, научно-технических / ученых  советов министерств, ведомств, Ил Тумэн'},
            {name: 'innovation', label: 'Участие в работе комиссий министерств, ведомств, Ил Тумэн'},
            {name: 'participation', label: 'Проекты на получение грантов в том числе РНФ'},
            {name: 'others', label: 'Другое'},
        ]
    },
}

const modules = []
for (const key of Object.keys(models)){
    const model = models[key]
    const schemaObject = {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    }

    for(const field of model.fields){
        if(!schemaObject[field.name]) {
            if(!field.type) field.type = String;
            schemaObject[field.name] = field
        }
    }
    const schema = new mongoose.Schema(schemaObject,
        {
            timestamps: {createdAt: 'createdAt'},
            toObject: {virtuals: true},
            // use if your results might be retrieved as JSON
            // see http://stackoverflow.com/q/13133911/488666
            toJSON: {virtuals: true}
        });

    //schema.statics.fields = model.fields;
    schema.statics.population = model.fields.filter(f=>f.ref).map(f=>f.ref)

    schema.virtual('dateCreate')
        .get(function () {
            return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
        })
    schema.virtual('dateFormatted')
        .get(function () {
            return moment(this.date).format('YYYY-MM-DD');
        })
    modules.push(mongoose.model(key, schema))
}

module.exports = {models,modules, modelsArray: Object.keys(models).map(model => ({model, ...models[model]}))}