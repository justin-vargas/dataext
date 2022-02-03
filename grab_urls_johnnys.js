const fs=require('fs')
const cheerio=require('cheerio')
const { find } = require('domutils')

let filedat=fs.readFileSync('test.html')

const $=cheerio.load(filedat)
const dat=$('.c-mega-menu__link')
const urllist=[]
const fnd=["/vegetables/", "/herbs/", "/fruits/"]
for (let i=0; i<dat.length; i++) {
    let d=dat[i]
    //console.log(d.firstChild.data)
    let href=d.attribs.href
    
    found=false;
    fnd.forEach( f=> {
        if (href.indexOf(f)>-1)  {
            found=true;
        }
    })
    if (found) {
        urllist.push(href)
    }
}
urlstr=urllist.join("\n")
fs.writeFileSync("urllist.txt",urlstr)
console.log(JSON.stringify(urllist))
