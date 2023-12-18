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
const johnnys_1 = __importDefault(require("./_lib/johnnys"));
https: //www.johnnyseeds.com/on/demandware.store/Sites-JSS-Site/en_US/SearchServices-GetSuggestions?q=4499G
 (() => __awaiter(void 0, void 0, void 0, function* () {
    const args = process.argv.slice(2);
    console.log('arg', args);
    let result = yield johnnys_1.default.lookup(args[0]);
    console.log('REs', result);
}))();
//# sourceMappingURL=johnnys_lookup.js.map