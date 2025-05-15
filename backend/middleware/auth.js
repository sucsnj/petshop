const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: 'Acesso negado! Token inválido ou não fornecido.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno na autenticação.', error: error.message });
    }
}

module.exports = autenticarToken;