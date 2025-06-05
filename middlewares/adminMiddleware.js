module.exports = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only' });
  }
  next();
};
// This middleware checks if the user has an 'admin' role.
// If not, it responds with a 403 Forbidden status and an error message.
// If the user is an admin, it calls `next()` to proceed to the next middleware or route handler.
// This is useful for protecting admin routes in your application, ensuring that only users with the appropriate permissions can access them. 