const express = require('express');
const cors = require('cors');
const session = require('express-session');
const logger = require('morgan');
const fs = require('fs');
const https = require('https');
const usersRouter = require('./routes/user');

const app = express();


const PORT = process.env.PORT || 4000;

// TODO: express-session 라이브러리를 이용해 쿠키 설정을 해줄 수 있습니다.
app.use(
  session({
    secret: '@codestates', //암호화하는 데 쓰일 키
    resave: false, // 세션을 언제나 저장할지 설정함 (?)
    saveUninitialized: true, //세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    cookie: {
      domain: 'localhost', // 클라는 서버도메인이 설정과 같아야 쿠키전송가능
      path: '/', // 해당 path를 만족하면 쿠키 보내줌
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'None',
      httpOnly: true, // JS로 쿠키를 사용할 수 없도록 함
      secure: true, // https 쿠키 주고받게 함
    },
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: CORS 설정이 필요합니다. 클라이언트가 어떤 origin인지에 따라 달리 설정할 수 있습니다.
// 메서드는 GET, POST, OPTIONS를 허용합니다.
app.use(cors());
/**
 * /users 요청에 대해서 라우터를 이용하기 때문에,
 * 반드시 아래와 같은 주소와 메서드로 요청을 보내야 합니다.
 *
 * POST https://localhost:4000/users/login,
 * POST https://localhost:4000/users/logout,
 * GET https://localhost:4000/users/userinfo
 */
app.use('/users', usersRouter);

let server;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다.
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app
    )
    .listen(PORT);
} else {
  server = app.listen(PORT)
}
module.exports = server;
