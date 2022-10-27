const fs = require('fs');
const walkSync = function (dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    } else {
      filelist.push(dir + '/' + file);
    }
  });
  return filelist;
};

async function main() {
  const files = walkSync('./frontend');
  const langFile = `frontend/lang/en.json`;
  let langJson = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
  const regexp = /[^\w]\$t\('(.*?)'[\)|,]/g;

  for (const file of files) {
    const content = fs.readFileSync(file)
    let result;
    while (result = regexp.exec(content)) {
      //console.log('found: ',lang[result[1]], result[1]);
      if (!langJson[result[1]]) {
        console.log(langJson[result[1]], result[1])
        langJson[result[1]] = result[1];
      }
    }
  }
  fs.writeFileSync(langFile, JSON.stringify(langJson, null, ` `));


  const ruFile = "frontend/lang/ru.json";
  const en = require("../frontend/lang/en.json");
  const ru = require(`../${ruFile}`);

  for (const section of Object.keys(en)) {
    if (!ru[section]) {
      ru[section] = en[section]
      console.log(section)
    } else {
      for (const label of Object.keys(en[section])) {
        if (!ru[section][label]) {
          console.log(section, label)
          ru[section][label] = en[section][label];
        }
      }
    }

  }

  const jsonStr = JSON.stringify(ru, null, `\t`);
  fs.writeFileSync(ruFile, jsonStr)
}

main()
