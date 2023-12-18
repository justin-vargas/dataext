"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
class johnnyseeds {
    static lookup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.johnnyseeds.com/on/demandware.store/Sites-JSS-Site/en_US/SearchServices-GetSuggestions?q=${id}`);
            const body = yield response.text();
            const $ = cheerio_1.default.load(body);
            const dat = $('#product-0 > a > div.suggestion-info > span.name').text();
            const dat2 = $('#product-0 > a > div.suggestion-info > span.alternate-name').text();
            const dat3 = $('#product-0 > a');
            console.log('d3', dat3[0].attribs.href);
            let dets = yield this.lookupDetails(dat3[0].attribs.href);
            return { "name": dat, "alt_name": dat2 };
        });
    }
    static lookupDetails(href) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.johnnyseeds.com${href}`);
            const body = yield response.text();
            const $ = cheerio_1.default.load(body);
            const dat = $('#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(4)').text().trim();
            const dat2 = $('').text().trim();
            let returnobj = { "seed_co": "Johnny's", "determinate": "No", "trellis": "No" };
            Object.keys(this.attributes).forEach(k => {
                returnobj[k] = $(this.attributes[k]).text().trim();
            });
            returnobj.organic = false;
            if (returnobj.description && returnobj.description.toLowerCase().indexOf("organic") > -1) {
                returnobj.organic = "Yes";
            }
            if (returnobj.description && returnobj.full_desc.toLowerCase().indexOf(" determinate") > -1) {
                returnobj.determinate = "Yes";
            }
            returnobj.hybrid_status = returnobj.hybrid_status ? returnobj.hybrid_status : returnobj.hybrid_status2;
            if (returnobj.description.indexOf("F1") > -1 || (returnobj.hybrid_status && returnobj.hybrid_status.indexOf("Hybrid") > -1)) {
                returnobj.heirloom = "No";
                returnobj.hybrid = "Yes";
            }
            if (returnobj.hybrid_status && returnobj.hybrid_status.indexOf("Open Polinated") > -1) {
                returnobj.heirloom = "Yes";
                returnobj.hybrid = "No";
            }
            if (returnobj.dtm.indexOf(";")) {
                returnobj.dtm = returnobj.dtm.split(";")[0].trim().split(" ")[0];
            }
            returnobj.link = `https://www.johnnyseeds.com${href}`;
            console.log('o', returnobj);
            return returnobj;
        });
    }
}
johnnyseeds.attributes = {
    "dtm": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(4)",
    "hybrid_status": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(10) > h4",
    "hybrid_status2": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(8) > h4",
    "lifecycle": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-4.mb-lg-5 > div.row.product-attributes.d-none.d-lg-block.col-12 > div > div > dl > dd:nth-child(6) > h4",
    "category": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(1) > div > div > div > div > ol > li:nth-child(1) > a",
    "type": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(1) > div > div > div > div > ol > li:nth-child(2) > a",
    "description": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-8 > div.row.product-header.align-items-end.align-items-lg-start.d-none.d-lg-flex > div:nth-child(1) > h1 > span",
    "name": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-8 > div.row.product-header.align-items-end.align-items-lg-start.d-none.d-lg-flex > div:nth-child(1) > h1",
    "full_desc": "#maincontent > div.container.product-detail.product-wrapper > div:nth-child(2) > div.col-12.col-lg-8 > div.row.mt-2.mt-lg-3 > div > div.details.collapsible-xs"
};
exports.default = johnnyseeds;
//# sourceMappingURL=johnnys.js.map