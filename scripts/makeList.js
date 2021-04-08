const fs = require('fs');

const beerFolder = './public/beers/';

function makeBeerItem(filename) {
    let fullPath = beerFolder + filename
    console.log(`Processing: ${filename}`)
    let data = JSON.parse( fs.readFileSync(fullPath));
    

    return {
        number: data.number,
        brewDate: data.brewDate,
        bottleDate: data.bottleDate,
        status: data.brewStatus,
        style: data.style
    }
}


let files = fs.readdirSync(beerFolder)
let beerFiles = files.filter(x => x.endsWith(".json"))

console.log(beerFiles)

let beerList = beerFiles.map(x => makeBeerItem(x) )
beerList = beerList.sort((x,y) => y.number - x.number)

console.log(beerList)

let listFile = JSON.stringify(beerList)
fs.writeFileSync("./public/beerList.json", listFile);
