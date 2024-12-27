//const sessionIdToUserMap = new Map(); no need to maintain state

const jwt = require('jsonwebtoken');
const secretKey= "Mitali@1234"

function setUser(user){
    const payload = {
        id:user.id,
        email:user.email,
    };
    const token = jwt.sign(payload,secretKey);
    return token;
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secretKey);
}

module.exports ={
    setUser,
    getUser,
};