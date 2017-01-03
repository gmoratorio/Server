const cheerio = require('cheerio');
const request = require('request');
const FeedParser = require('feedparser');




module.exports = {
    // getXML: function getXML(requestURL) {
    //     return new Promise((resolve, reject) => {
    //         return request(requestURL, (error, response, body) => {
    //             if (!error && response.statusCode === 200) {
    //                 resolve(body);
    //             } else {
    //                 reject(error);
    //             }
    //         });
    //     });
    // },
    getContent: function getContent(requestURL) {

        return new Promise((resolve, reject) => {

            var req = request(requestURL);
            var feedparser = new FeedParser();

            req.on('error', function(error) {
                reject(error);
            });

            req.on('response', function(res) {
                var stream = this; // `this` is `req`, which is a stream

                if (res.statusCode !== 200) {
                    reject(res);
                } else {
                    stream.pipe(feedparser);
                }
            });

            feedparser.on('error', function(error) {
                reject(error);
            });
            let itemArray = [];
            let done = false;
            feedparser.on('readable', function() {
                // This is where the action is!
                var stream = this; // `this` is `feedparser`, which is a stream
                var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
                var item;

                while (item = stream.read()) {
                    // console.log(item.title);
                    itemArray.push(item);
                    // itemArray = promisify(item, itemArray);
                    // resolve(item);

                }
            });

            feedparser.on('end', () => {
                resolve(itemArray);
            });



        });
    },
    createCleanObject: function createCleanObject(eventObject, sourceName) {
        return new Promise((resolve, reject) => {
            let cleanObject = {};
            cleanObject.sourceName = sourceName;
            cleanObject.title = eventObject.title;
            cleanObject.summary = null;
            cleanObject.time = null;
            cleanObject.date = null;

            if (eventObject.description != null) {
                if (eventObject.description.length > 50) {
                    cleanObject.summary = eventObject.description;
                }
                else {
                    cleanObject.title += eventObject.description;
                }
            }
            cleanObject.link = eventObject.link;


            resolve(cleanObject);
        });
    }

    // promisify: function promisify(item, itemArray){
    //   return new Promise((resolve, reject) => {
    //       itemArray.push(item);
    //       console.log(itemArray);
    //       resolve(itemArray);
    //   });
    // }

}
