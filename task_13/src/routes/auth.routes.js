import express from "express";
import {
  renderLogin,
  renderSignup,
  login,
  signup,
  logout,
} from "../controller/auth.controller.js";
import { guestOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/login", guestOnly, renderLogin);
router.post("/login", login);

router.get("/signup", guestOnly, renderSignup);
router.post("/signup", signup);

router.get("/logout", logout);

export default router;
