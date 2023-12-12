import express,{Router} from "express"
import {createAccount, getAllAccount, getAccount, deleteAccount, updateAccount} from "../controllers/account.Controller.js";
import isLogin from "../middlewares/isLogin.js";

const accountRoute = Router();

//POST/api/v1/accounts
accountRoute.post("/", isLogin, createAccount);

//GET/api/v1/accounts/:id
accountRoute.get("/:id", getAccount);

//DELETE/api/v1/accounts/:id
accountRoute.delete("/:id", deleteAccount);

//PUT/api/v1/accounts/:id
accountRoute.put("/:id", updateAccount);

//GET/api/v1/accounts
accountRoute.get("/", getAllAccount);

export default accountRoute;