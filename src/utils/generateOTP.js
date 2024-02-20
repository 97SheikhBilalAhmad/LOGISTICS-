// utils/generateOTP.js
module.exports = () => {
    return Math.floor(1000 + Math.random() * 8000).toString();
  };
  