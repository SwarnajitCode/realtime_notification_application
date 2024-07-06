const router = require('express').Router();
const {checkToken} = require('../middleware/token.validation')
const {ping , registerUser , loginUser , logoutUser} = require('../controllers/identity.controller')
const {getFollowers , addFollowers} = require('../controllers/user.controller')

//to check the connectiion.
router.get('/ping',ping);

//route to register user
router.post('/register',registerUser);

//route to login user
router.post('/login',loginUser);

//route to add followers
router.post('/followers',checkToken, addFollowers);

//route to get followers
router.get('/followers',checkToken, getFollowers);

//route to login user
router.get('/logout',checkToken, logoutUser);

module.exports = router;