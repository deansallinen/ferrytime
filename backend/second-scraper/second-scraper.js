"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper = require('table-scraper');
const { fromPairs, flatten } = require('lodash');
const moment = require('moment-timezone');
const scrapeConditions = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield scraper.get('https://orca.bcferries.com/cc/marqui/at-a-glance.asp');
        return res;
    }
    catch (err) {
        throw err;
    }
});
const getConditionsPromise = () => scrapeConditions().then(res => {
    return flatten(res
        .map((each) => {
        if (each[0][0] === 'Route') {
            const [headers, ...data] = each;
            const table = data
                .map((element) => {
                if (Object.keys(element).length > 3 && element[0]) {
                    // console.log(element)
                    return {
                        [element[0]]: fromPairs(element[1]
                            .split(' full')
                            .filter(Boolean)
                            .map((x) => {
                            const [time, percentage] = x.split('m');
                            const timestamp = new moment(time, 'hh:mma', 'America/Vancouver');
                            return [timestamp, percentage];
                        }))
                    };
                }
            })
                .filter(Boolean);
            return table;
        }
    })
        .filter(Boolean));
});
exports.getConditionsPromise = getConditionsPromise;
