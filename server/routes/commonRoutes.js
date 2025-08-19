import express from 'express'
import { forgotPassword, loginUser } from '../controllers/commonController.js';

const commonRouter = express.Router()

commonRouter.post('/login', loginUser)
commonRouter.post('/forgot_password', forgotPassword)

export default commonRouter;
