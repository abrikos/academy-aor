const passport = require('../passport');
const clc = require("cli-color");
const modulesData = require('../db/dataModels/models')
const logger = require('../logger')

module.exports = function (app) {
    const {db} = app.locals;

    app.get('/api/admin/model/:model', passport.isAdmin, async (req, res) => {
        const {model} = req.params
        const items = await db[model].find().populate(['user', ...db[model].population])
        const relations = {}
        for (const path of db[model].population) {
            relations[path] = (await db[path].find().sort({createdAt: 'desc'}))
        }
        res.send({items, relations})
    })

    async function userData(id){
        const user = await db.user.findById(id);
        const items = []
        for(const {model} of modulesData.modelsArray){
            const relations = {}
            const data = await db[model].find({user}).populate(db[model].population)
            items.push({model, data})
        }
        return {items, user}
    }
    //userData('6386aaefd61c6ea46a390a84')

    app.get('/api/admin/user/:id', passport.isAdmin, async (req, res) => {
        const {id} = req.params


        res.send(await userData(id))
    })
    app.get('/api/admin/users', passport.isAdmin, async (req, res) => {
        try {
            const users = await db.user.find()
                .populate(db.user.population)
            res.send(users)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/admin/switch-role', passport.isAdmin, async (req, res) => {
        try {
            const user = await db.user.findById(req.body.id)
            user.isAdmin = !user.isAdmin
            await user.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/admin/user/:id', passport.isAdmin, async (req, res) => {
        try {
            const user = await db.user.findById(req.params.id)
            await user.delete()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    async function initAdmin() {
        //await db.user.deleteMany().then(console.log)
        if (!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW)) {
            return console.log('WARN:', clc.red('NO process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW specified'));
        }
        const abrikos = await db.user.findOne({email: process.env.ADMIN_EMAIL})
        if (!abrikos) {
            db.user.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSW,
                isAdmin: true
            })
        } else {
            abrikos.isAdmin = true;
            abrikos.save()
        }
    }

    initAdmin()


}
