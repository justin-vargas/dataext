const fs=require('fs');

function Capitalize( title) {
    words=title.split(" ")
    words.forEach( word=> {
        newword=word[0].toUpperCase()+word.substring(1);
        title=title.replace(word,newword)
    })
    return title
}

(async () => {
    let items=[]
    let data=JSON.parse((fs.readFileSync("johnnys.json")).toString());
    let keys=Object.keys(data)
    keys.forEach( key=> {
        let catname=Capitalize(key.replace(/\-/g," "))
        items.push(catname.trim());
        catitems=data[key]
        catitems.forEach(ci=> {
            if (ci!=catname) {
                let itm='';
                if (ci.indexOf(catname)==-1 && catname!="Greens") {
                    itm=`${catname} - ${ci}`
                }
                else {
                    itm=ci;
                }
                itm=itm.trim();
                if (!items.includes(itm)) {
                    items.push(itm)
                }
            }
        })
    })
    items=items.sort( function(a,b) {
        return ((a>b)?1:-1);
    })
    fs.writeFileSync("Seedlist.json", JSON.stringify(items,null,4))
   
})();