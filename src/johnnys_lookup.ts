import cheerioModule from "cheerio";
import johnnyseeds from "./_lib/johnnys";




https://www.johnnyseeds.com/on/demandware.store/Sites-JSS-Site/en_US/SearchServices-GetSuggestions?q=4499G


( async()=> {
    
    const args = process.argv.slice(2);
    console.log('arg', args)
    let result=await johnnyseeds.lookup(args[0]);
    console.log('REs', result)


})();
