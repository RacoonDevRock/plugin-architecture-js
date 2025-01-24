const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1]; // Extrae el token después de "Bearer"
    if (!token) return res.status(401).json({ error: "Invalid token format" });

    jwt.verify(token, process.env.JWT_SECRET || "default-secret-key", (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });
        req.user = user; // Adjunta el usuario decodificado al request
        next();
    });

    console.log(`Usuario autenticado: ${JSON.stringify(req.user)}`);
}

module.exports = authenticateToken;

