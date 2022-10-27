const passport = require('../passport');
const clc = require("cli-color");

module.exports = function (app) {
    const {db} = app.locals;
    async function initAdmin() {
        if (!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW)) {
            return console.log('WARN:', clc.red('NO process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW specified'));
        }
        const abrikos = await db.user.findOne({email: process.env.ADMIN_EMAIL})
        if (!abrikos) {
            db.user.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                isAdmin: true
            })
        } else {
            abrikos.isAdmin = true;
            abrikos.save()
        }
    }

    initAdmin()

    app.get('/api/admin/users', passport.isAdmin, async (req, res) => {
        const users = await db.user.find()
        res.send(users)
    })

    app.post('/api/admin/switch-role', passport.isAdmin, async (req, res) => {
        const user = await db.user.findById(req.body.id)
        user.isAdmin = !user.isAdmin
        await user.save()
        res.sendStatus(200)
    })

}
