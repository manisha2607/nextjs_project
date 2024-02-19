const jwt = require('jsonwebtoken');

module.exports.checkAuthentication = async (req, res, next) => {
    try {
        const decodedToken = await jwt.verify(
            req.headers.authorization,            // to use this pass token in the headers like see bellow-
            process.env.JWT_SECRET_KEY                // Authorization : token [in header not in authorization]
        );
        if (!decodedToken) {
            return res.status(404).json({
                success: false,
                message: "Token expired! please re generate it!!",
            });
        }
        req.user = decodedToken;    
        next();

    } catch (error) {
        let errMsg = error.message; 
            return res.status(500).json({
                success: false,
                message: errMsg
            })
    }
};