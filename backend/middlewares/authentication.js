export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Ensure token exists
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Decode the token to get user data
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user to req.user
    req.user = decodedUser;

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};