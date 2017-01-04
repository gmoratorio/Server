const sugar = require("sugar-date");
const moment = require("moment");

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
    prepareNextQuery: function prepareNextQuery(date, source){
      if(source === "Dear Denver"){

      }
      else if(source === "WestWord"){
        const startDate = sugar.Date(date).addDays(1);
        const endDate = sugar.Date(date).addDays(7);
        const startQuery = startDate.format('{yyyy}-{MM}-{dd}').raw;
        const endQuery = endDate.format('{yyyy}-{MM}-{dd}').raw;
        const dateQueryArray = [startQuery, endQuery];
        return dateQueryArray;
      }

    },
    getStartDateFromURL: function getStartDateFromURL(url){
      const cleanURL = url.replace("https://deardenver.net/","");
      const queryArray = cleanURL.split("/");
      const year = queryArray[0];
      const month = queryArray[1];
      const day = queryArray[2];
      const startDate = `${year}-${month}-${day}`;
      return startDate;
    }

}
