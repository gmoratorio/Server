const scrape = require("../routes/scrape");
// const request = require("request");
// const http = require("http");
// http.post = require("http-post");
const knex = require('../db/connection');

module.exports = {

    // postWWStuff: function postWWStuff(startDate, endDate, destinationURL) {
    //     // const postURL = `${destinationURL}/scrape/westword/${startDate}/${endDate}`;
    //     const postURL = `${destinationURL}/scrape/deardenver`;
    //
    //
    //     request(postURL, function(error, response, body) {
    //         // console.log(body);
    //         const testBody = {
    //             "sourceName": "TEST",
    //             "eventLink": "https://www.facebook.com/events/1864904230404701/",
    //             "description": "Ratio is kicking off a new comedy series called Live at Ratio",
    //             "date": "Wednesday, December 28, 2016",
    //             "time": "8 – 10pm",
    //             "eventName": "Live Comedy Taping: Ian Douglas Terry"
    //         };
    //         const headers = {
    //             'Content-Type': 'application/json'
    //         }
    //
    //         const options = {
    //                 url: `${destinationURL}/events`,
    //                 // url: `https://stack-of-all-trade.herokuapp.com/events`,
    //                 method: 'POST',
    //                 json: true,
    //                 headers: headers,
    //                 body: testBody
    //             }
    //             // console.log(options);
    //         if (!error && response.statusCode == 200) {
    //             // const result = http.post(`${destinationURL}/events`, body, (res) => {
    //             //     response.setEncoding('utf8');
    //             //     res.on('data', function(chunk) {
    //             //         // console.log(chunk);
    //             //     });
    //             // });
    //             // console.log(result);
    //             // request(options, (error, response, body) => {
    //             //     if (!error && response.statusCode == 200) {
    //             //         // Print out the response body
    //             //         console.log(body);
    //             //     } else {
    //             //         console.log(`The error is: ${error}`);
    //             //         console.log(response);
    //             //         // console.log(response);
    //             //     }
    //             // })
    //             // request.post(`https://stack-of-all-trade.herokuapp.com/events`, (err, response, body) => {
    //             //   if (!error && response.statusCode == 200) {
    //             //     console.log("it worked!");
    //             //   }
    //             //   else{
    //             //     console.log("it didn't work");
    //             //     console.log(response.statusCode);
    //             //   }
    //             // });
    //             request.post(
    //                 `https://stack-of-all-trade.herokuapp.com/events`, {
    //                     json: {
    //                         testBody
    //                     }
    //                 },
    //                 function(error, response, body) {
    //                     if (!error && response.statusCode == 200) {
    //                         console.log(body)
    //                     } else {
    //                         console.log(error);
    //                         console.log(response.statusCode);
    //                         console.log(response);
    //                     }
    //                 }
    //             );
    //
    //         } else {
    //             console.log("It didn't work :()")
    //         }
    //     })
    //
    // }

    postToDB: function postToDB(eventArray) {

        const inserts = eventArray.map(function(event) {
          const sourceName = event.sourceName;
          const eventName = event.eventName;

          let eventLink = null;
          if(event.eventLink){
            eventLink = event.eventLink;
          }

          let description = null;
          if(event.description){
            description = event.description;
          }

          let date = null;
          if(event.date){
            date = event.date;
          }

          let time = null;
          if(event.time){
            time = event.time;
          }

          let price = null;
          if(event.price){
            price = event.price;
          }

          let imageLink = null;
          if(event.imageLink){
            imageLink = event.imageLink;
          }

          let location = null;
          if(event.location){
            location = event.location;
          }

          let address = null;
          if(event.address){
            address = event.address;
          }

          let scrapeID = null;
          if(event.scrapeID){
            scrapeID = event.scrapeID;
          }

            return knex('event').insert({
                source_name: sourceName,
                event_name: eventName,
                scrape_id: scrapeID,
                event_link: eventLink,
                description: description,
                date: date,
                time: time,
                price: price,
                image_link: imageLink,
                location: location,
                address: address

            });
        });
        return Promise.all(inserts)
            .then(() => {
                return {
                    message: 'success'
                };
            });

    }

}
