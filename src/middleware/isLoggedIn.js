const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Invalid credentials');
  } else {
    jwt.verify(authHeader, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid credentials');
      } else {
        req.decodedToken = decoded;

        // Check if the user has an OTP (for password change)
        if (req.decodedToken && req.decodedToken.otp) {
          return res.status(403).send('Password change OTP exists. Please use the OTP route for password change.');
        }

        next();
      }
    });
  }
};


