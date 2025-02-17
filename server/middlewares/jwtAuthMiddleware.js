import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Token decoded", decoded)
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default jwtAuthMiddleware;
