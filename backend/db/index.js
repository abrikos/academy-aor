const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const chalk = require('cli-color');
const basename = path.basename(__filename);
const modulesData = require('./dataModels/models')

const modules ={};
fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const fpath =path.join(__dirname, file);
      try {
        const module = require(fpath);
        modules[module.collection.modelName] = (module)
        //module(app)
      }catch (e) {
        console.log(chalk.red( 'WARN: Script ' + file + ' - not a module', fpath))
        console.log(e)
      }

    });

for(const module of modulesData.modules){
  modules[module.collection.modelName] = (module)
}
module.exports = modules

try {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  })
  console.log('Connect MongoDB:', process.env.MONGODB_URI)
} catch (e) {
  console.log('Mongoose error:', e.message)
}


