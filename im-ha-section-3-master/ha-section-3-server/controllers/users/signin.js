const { verify } = require('jsonwebtoken');
const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달
  const userInfo = await user.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  if(!userInfo) {// 로그인 실패
    res.status(404).send('invalid user');
  } else {
    // 로그인 성공
    // 1. authorization code로 access token 생성
    // 2. access token을 cookie에 실어 전달
    const userData = {
      id: userInfo.id,
      email: userInfo.dataValues.email,
      username: userInfo.dataValues.username,
      mobile: userInfo.dataValues.mobile,
      createdAt : userInfo.dataValues.createdAt,
      updatedAt : userInfo.dataValues.updatedAt
    }
    const accessToken = generateAccessToken(userData);
    sendAccessToken(res, accessToken);
    // console.log(accessToken);
    // console.log(verify(req.headers.cookie.jwt, process.env.ACCESS_SECRET));
    // console.log(verify(accessToken, process.env.ACCESS_SECRET));
  }
  res.status(500).send('');
};
