var jwt = require('jsonwebtoken');

// authtoken secret value to identify valid user
const JWT_SECRET = "userIdentities";

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({error: 'Please authentication using valid token'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        // Error occurred during token verification
        res.status(401).send({error: 'Please authentication using valid token'});
    }
}

module.exports = fetchuser;