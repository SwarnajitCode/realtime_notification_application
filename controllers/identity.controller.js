const { sign } = require('jsonwebtoken');
require('dotenv').config();
const { register, login, logout } = require('../services/identity.service')
const {addOrUpdateToken} = require('../services/user_token.service');
const Joi = require('joi');
const {registerUserSchema , loginSchema} = require('../validators/identity.validator')

module.exports = {
    ping: (req, res) => {
        res.json({ message: 'pong' });
    },

    registerUser: async (req, res) => {
        try {
            const { error } = registerUserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const user = await register(req.body);
            if (user == '0') {
                res.status(500).json({
                    succeeded: false,
                    message: 'Server error.',
                    data: {}
                })
            } else if (user == '1') {
                res.status(409).json({
                    succeeded: false,
                    message: 'Username already exists.',
                    data: {}
                })
            } else {
                res.status(200).json({
                    succeeded: true,
                    message: 'Successfully registered.',
                    data: user.id
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                succeeded: false,
                message: 'Server error.',
                data: {}
            })
        }
    },

    loginUser: async (req, res) => {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const result = await login(req.body);
            if (result == '0') {
                res.status(500).json({
                    succeeded: false,
                    message: 'Server error.',
                    data: {}
                })
            } else if (result == '1') {
                res.status(404).json({
                    succeeded: false,
                    message: 'User does not exist.',
                    data: {}
                })
            } else if (result == '2') {
                res.status(401).json({
                    succeeded: false,
                    message: 'Invalid credentials.',
                    data: {}
                })
            } else {
                const token = sign({ userId: result.id }, process.env.JWT_SECRET)
                const saveToken = await addOrUpdateToken(result.id , token);
                result.password = undefined;
                res.status(200).json({
                    succeeded: true,
                    message: 'Login successful.',
                    data: result,
                    token: token
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                succeeded: false,
                message: 'Server error.',
                data: {}
            })
        }
    },

    logoutUser : async(req , res) =>{
        try {
            const result = await logout(req.userId)
            res.status(200).json({
                succeeded : true,
                message : 'Successfully logged out'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                succeeded: false,
                message: 'Server error.',
                data: {}
            })
        }
    }
}