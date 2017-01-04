require('dotenv').config();
    module.exports = {
      development: {
        client: 'pg',
        connection: 'postgres://localhost:5432/denver-events',
        debug: false
      },

      production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + "?ssl=true"
      }
    };
