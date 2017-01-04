const sugar = require("sugar-date");
const moment = require("moment");
const validation = require("../db/validation");

module.exports = {
    normalizeDate: function normalizeDate(date) {
        const normalDate = sugar.Date.create(date);
        if (normalDate == "Invalid Date") {
            date = date.replace("Monday,", "").replace("Tuesday,", "").replace("Wednesday,", "").replace("Thursday,", "").replace("Friday,", "").replace("Saturday,", "").replace("Sunday,", "").trim();

            return date;

        } else {
            return normalDate;
        }

    },
    getNextWWQuery: function getNextWWQuery(date, source) {
        if (source === "WestWord") {
            const startDate = sugar.Date(date).addDays(1).format('{yyyy}-{MM}-{dd}').raw;
            const endDate = sugar.Date(date).addDays(7).format('{yyyy}-{MM}-{dd}').raw;
            const dateQueryArray = [startDate, endDate];
            return dateQueryArray;
        }

    },
    getStartDateFromURL: function getStartDateFromURL(url) {
        const cleanURL = url.replace("https://deardenver.net/", "");
        const queryArray = cleanURL.split("/");
        const year = queryArray[0];
        const month = queryArray[1];
        const day = queryArray[2];
        const startDate = `${year}-${month}-${day}`;
        return startDate;
    },
    getDifference: function getDifference(expectedOlderDate, expectedNewerDate, type) {
        let diff = null;
        if (type === "hours") {
            diff = sugar.Date(expectedOlderDate).hoursUntil(expectedNewerDate).raw;
        } else if (type === "days") {
            diff = sugar.Date(expectedOlderDate).daysUntil(expectedNewerDate).raw;
        }

        return diff;
    },
    createYesterday: function createYesterday() {
        const yesterday = sugar.Date.create('yesterday');
        return yesterday;
    },
    createMaxQueryDate: function createMaxQueryDate() {
        let maxFutureDate = sugar.Date('today').addDays(30).raw;
        return maxFutureDate;
    }


}
