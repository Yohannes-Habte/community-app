import JWT from "jsonwebtoken";

//====================================================================
// Generate token
//====================================================================
const generateToken = (user) => {
  const token = JWT.sign(
    {
      id: user._id,
      admin: user.role.admin,
      priest: user.role.priest,
      financeManager: user.role.financeManager,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export default generateToken;
