
import { doesNotMatch } from "assert";
import cheerioModule from "cheerio";

export default class johnnyseeds {


    public static attributes:any ={ 
        "dtm": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(4)",
        "hybrid_status": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(10) > h4",
        "hybrid_status2": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(8) > h4",
        "lifecycle": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(6) > h4",
        "category": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(1) > div > div > div > div > ol > li:nth-child(1) > a",
        "type": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(1) > div > div > div > div > ol > li:nth-child(2) > a",
        "description": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-8 > div.row.product-header.align-items-end.align-items-lg-start.d-none.d-lg-flex > div:nth-child(1) > h1 > span",
        "name": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-8 > div.row.product-header.align-items-end.align-items-lg-start.d-none.d-lg-flex > div:nth-child(1) > h1",
        "full_desc": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-8 > div.row.mt-2.mt-lg-3 > div > div.details.collapsible-xs"
    }

    public static async lookup(id:string): Promise<any> {
        const response = await fetch(`https://www.johnnyseeds.com/on/demandware.store/Sites-JSS-Site/en_US/SearchServices-GetSuggestions?q=${id}`);
        const body = await response.text();
        const $=cheerioModule.load(body)
        const dat=$('#product-0 > a > div.suggestion-info > span.name').text()
        const dat2=$('#product-0 > a > div.suggestion-info > span.alternate-name').text()
        const dat3=$('#product-0 > a');
        console.log('d3',dat3[0].attribs.href)
        let dets=await this.lookupDetails(dat3[0].attribs.href)
        return { "name": dat, "alt_name": dat2}
    
    }
    public static async lookupDetails(href:string): Promise<any> {
        const response = await fetch(`https://www.johnnyseeds.com${href}`);
        const body = await response.text();
        const $=cheerioModule.load(body)

        const dat=$('#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(4)').text().trim()
        const dat2=$('').text().trim()
        let returnobj:any ={"seed_co": "Johnny's", "determinate": "No", "trellis": "No"}
        Object.keys(this.attributes).forEach(k=> {
            returnobj[k]=$(this.attributes[k]).text().trim();
        });
        returnobj.organic=false;
        if (returnobj.description && returnobj.description.toLowerCase().indexOf("organic")>-1) {
            returnobj.organic="Yes";
        }
        if (returnobj.description && returnobj.full_desc.toLowerCase().indexOf(" determinate")>-1) {
            returnobj.determinate="Yes";
        }
        returnobj.hybrid_status=returnobj.hybrid_status?returnobj.hybrid_status:returnobj.hybrid_status2
        if (returnobj.description.indexOf("F1")>-1 || (returnobj.hybrid_status && returnobj.hybrid_status.indexOf("Hybrid")>-1)) {
            returnobj.heirloom="No";
            returnobj.hybrid="Yes";
        }
        if (returnobj.hybrid_status && returnobj.hybrid_status.indexOf("Open Polinated")>-1) {
            returnobj.heirloom="Yes";
            returnobj.hybrid="No";
        }
        if (returnobj.dtm.indexOf(";")) {
            returnobj.dtm=returnobj.dtm.split(";")[0].trim().split(" ")[0]
        }
        returnobj.link=`https://www.johnnyseeds.com${href}`
        console.log('o',returnobj)
        return returnobj
    
    }

}