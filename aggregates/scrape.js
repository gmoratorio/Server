


const cheerio = require('cheerio');
const request = require('request');
const dates = require('../functions/dates');

//fixed strict
module.exports = {

    getHTML: function getHTML(requestURL) {
        return new Promise((resolve, reject) => {
            return request(requestURL, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    if(response.statusCode){
                      console.log(response.statusCode);
                    }
                    else{
                      console.log(response);
                    }
                    console.log("There was an error getting the initial HTML");
                }
            });
        });
    },

    getPostNumbers: function getPostNumbers(html) {
        let posts = [];
        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            $('.type-post').each((i, element) => {
                const longClass = $(element).attr('class');
                const postNumber = longClass.substr(0, longClass.indexOf(' '));
                posts[i] = postNumber;
            });

            if (posts) {
                const postsJSON = {
                    posts
                }
                resolve(postsJSON);
            } else {
                console.log("There was an error getting Dear Denver post numbers");
            }
        });
    },
    getPostLink: function getPostLink(html, post) {
        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            const postLink = $(`.${post} a`).first().attr('href');
            if (postLink) {
                resolve(postLink);
            } else {
                console.log("There was an error getting Dear Denver post links");
            }

        });
    },
    getEventInfo: function getEventInfo(html, sourceName) {

        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            let eventArray = [];
            let typeArray = ["p u", "span[style*='text-decoration:underline;']"];
            typeArray.forEach((type) => {
                $(type).each((i, element) => {
                    let eventObject = {};
                    eventObject.sourceName = sourceName;
                    const parentP = $(element).closest("p");
                    const eventLink = $(parentP).find("a").attr("href");
                    if (eventLink) {
                        eventObject.eventLink = eventLink;
                    }
                    const descriptionP = parentP.next();
                    const descriptionPText = descriptionP.text();
                    eventObject.description = descriptionPText;

                    let extractedDate = parentP.children().first();
                    let extractedDateText = extractedDate.text();
                    if (extractedDateText === "") {
                        //some posts have blank <b></b> tags before the ate entry
                        extractedDate = extractedDate.siblings().first();
                        extractedDateText = extractedDate.text();
                    }
                    let indexOfAt = extractedDateText.indexOf("@");
                    let indexOfN = extractedDateText.indexOf("n:");
                    let indexOfM = extractedDateText.indexOf("m:");
                    let indexOfS = extractedDateText.indexOf("s:");
                    if (indexOfAt != -1) {
                        const cleanDate = extractedDateText.substring(0, indexOfAt);
                        eventObject.date = cleanDate.trim();

                        if ((indexOfN != -1) || (indexOfM != -1) || (indexOfS != -1)) {
                            let endIndex = null;
                            if (indexOfN != -1) {
                                endIndex = indexOfN + 1;
                            } else if (indexOfM != -1) {
                                endIndex = indexOfM + 1;
                            } else if (indexOfS != -1) {
                                endIndex = indexOfS + 1;
                            }
                            eventObject.time = extractedDateText.substring(indexOfAt, endIndex).replace("@", "").trim();
                            if (extractedDateText[endIndex + 2]) {
                                eventObject.eventName = extractedDateText.substring(endIndex + 2).trim();
                            }
                        } else if (extractedDateText[indexOfAt + 2]) {
                            eventObject.time = extractedDateText.substring(indexOfAt).replace("@", "").trim();
                        } else {

                        }
                    }
                    if (!eventObject.date) {
                        eventObject.date = extractedDateText;
                    }
                    let firstSibling = extractedDate.siblings().first();
                    let firstSiblingText = firstSibling.text();
                    let nextSibling = firstSibling;
                    let nextSiblingText = firstSiblingText;
                    let sibIndex = 1;
                    indexOfAt = firstSiblingText.indexOf("@");
                    indexOfN = firstSiblingText.indexOf("n:");
                    indexOfM = firstSiblingText.indexOf("m:");
                    indexOfS = firstSiblingText.indexOf("s:");

                    if (firstSiblingText[3]) {
                        if ((indexOfN != -1) || (indexOfM != -1) || (indexOfS != -1)) {
                            let endIndex = null;
                            if (indexOfN != -1) {
                                endIndex = indexOfN + 1;
                            } else if (indexOfM != -1) {
                                endIndex = indexOfM + 1;
                            } else if (indexOfS != -1) {
                                endIndex = indexOfS + 1;
                            }
                            if (!eventObject.time) {
                                eventObject.time = firstSiblingText.substring(0, endIndex).replace("@", "").trim();
                            }
                            if (!eventObject.eventName) {
                                if (firstSiblingText[endIndex + 2]) {
                                    eventObject.eventName = firstSiblingText.substring(endIndex + 2).trim();
                                }
                            }

                        } else {
                            if (!eventObject.time) {
                                eventObject.time = firstSiblingText.replace("@", "").trim();
                            }
                        }

                    } else {
                        // move to next sibling for the time
                        nextSibling = firstSibling.siblings().eq(sibIndex);
                        sibIndex += 1;
                        nextSiblingText = nextSibling.text();
                        indexOfAt = nextSiblingText.indexOf("@");
                        indexOfN = nextSiblingText.indexOf("n:");
                        indexOfM = nextSiblingText.indexOf("m:");
                        indexOfS = nextSiblingText.indexOf("s:");

                        if ((indexOfN != -1) || (indexOfM != -1) || (indexOfS != -1)) {
                            let endIndex = null;
                            if (indexOfN != -1) {
                                endIndex = indexOfN + 1;
                            } else if (indexOfM != -1) {
                                endIndex = indexOfM + 1;
                            } else if (indexOfS != -1) {
                                endIndex = indexOfS + 1;
                            }
                            if (!eventObject.time) {
                                eventObject.time = nextSiblingText.substring(0, endIndex).replace("@", "").trim();
                                // console.log(nextSiblingText);
                                // console.log(eventObject.time);
                            }
                            if (!eventObject.eventName) {
                                if (firstSiblingText[endIndex + 2]) {
                                    eventObject.eventName = nextSiblingText.substring(endIndex + 2).trim();
                                    // eventArray.push(eventObject);
                                    // console.log(eventObject.eventName);
                                }
                            }

                        } else {
                            // not sure what happens in this condition... shouldn't they all have one of these?
                            if (!eventObject.time) {
                                eventObject.time = nextSiblingText.replace("@", "").trim();

                            }
                        }
                    }
                    if (!eventObject.eventName) {
                        //move to next sibling(s)for event name info
                        let currentSibling = nextSibling.siblings().eq(sibIndex);

                        let currentSiblingText = currentSibling.text();
                        eventObject.eventName = currentSiblingText;
                        sibIndex += 1;
                        if (nextSibling.siblings().eq(sibIndex)) {
                            currentSibling = nextSibling.siblings().eq(sibIndex);

                            currentSiblingText = currentSibling.text();
                            eventObject.eventName += currentSiblingText;
                        }
                    }
                    const re = new RegExp(String.fromCharCode(160), "g");

                    eventObject.date = eventObject.date.replace(re, " ").trim();
                    eventObject.date = dates.normalizeDate(eventObject.date.trim());
                    eventObject.categories = ["Social", "Dear Denver"];
                    if (eventObject.date) {
                        eventArray.push(eventObject);
                    }
                })
            })
            resolve(eventArray);
        })
    },
    getDateTimePrice: function getDateTimePrice(html) {
        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            const timeRaw = $(`.when`).text().replace("Time:", "").trim();
            const priceRaw = $(`.price`).text().trim();
            // console.log(timeRaw);
            // console.log(priceRaw);
            // const dateTimeText = timeLabel.siblings().first().text();
            if (timeRaw) {
                resolve(timeRaw);
            } else {
                console.log("There was an error getting date-time info from Dear Denver");
            }

        });
    },

    getWWInitialEventInfo: function getWWInitialEventInfo(html, sourceName, baseURL) {
        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            let initialEventArray = [];
            const dateClass = ".result-day"
            $(dateClass).each((i, element) => {
                const date = element.attribs['data-date'];
                const ulParent = $(element).children("ul").first();
                const liArray = ulParent.children();
                liArray.each((i, li) => {
                    let eventObject = {};
                    eventObject.sourceName = sourceName;
                    eventObject.date = dates.normalizeDate(date.trim());
                    let imgBox = $(li).find(".img-box");
                    const eventLink = baseURL + imgBox.find("a").attr("href");
                    eventObject.eventLink = eventLink;

                    const imageLink = imgBox.find("img").attr("src");
                    eventObject.imageLink = imageLink;

                    const otherDetails = $(li).find(".deets.grid");

                    const eventName = otherDetails.find(".title").text().trim();
                    eventObject.eventName = eventName;

                    const location = otherDetails.find(".location a").text().trim();
                    eventObject.location = location;

                    let time = otherDetails.find(".location").text().trim();
                    time = time.replace(location, "");
                    eventObject.time = time;

                    const address = otherDetails.find(".address").text().trim();
                    eventObject.address = address;

                    const categories = otherDetails.find(".categories").children("a");
                    let categoryArray = [];
                    categories.each((i, category) => {
                        const categoryText = $(category).text();
                        categoryArray.push(categoryText);
                    });
                    eventObject.categories = categoryArray;
                    eventObject.categories.push("WestWord");

                    const price = $(li).find(".tix .price").text();
                    eventObject.price = price;

                    if (imgBox.find("a").attr("href")) {
                        initialEventArray.push(eventObject);
                    }
                });
            });
            if (initialEventArray) {
                resolve(initialEventArray);
            } else {
                console.log("There was an error getting initial event info from WestWord");
            }

        });

    },
    getWWInnerDescription: function getWWInnerDescription(html) {
        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            const description = $("div.description").text();
            if (description) {
                resolve(description);
            } else {
                console.log("There was an error getting the WestWord inner description");
            }

        });
    },
    getRequest: function getRequest(requestURL) {
        return new Promise((resolve, reject) => {
            const options = {
                url: requestURL,
                method: 'GET',
                json: true
            }
            return request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
            })
        })
    },
    getMeetupDateTimeImageCategory: function getMeetupDateTimeImageCategory(html) {
        $ = cheerio.load(html);
        return new Promise((resolve, reject) => {
            const dateTimeImageCategoryObject = {};
            const title = $("#chapter-banner a").attr("title");
            const parentAnchor = $("#event-when-display");
            const date = parentAnchor.find("time").attr('datetime');
            const time = parentAnchor.find(".subtext").first().text();
            const imageLink = $(".photo").first().attr("src");
            const categoryParent = $("[id^='topicList']");
            let categoryArray = [];
            categoryParent.children("a").each((i, aTag) => {
                const category = $(aTag).text();
                categoryArray.push(category);
            });


            dateTimeImageCategoryObject.date = date;
            dateTimeImageCategoryObject.time = time;
            dateTimeImageCategoryObject.imageLink = imageLink;
            dateTimeImageCategoryObject.categories = categoryArray;
            dateTimeImageCategoryObject.categories.push("Meetup");
            if (dateTimeImageCategoryObject) {
                resolve(dateTimeImageCategoryObject);
            } else {
              console.log("There was a problem getting the Meetup date-time-info");
            }

        });
    }
}
