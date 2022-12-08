const passport = require("../passport");
const {modelsArray} = require("../db/dataModels/models");

module.exports = function (app) {
    const {db} = app.locals;

    app.get(`/api/:model/list`, passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {model} = req.params;
        const items = await db[model].find({user, _id:{$ne:null}})
        //.populate(db[model].population)
        const relations = {}
        for (const path of db[model].population) {
            relations[path] = (await db[path].find().sort({createdAt: 'desc'}))
        }
        res.send({items, relations})
    })

    app.delete(`/api/:model/:_id`, passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {_id, model} = req.params;
        await db[model].deleteOne({_id, user})
        res.sendStatus(200)
    })

    app.put(`/api/:model/:_id`, passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id, model} = req.params;
            delete req.body.user
            let item
            try {
                await db[model].updateOne({_id}, req.body)
                item = await db[model].findOne({_id, user})
            } catch (e) {
                item = await db[model].create({user, ...req.body})
            }
            res.send(item)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get(`/api/models`, async (req, res) => {
        res.send(modelsArray)
    })


    const places = [
        'WoS',
        'Scopus',
        'ВАК',
        'РИНЦ',
        'Монографии и переводы монографий при наличии номера ISBN',
        'Статья в зарубежном издании, не имеющим индекса',
        'Статья в российском издании, не имеющим индекса',
        'Статьи, публикуемые в электронных изданиях, на официальных изданиях, на официальных сайтах научных учреждениях и органов власти'
    ];

    const statuses = [
        'опубликована', 'принята к публикации', 'находится на рецензии'
    ]

    //db.place.find({_id: null}).then(console.log)
    async function initPublication() {
        for (const name of places) {
            await db.place.updateOne({name}, {name}, {upsert: true})
        }
        for (const name of statuses) {
            await db.status.updateOne({name}, {name}, {upsert: true})
        }
    }

    initPublication()

}
