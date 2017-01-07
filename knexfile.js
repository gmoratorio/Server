


require('dotenv').config();
    module.exports = {
      development: {
        client: 'pg',
        connection: process.env.DEV_DATABASE_URL,
        debug: false
      },

      production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + "?ssl=true"
      }
    };
