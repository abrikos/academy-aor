const fs = require("fs");
const file = __dirname + '/../../frontend.bak/dist/index.html'

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/build-date', (req, res) => {
        fs.stat(file, (err, stats) => {
            res.send(stats)
        })
    })

}
