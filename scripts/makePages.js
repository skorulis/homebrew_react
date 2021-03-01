const fs = require('fs');

for(let i = 10; i <= 40; ++i) {
    let filename1 = `./public/beers/skorubrew${i}.json`;
    let filename2 = `./public/beers/skorubrew${i}.md`;

    fs.writeFileSync(filename1, "");
    fs.writeFileSync(filename2, "");
}