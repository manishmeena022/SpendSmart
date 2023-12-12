import express,{Router} from "express";
import { registerUser, userLogin, userProfile, updateUser, deleteUser } from "../controllers/users.Controllers.js"
import  isLogin  from "../middlewares/isLogin.js";

const usersRoute = Router();

//POST/api/v1/users/register
usersRoute.post('/register', registerUser);

//POST/api/v1/users/login
usersRoute.post('/login', userLogin)

//GET/api/v1/users/profile
usersRoute.get('/profile/', isLogin, userProfile)

//DELETE/api/v1/users
usersRoute.delete("/", isLogin, deleteUser);

//PUT/api/v1/users/
usersRoute.put("/", isLogin, updateUser);


export default usersRoute;