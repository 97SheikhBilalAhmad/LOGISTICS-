// router.js
const express = require('express');
const router = express.Router();
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const forgetPasswordRoute = require('./routes/forgetPasswordRoute');
const verifyOTPRoute = require('./routes/verifyOTPRoute');
const setNewPasswordRoute = require('./routes/setNewPasswordRoute');
const userInfoRoute = require('./routes/userInfoFormRoute');
const orderRoute = require('./routes/orderRoute');
const profileRoute = require('./routes/profileRoute');
const deleteRoute = require('./routes/deleteRoute');
const deleteadressRoute = require('./routes/deleteaddressRoute');
const deletecardRoute = require('./routes/deletecardRoute');
const tenderRoute = require('./routes/tenderRoute');
const getOrdersRoute = require('./routes/getOrdersRoute'); 

router.post('/signup', signupRoute);
router.post('/login', loginRoute);
router.post('/forget-password', forgetPasswordRoute);
router.post('/verify-otp', verifyOTPRoute);
router.post('/set-new-password', setNewPasswordRoute);
router.post('/place-order/:userId', orderRoute);
router.post('/create-tender', tenderRoute);
router.put('/user-info/:userId', userInfoRoute);
router.get('/profile/:userId', profileRoute);
router.delete('/delete-account/:userId', deleteRoute);
router.delete('/address/:userId/:addressId', deleteadressRoute);
router.delete('/card/:userId/:cardId', deletecardRoute);
router.get('/get-orders/:userId', getOrdersRoute); 

module.exports = router;
