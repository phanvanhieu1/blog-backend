const jwt = require('jsonwebtoken');

const veryfiToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userID = decoded.userID;
        next();
    }catch(err){
        console.log(err);
        return res.sendStatus(403);
    }
}

module.exports = veryfiToken;