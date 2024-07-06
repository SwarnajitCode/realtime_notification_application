const{sequelize , user_token} = require('../models');
const bcrypt = require('bcrypt');
const {findUser , addUser , findUserByUsername} = require('../services/user.service')

module.exports = {
    register : async(requestBody) =>{
        try {
            const check = await findUserByUsername(requestBody.userName);
            if(check != null) return "1";
            const user = await addUser(requestBody);
            if(user == '0') return '0';
             return user;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    login : async(requestBody) =>{
        try {
            const user = await findUserByUsername(requestBody.userName);
            console.log('user = ',user);
            if(user == null) return "1";

            const result = await bcrypt.compare(requestBody.userPassword,user.password);
            if(result){
                return user;
            }
            return "2";
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    logout : async(userId) =>{
        try {
            const token = await user_token.findOne({
                where : {
                    user_id : userId
                }
            });
            const token2 = await token.destroy();
            return token2;
        } catch (error) {
            console.log(error);
            return "0";
        }
    }
}