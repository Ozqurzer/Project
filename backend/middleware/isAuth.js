import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate users using JWT token.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {function}
 */

export default (req, res, next) => {
  const token = req.cookies.jwt;
  // debugger;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    req.userId = decodedToken.userId;
    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
