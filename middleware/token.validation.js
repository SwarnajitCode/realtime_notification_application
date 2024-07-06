const {verify} = require('jsonwebtoken');
const {getUserToken} = require('../services/user_token.service');
require('dotenv').config();

module.exports = {
    checkToken : async(req, res, next) =>{
        let token = req.get('authorization')
        if(token){
        token = token.slice(7)
        verify(token,process.env.JWT_SECRET,async(err,decoded) =>{
            if(err){
                res.status(403).json({error:"Invalid token"})
            }else{
                req.userId = decoded.userId;
                const check = await getUserToken(decoded.userId , token);
                if(check == null){
                    res.status(403).json({error:"Invalid token"})
                }else{
                next()
                }
            }
        })
        }else{
            res.status(403).json({error:"Access Denied"})
        }
    }
    
    }