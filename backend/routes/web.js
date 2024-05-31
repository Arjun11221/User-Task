import express, { Router } from "express";
import { userController, userEditController, userIdController, userPostController } from "../controller/controller.js";
const router = express.Router();

router.get('/users', userController);
  
router.post('/add', userPostController );
  
router.put('/edit/:id', userEditController);
router.get('/user/:id', userIdController);

export default router;