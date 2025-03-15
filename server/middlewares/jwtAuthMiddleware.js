// import jwt from "jsonwebtoken";

// const jwtAuthMiddleware = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Access Denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token decoded:", decoded);
//     req.user = decoded; // Attach user info to request
//     next(); // Proceed to the next middleware
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };

// export default jwtAuthMiddleware;
