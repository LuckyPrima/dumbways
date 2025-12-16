// User harus login
export const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }
  next();
};

// User sudah login (tidak boleh akses login / signup)
export const guestOnly = (req, res, next) => {
  if (req.session.user) {
    return res.redirect(req.session.lastUrl || "/home");
  }
  next();
};
