const {findFollowers , addFollower} = require('../services/user.service');
const {addFollowerSchema} = require('../validators/user.validator');
module.exports = {
    getFollowers : async(req , res) =>{
        try {
            const result = await findFollowers(req.userId);
            if(result == "0"){
                res.status(500).json({
                    succeeded: false,
                    message: 'Server error',
                    data: {}
                })
            }else{
                res.status(200).json({
                    succeeded: true,
                    message: 'Followers found successfully',
                    data: result
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                succeeded: false,
                message: 'Server error',
                data: {}
            })
        }
    },

    addFollowers : async(req , res) =>{
        try {
            const { error } = addFollowerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const result = await addFollower(req.userId , req.body);
            if(result == "0"){
                res.status(500).json({
                    succeeded: false,
                    message: 'Server error',
                    data: {}
                })
            }else if(result == "1"){
                res.status(404).json({
                    succeeded: false,
                    message: 'User does not exist',
                    data: {}
                })
            }else{
                res.status(200).json({
                    succeeded: false,
                    message: 'Follower added successfully',
                    data: result.id
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                succeeded: false,
                message: 'Server error',
                data: {}
            })
        }
    }
}