const { verify } = require('jsonwebtoken');
const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  
  // 1. 회원가입 요청 성공 시 JWT 토큰 포함
  // 2. 유저 email 이 이미 존재한다면 409 res
  // 3. username, email, password, mobile 파라미터 중 
  //    하나라도 요청에서 제공되지 않았다면 422(unprocessable entity) res
  user.findOne({where: {email: req.body.email}})
  .then(data=> {
    
    if(req.body.email===data.dataValues.email) {
      return res.status(409).send('email exists')
    }
  })

  if(req.body.username===undefined
    || req.body.email===undefined
    || req.body.password===undefined
    || req.body.mobile===undefined) {

      return res.status(422).send('insufficient parameters supplied');
    }
    
  user.findOrCreate({
    where: { username: req.body.username},
    defaults: { username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                mobile: req.body.mobile }
    })
  .then((data)=> {
    // if(data[1]) return console.log(data[0].dataValues);
    if(data[1]) {
      const accessToken = generateAccessToken(data[0].dataValues);
      // console.log("token", token);
      // console.log(verify(token, process.env.ACCESS_SECRET))
    
        // TODO: JWT 토큰을 쿠키로 전달합니다.
        res.status(201)
        .cookie("jwt", accessToken, {httpOnly: true})
        .json({ message: 'ok' })
      }
    }
  )
  
      
  //   }
  // )
  // .spread((item, created) => {
    // if(created===true) {
    //   const token = generateAccessToken(item);
    //   sendAccessToken(token);
    //   return res.status(201).send({ message: 'ok'});
    // } else {
    //   return res.status(422).send('insufficient parameters supplied');
    // }
  // })

  // res.status(500).send();
};
