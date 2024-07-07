const { sequelize, user, followers, messages } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    addUser: async (requestBody) => {
        try {
            let { userName, userPassword } = requestBody;
            const pass = await bcrypt.hash(userPassword, 10);
            console.log

            const user1 = await user.create({
                username : userName,
                password : pass,
            })
            return user1;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    findUser: async(userId) =>{
        try {
            const user1 = await user.findOne({
                attributes: {exclude :['password','createdAt','updatedAt']},
                where:{
                    id : userId,
                }
            });
            return user1;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    findUserByUsername: async(username) =>{
        try {
            const user1 = await user.findOne({
                attributes: {exclude :['createdAt','updatedAt']},
                where:{
                    username,
                }
            });
            return user1;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    findFollowers: async(userId) =>{
        try {
            const user1 = await followers.findAll({
                include : [{
                    model : user,
                    attributes : [ 'username']
                }],
                attributes: {exclude :['createdAt','updatedAt']},
                where:{
                    user_id : userId,
                }
            });
            return user1;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    findFollowersId: async(userId) =>{
        try {
            console.log('userId = ',userId);
            const user1 = await followers.findAll({
                attributes: ['follower_id'],
                where:{
                    user_id : userId,
                }
            });
            if(user1.length < 1) return [];

            const refineduser = user1.map(item =>{
                return item.follower_id;
            })
            return refineduser;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    addFollower: async(userId , requestBody) =>{
        try {
            const {followId} = requestBody;
            const check = await user.findOne({
                where : {
                    id : followId
                }
            });
            if(check == null) return 1;
            const followerCheck = await followers.findOne({
                where : {
                    user_id : followId,
                    follower_id : userId
                }
            });
            if(followerCheck != null) return followerCheck
            const follower = await followers.create({
                user_id : followId,
                follower_id : userId
            })
            return follower;
        } catch (error) {
            console.log(error);
            return "0";
        }
    },

    addMessage : async(userId , msge) =>{
        try {
            const msg = await messages.create({
                user_id : userId,
                content : msge
            });

            return msg;
        } catch (error) {
            console.log(error);
            return "0";
        }
    }
}