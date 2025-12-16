import express from "express";
import {
  renderLogin,
  renderSignup,
  login,
  signup,
  logout,
} from "../controller/auth.controller.js";

const router = express.Router();

router.get("/login", renderLogin);
router.post("/login", login);

router.get("/signup", renderSignup);
router.post("/signup", signup);

router.get("/logout", logout);

export default router;
