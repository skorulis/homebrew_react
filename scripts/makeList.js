const fs = require('fs');

const beerFolder = './public/beers/';

function makeBeerItem(filename) {
    let fullPath = beerFolder + filename
    let data = JSON.parse( fs.readFileSync(fullPath));
    console.log(data);

    return {
        number: data.number,
        brewDate: data.brewDate,
        bottleDate: data.bottleDate,
        status: data.status
    }
}


let files = fs.readdirSync(beerFolder)
let beerFiles = files.filter(x => x.endsWith(".json"))

console.log(beerFiles)

let beerList = beerFiles.map(x => makeBeerItem(x) )

console.log(beerList)

let listFile = JSON.stringify(beerList)
fs.writeFileSync("./public/beerList.json", listFile);
