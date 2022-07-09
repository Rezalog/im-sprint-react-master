// const { Users } = require('../../models');

module.exports = {
  post: (req, res) => {

    // TODO: 세션 아이디를 통해 고유한 세션 객체에 접근할 수 있습니다.
    // 앞서 로그인시 세션 객체에 저장했던 값이 존재할 경우, 이미 로그인한 상태로 판단할 수 있습니다.
    // 세션 객체에 담긴 값의 존재 여부에 따라 응답을 구현하세요.
    // const userInfo = await Users.findOne({
    //   where: { userId: req.body.userId, password: req.body.password },
    // });

    if (!req.session.userId) {
      // your code here
      // 세션 객체에 접근할 수 없을때, 즉 로그인이 이루어지지 않았을 때
      res.status(400).send({
        data : null,
        message : 'not authorized'
      })
      
    } else {
      // your code here
      // TODO: 로그아웃 요청은 세션을 삭제하는 과정을 포함해야 합니다.
      req.session.destroy(function(){
        req.session;
        
        res.status(200).send({
          data : null,
          message : 'ok'
        });
      })
    }
  },
};
