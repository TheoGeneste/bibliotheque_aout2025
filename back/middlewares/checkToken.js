import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
dotenv.config();

const checkToken = (req, res, next) => {
    const headers = req.headers['authorization'];
    
    // headers = 'Bearer wWWWWEF<vdvjpso'
    // headers.split(' ') = ['Bearer','wWWWWEF<vdvjpso']
    // headers.split(' ')[1] = 'wWWWWEF<vdvjpso'
    if (!headers) {
        return res.status(401).json({message : 'Vous devez être connecté'})
    }
    const token = headers.split(' ')[1];
    if (!token) {
        res.status(401).json({message : 'Vous devez être connecté'})
    }else{
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({message : "Le token est incorrect"})
            }

            req.userId = decoded.id;
            req.userLogin = decoded.login;
            req.role = decoded.role;
            next();
        })
    }
}

export default checkToken;