const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /refreshtokenrequest 구현에 필요한 로직을 작성하세요.
  // console.log(req.cookies);
  if(!req.cookies.refreshToken) { // refreshToken 존재 X
    res.status(400).send({
      "data" : null,
      "message" : "refresh token not provided"
    })
  } else if(req.cookies.refreshToken === 'invalidtoken'){ // 유효하지않은 refreshToken
    res.status(400).send({
      "data" : null,
      "message" : "invalid refresh token, please log in again"
    })
  } else { // 유효한 refreshToken 이나, db 와 맞지 않는 경우
    const data = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET)
    if(!data) { // 맞지 않는 경우
      res.status(400).send({
        "data" : null,
        "message" : "refresh token not provided"
      })
    } else {
       const payload = {
        id : data.id ,
        userId : data.userId,
        email: data.email,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
      // accessToken 새로 생성
      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn : '1d'})
      
      res.status(200).send({
        "data" : {
          accessToken : accessToken,
          userInfo : payload
        }, "message" : "ok"
      });
    }
  }
};