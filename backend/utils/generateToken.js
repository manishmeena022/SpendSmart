import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, "anykey" ,{expiresIn: '10d' });
};

export default generateToken;
