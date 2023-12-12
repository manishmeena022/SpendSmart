import express,{Router} from "express";
import {createTransaction, singleTransaction, allTransaction, deleteTransaction, updateTransaction } from "../controllers/transactions.Controllers.js";
import  isLogin  from "../middlewares/isLogin.js";

const transactionsRoute = Router();

//POST/api/v1/tansactions
transactionsRoute.post('/', isLogin, createTransaction)

//GET/api/v1/transactions/:id
transactionsRoute.get('/:id', singleTransaction)

//GET/api/v1/transactions/
transactionsRoute.get('/',  allTransaction)

//put/api/v1/transactions/:id
transactionsRoute.put('/:id', updateTransaction)


//DELETE/api/v1/transactions/:id
transactionsRoute.delete('/:id', deleteTransaction)

export default transactionsRoute;