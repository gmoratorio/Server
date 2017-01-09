# Server
# Galvanize Brews

This is a project on [knex.js](http://knexjs.org/).

You will be implementing the following ERD with knex, and creating knex queries to interact with the data in the database.

![](https://www.lucidchart.com/publicSegments/view/8596c6ba-114c-4061-8e89-a659d2f12404/image.png)

NOTE: The only existing file in this repo you will need to modify is `queries.js`

* Fork and clone this repo
* `cd` into the folder and `npm install`
* Create *2 migrations* and *2 seeds* with the data available in the `/data` directory
* Update the `queries.js` file with the queries you will need
  * Each query function should return a promise that resolves to the desired data
* Run `nodemon ./bin/www` to see the views
* When you're done, you should have a site that looks [like this](http://galvanize-brews.herokuapp.com/)
* Push your site and your database to a public URL
* Edit this `README.md` to include the link to your public URL [here](https://enigmatic-ocean-47947.herokuapp.com/)
* Issue a PR to this repo!
