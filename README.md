# Server
## Denver To Remember 

This is a project on (https://www.denvertoremember.com).

You will be implementing the following ERD with knex, and creating knex queries to interact with the data in the database.

A Denver to Remember is an app targeted at tourists, the curious and the bored. It allows one to quickly find events happening around the Denver area, their location, description, time and price. We have two avenues within the app with which this could be done. As a guest, one could find and filter events based on type.

As a member, the experience becomes more personalized. Not only can one filter events by type, but also view event summaries inside the app without having to redirect to the host website. The in-app event summaries include full descriptions, address, time, and price information, and the source event link.

The application utilizes request and cheerio.js to scrape data from several event-hosting-websites, as well as Google OAuth to enable member authentication/authorization features. 

### Installing
NOTE: You will need to clone both this server repo and the client repo at (https://github.com/stackOfAllTrades/Client)

* Fork and clone this repo
* `cd` into the folder and `$ npm install`
* Create a PSQL database named `denver-events`
* Run `$ knex migrate:latest` and `$ knex seed:run`
* See the `example.env` file for needed Environment variables
* Create a Google OAuth account for authorization
* Launch nodemon on the server with `$ nodemon`
* Run `nodemon ./bin/www` to see the views
* When you're done, you should have a site that looks [like this](http://galvanize-brews.herokuapp.com/)
* Push your site and your database to a public URL
* Edit this `README.md` to include the link to your public URL [here](https://enigmatic-ocean-47947.herokuapp.com/)
* Issue a PR to this repo!
