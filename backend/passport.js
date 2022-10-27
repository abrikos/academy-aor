const md5 = require('md5')
const moment = require('moment')
const cookieName = 'authToken'

const methods = {
    cookieName,
    async getUser(req, res) {
        if (!req.cookies[cookieName]) return;
        const name = req.cookies[cookieName];
        const token = await res.locals.db.token.findOne({name})
          .populate('user')
        if (!token) return
        return token.user;
    },

    adaptUser(user){
        return user
    },

    async authenticate(req, res) {
        try {
            const {email, password} = req.body
            const user = await res.locals.db.user.findOne({email})
            if (!user) return res.status(500).send({message: 'No user found'})
            if (!user.checkPasswd(password)) {
                return res.status(500).send({message: 'Wrong password'});
            }
            const token = await res.locals.db.token.create({user, name: md5(moment().unix())});
            res.cookie(cookieName, token.name, {
                secure: true,
                //secure: process.env.NODE_ENV !== "development",
                httpOnly: true,
                expires: new Date(moment().add(30, 'days').toISOString()),
            });
            res.send(token.name)
        } catch (e) {
            res.locals.errorLogger(e, res)
        }
    },

    async logout(req, res) {
        const token = await res.locals.db.token.findOne({name: req.cookies[cookieName]});
        if (!token) return;
        token.delete();
        res.clearCookie(cookieName);
        res.end();
    },

    googleStrategy() {
        console.log(this)
    },

}

async function isLogged(req, res, next) {
    const found = await methods.getUser(req, res);
    if (!found) return res.status(401).send({status: 401, message: 'Must be logged user'})
    res.locals.user = found;
    return next()
}

async function isAdmin(req, res, next) {
    const found = await methods.getUser(req, res);
    if (!found) return res.status(401).send({status: 401, message: 'Must be logged user'})
    if (!found.isAdmin) return res.status(403).send({status: 401, message: 'Access denied'})
    res.locals.user = found;
    return next()
}

module.exports = {...methods, isLogged, isAdmin}
