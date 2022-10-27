const passport = require("../passport");

module.exports = function (app) {
    const {db} = app.locals;

    for(const model of Object.keys(db)){
        if(db[model].fields){
            app.get(`/api/${model}/list`, passport.isLogged, async (req, res) => {
                const {user} = res.locals;
                const items = await db[model].find({user})
                    //.populate(db[model].population)
                const relations = {}
                for(const relation of db[model].population){
                    relations[relation.path] = (await db[relation.path].find())
                }
                res.send({items, fields: db[model].fields, relations})
            })

            app.delete(`/api/${model}/:_id`, passport.isLogged, async (req, res) => {
                const {user} = res.locals;
                const {_id} = req.params;
                await db[model].deleteOne({_id, user})
                res.sendStatus(200)
            })

            app.put(`/api/${model}/:_id`, passport.isLogged, async (req, res) => {
                try {
                    const {user} = res.locals;
                    const {_id} = req.params;
                    delete req.body.user
                    let item
                    try {
                        await db[model].findOne({_id, user})
                        item = await db[model].updateOne({_id}, req.body)
                    }catch (e) {
                        item = await db[model].create({user,  ...req.body})
                    }
                    res.send(item)
                }catch (e) {
                    app.locals.errorLogger(e, res)
                }
            })
        }
    }



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
