const jwt = require('jsonwebtoken');
let userId;
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] &&  req.headers['authorization'].split(" ")[1] ; // 'headres' yerine 'headers' kullanılmalı
    if (!token) {
        res.status(401).json({ message: 'Token bulunamadı' });
    } else {
        jwt.verify(token,process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.status(401).json({ message: 'Token geçerli değil veya süresi doldu' });
            } else {
                req.userId = decoded.userId;
                userId = decoded.userId;
                next(); 
            }
        });
    }
}
const getUserId = () => {
    return userId;
};

module.exports = {authenticateToken,getUserId};