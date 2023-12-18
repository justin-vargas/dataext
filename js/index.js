
const api=require('./modules/api');
const fs=require('fs');
const cheerio=require('cheerio');
let cats={};
let item_names=[]

async function getList(url, selector) {
    filedat=await api.get(url);
    const $=cheerio.load(filedat.toString());
    let results=$(selector);
    return results
}

async function getPageItems(url, category) {
    let pagestr=(await api.get(url)).toString()
    let res=pagestr.match(/(var dlObjects = )(.*)(\;)/g)[0].replace('var dlObjects = ','').replace(";",'')
    let rdat=JSON.parse(res)[0].ecommerce.impressions
    let opts=rdat.map(opt=>{ return opt.name.replace("F1","").trim()})    
    if (!cats[category]) {
        cats[category]=opts
    }
    else {
        cats[category]=cats[category].concat(opts)
    }
    const parsed=parseNames(opts, category)
    item_names=item_names.concat(parsed)         
    console.log(category) 
    return opts
}


function parseNames(catitems, catname) {
    const items=(catname!="Greens" && catname!="Herbs")?[catname]:[];
    catitems.forEach(ci=> {
        if (ci!=catname) {
            ci=ci.replace(catname,'').trim();
            let itm='';
            if (ci.indexOf(catname)==-1 && catname!="Greens" && catname!="Herbs") {
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
    return items;
}



(async () => {
    let listitems=await getList("https://www.highmowingseeds.com/","li .category-item a" );
    let i=0
    while (i<listitems.length) {
        itm=listitems[i];
        let category=itm.children[0].children[0].data
        try {
            if (category.indexOf("All")==-1) {
                const opts=await getPageItems(itm.attribs.href, category)
                //console.log(res)

            }
                  
        }
         catch (ex) {}         
        i++;
    }
    let herbslist=["https://www.highmowingseeds.com/herbs.html?p=1&product_list_limit=25",
                    "https://www.highmowingseeds.com/herbs.html?p=2&product_list_limit=25"
                ];
    let list_promises=[]
    herbslist.forEach(url=> {
        list_promises.push(getPageItems(url, "Herbs"))
    })
    await Promise.all(list_promises)
    item_names=item_names.sort((a,b) =>{ return (a>b?1:-1)})

    fs.writeFileSync("Seedlist_high_mow.json", JSON.stringify(item_names,null,4))

})();