const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
  // console.log(req.headers);
  // if(!req.header.authorization || req.header.authorization !== res.header.S
  if(!req.headers.authorization) { // request header의 authorization 이 존재하지 않을 경우
    res.status(400).send({
      "data" : null,
      "message" : "invalid access token"
    })
  } else {
    // 잘못된 토큰이 요청된 경우
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1]; // split(' ')[0] = Bearer 이므로 [1]
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // 환경변수의 as 와 token 비교

    if(!data) { // verify 결과 false 인 경우, 즉 잘못된 토큰 요청인 경우
      res.status(400).send({
        "data" : null,
        "message" : "invalid access token"
      })
    } else {
      res.status(200).send({
        "data" : 
        { 
          userInfo : { 
            id : data.id,
            userId : data.userId,
            email : data.email,
            createdAt : data.createdAt,
            updatedAt : data.updatedAt
          }
        }, 
        "message" : "ok"
      })
    }
  }
};