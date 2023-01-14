//jwt helps us to auth. user in our backend
//suppose user is logged in and trying to access a resource that is only available
//to that user only so user will send jwt to backend an d backend will 
//verify and only then user is allowed to access that resource
const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : "30d",
    });
};

module.exports = generateToken;
