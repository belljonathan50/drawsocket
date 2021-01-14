
const fs = require('fs');
const path = require('path');
const Max = require('max-api');

const placeholder = 'AUTOGENERATED';

let pathToCopyTo = process.argv.slice(2)[0];
let publicFolder = pathToCopyTo + '/public/'


Max.post(__dirname, pathToCopyTo);


var lastSlash = pathToCopyTo.lastIndexOf('/') + 1;
var afterDrive = pathToCopyTo.lastIndexOf(':') + 1;

let pathToScript = pathToCopyTo.slice(afterDrive, lastSlash - afterDrive);
let newFolderName = pathToCopyTo.slice(lastSlash);

Max.post(__dirname, pathToCopyTo);

if (!fs.existsSync(pathToCopyTo))
{
    fs.mkdirSync(pathToCopyTo);
}

if( !fs.existsSync(publicFolder) )
{
    fs.mkdirSync(publicFolder);
}

const templateHTML = newFolderName + '-page.html';

fs.copyFileSync(__dirname + '/lib/drawsocket-page.html', publicFolder + templateHTML);

let serverTemplateHTML = fs.readFileSync( __dirname + '/lib/drawsocket-page.html', 'utf8');
serverTemplateHTML = `<!-- ${newFolderName} -->\n` + serverTemplateHTML;
fs.writeFileSync( publicFolder + templateHTML, serverTemplateHTML )

let serverTemplate = fs.readFileSync( __dirname + "/server-template.maxpat" , 'utf8');
let newServerPatch = serverTemplate.replace(new RegExp(placeholder, 'g'), templateHTML );
fs.writeFileSync( pathToCopyTo + "/" + newFolderName + '-server.maxpat', newServerPatch )

process.exit(0);