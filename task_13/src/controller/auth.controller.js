import bcrypt from "bcrypt";
import crypto from "crypto";
import { pool } from "../lib/db.js";

export const renderLogin = (req, res) => {
  res.render("login");
};

export const renderSignup = (req, res) => {
  res.render("signup");
};

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "Password does not match");
    return res.redirect("/signup");
  }

  const userCheck = await pool.query("SELECT id FROM users WHERE email=$1", [
    email,
  ]);

  if (userCheck.rows.length) {
    req.flash("error", "Email already registered");
    return res.redirect("/signup");
  }

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (id, username, email, password) VALUES ($1,$2,$3,$4)",
    [crypto.randomUUID(), username, email, hashed]
  );

  req.flash("success", "Account created, please login");
  res.redirect("/login");
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (!rows.length) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const redirectTo = req.session.lastUrl || "/home";
  res.redirect(redirectTo);
};

export const logout = (req, res) => {
  const redirectTo = req.session.lastUrl || "/home";

  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/home");
    }

    res.clearCookie("connect.sid");
    res.redirect(redirectTo);
  });
};
