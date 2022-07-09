const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  // console.log(req.cookies.jwt); - eyJhbGciOi..
  // console.log(verify(req.cookies.jwt, process.env.ACCESS_SECRET))
  const accessTokenData = isAuthorized(req);

  if (!accessTokenData) {
    // return res.status(401).send("no token in req.headers['authorization']");
    res.status(401).send({ 
      data: null, 
      message: 'not authorized'});
  } 
  if(accessTokenData) { 
    user.findOne({ where: { id: accessTokenData.id } })
      .then((data) => {
        // console.log(data.dataValues);
        if (!data) {
          res.status(401).send({ data: null, message: 'not authorized' });
        } else {
          delete data.dataValues.password;

        res.status(200).send(
          { data: 
            { userInfo: data.dataValues }, 
              message: 'ok' });
      }
    })
  }
};
