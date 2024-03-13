import JWT from 'jsonwebtoken';

const generateUserToken = (userId) => {
  const userToken = JWT.sign({userId}, process.env.JWT_USER_SECRET, {
    expiresIn: '2h',
  });
  return userToken;
};

export default generateUserToken;
