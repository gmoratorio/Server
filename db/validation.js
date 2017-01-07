


const knex = require("./connection");
const dates = require("../functions/dates");

module.exports = {

    returnLatestDate: function returnLatestDate(source) {
        return knex('event').max('date')
            .select()
            .where('source_name', source)
            .whereNot('date', 'like', '%Monday%')
            .whereNot('date', 'like', '%Tuesday%')
            .whereNot('date', 'like', '%Wednesday%')
            .whereNot('date', 'like', '%Thursday%')
            .whereNot('date', 'like', '%Friday%')
            .whereNot('date', 'like', '%Saturday%')
            .whereNot('date', 'like', '%Sunday%')
            .whereNot('date', 'like', '%January%')
            .whereNot('date', 'like', '%February%')
            .whereNot('date', 'like', '%March%')
            .whereNot('date', 'like', '%April%')
            .whereNot('date', 'like', '%May%')
            .whereNot('date', 'like', '%June%')
            .whereNot('date', 'like', '%July%')
            .whereNot('date', 'like', '%August%')
            .whereNot('date', 'like', '%September%')
            .whereNot('date', 'like', '%October%')
            .whereNot('date', 'like', '%November%')
            .whereNot('date', 'like', '%December%')
            .whereNot('date', 'like', '%doors%')
            .whereNot('date', 'like', '%at%')
            .first()
            .then((result) => {
                if (result.max !== null) {
                  // console.log(result.max);
                  // console.log("it wasn't null");
                    return result.max;
                } else {
                  // console.log("it was null");
                    return null;
                }


            })
    }

}
