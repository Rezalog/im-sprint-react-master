const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
      // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.
    const userInfo = await Users.findOne({
      where: { userId: req.body.userId, password: req.body.password },
    });
   
    if(!userInfo) {
      res.status(400).send({
        "data" : null,
        "message" : "not authorized",
      })
    } else {
      const userData = {
        id : userInfo.id,
        userId : userInfo.dataValues.userId,
        email : userInfo.dataValues.email,
        createdAt : userInfo.dataValues.createdAt,
        updatedAt : userInfo.dataValues.updatedAt
      }
      const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, { expiresIn : '30s'})
      const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, { expiresIn : '2h'})

      res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: true, 
        sameSite: 'None',
      })
      .json({ 
        data: { accessToken: accessToken }, 
        message: 'ok' }
      )
  }
}