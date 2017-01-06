var knex = require('./connection');



module.exports = {
    getAllUsers: function getAllUsers() {
        return knex("User")
            .select()
    },
    getAllUsersByIdAndGoogleProfileId : function getAllUsersByIdAndGoogleProfileId(profile){
      return knex("User")
      .select()
      .where('google_id', profile.id)
      .first()
    }

}
