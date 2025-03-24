const jwt = require("jsonwebtoken");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error("No authorization header found");
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.error("No token found in authorization header");
    return null;
  }

  try {
    // Decode token without verification (if needed)
    const decoded = jwt.decode(token);

    // You might need to extract the user ID from a specific claim
    const userId = decoded?.sub || decoded?.user_id;
    if (!userId) {
      console.error("User ID not found in token");
      return null;
    }
    return userId;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
};

module.exports = { checkJwt, getUserIdFromToken };
