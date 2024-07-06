import JWT from "jsonwebtoken";

const generateToken = (userId) => {
  const userToken = JWT.sign({ userId }, process.env.JWT_USER_SECRET, {
    expiresIn: "1d",
  });
  return userToken;
};

export default generateToken;
