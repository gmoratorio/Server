


var knex = require('./connection');



module.exports = {
    getAllUsers: function getAllUsers() {
        return knex("user")
            .select()
    },
    getUserByGoogleProfileId : function getUserByGoogleProfileId(profileID){
      console.log('getting user from DB with Profile ID' + profileID);
      return knex("user")
      .select()
      .where('google_id', profileID)
      .first()
    }

}
