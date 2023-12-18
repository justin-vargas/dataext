const api=require('./modules/api');
const fs=require('fs');
const cheerio=require('cheerio');
let cats={};

(async () => {

    let data=(fs.readFileSync("urllist.txt")).toString().split("\n")
    console.log(data.length)
    let i=0;
    while (i<data.length) {
        const url=data[i]
        filedat=await api.get(url);
        cat=url.split("/")[url.split("/").length-2];
        const $=cheerio.load(filedat.toString())
        const values=$('div .product-name')
        const products=[]
        let x=0;
        while (x<values.length) {
            v=values[x]
            const product_name=v.firstChild.data.replace(/[\n]/g,'')
            products.push(product_name)
            x++;
        }
        cats[cat]=products
       // console.log(JSON.stringify(cats))
        console.log(`${cat}: ${products.length}`)
        i++
    }
    fs.writeFileSync('johnnys.json',JSON.stringify(cats))
    // console.log(JSON.stringify(result))
})();