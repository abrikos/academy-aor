const fs = require('fs');
const path = require('path');
const chalk = require('cli-color');

const basename = path.basename(__filename);

module.exports = function (app){
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const fpath =path.join(__dirname, file);
      try {
        const module = require(fpath);
        module(app)
      }catch (e) {
        console.log(chalk.yellow( 'WARN: Script ' + file + ' - not a module', fpath))
        console.log(e)
      }

    });

}
