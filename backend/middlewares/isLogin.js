import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import verifyToken from "../utils/verifyToken.js";
import { AppErr } from "../utils/appErr.js";

const isLogin = (req, res, next) => {
    
    //get token from req header
    const token = getTokenFromHeader(req);
    
    //verify
    const decodedUser = verifyToken(token);
    
    //save the user into req obj
    req.user = decodedUser.id;
    if(!decodedUser){
        return next(new AppErr("Invalid/Expired Token, Please login again", 401));
    }
    next();
};
  
export default isLogin;
