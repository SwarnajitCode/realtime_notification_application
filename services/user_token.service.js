const { sequelize, user_token} = require('../models');

module.exports = {
    addOrUpdateToken: async (userId , token) => {
        try {
            const userToken = await user_token.upsert({
                user_id : userId,
                token : token,
            })
            return userToken;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    getUserToken : async(userId , token) =>{
        try {
            const userToken = await user_token.findOne({
                where : {
                    user_id : userId,
                    token : token
                }
            });
            return userToken;
        } catch (error) {
            console.log(error);
            return "0";
        }
    }

}