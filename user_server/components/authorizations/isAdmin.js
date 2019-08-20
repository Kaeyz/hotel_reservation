module.exports = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    return next();
  } else {
    return res.status(400).json("You are not authorized to do this");
 }
}