const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    // Extract  the token from the request headers
    const token = req.header('Authorization').split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(401).json({ error: 'Unauthorized - Missing token.' });
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(token,'mySecretKey');

        // Attach the decoded token to the request for further use
        req.user = decodedToken;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Unauthorized - Invalid token.' });
    }
};

module.exports = authMiddleware;