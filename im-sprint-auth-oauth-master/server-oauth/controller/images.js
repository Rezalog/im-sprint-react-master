const images = require('../resources/resources');

module.exports = (req, res) => {
  // TODO : Mypage로부터 access token을 제대로 받아온 것이 맞다면, resource server의 images를 클라이언트로 보내주세요.
  // access token : request header의 authorization를 통해 들어온다.
  if(!req.headers.authorization) {
    res.status(403).send({ // 접근권한 관련 상태코드 : revoke
      message: 'no permission to access resources'
    })
    return;
  } else {
    res.status(200).send({images})
  }
}