const path = require('path');
const { getDataFromFilePromise } = require('./02_promiseConstructor');

const user1Path = path.join(__dirname, 'files/user1.json');
const user2Path = path.join(__dirname, 'files/user2.json');

const readAllUsers = () => {
  // TODO: Promise.all을 이용해 작성합니다
  let arr = [];
  let a = getDataFromFilePromise(user1Path);
  let b = getDataFromFilePromise(user2Path);

  return Promise.all([a,b])
  .then(values=>{
      arr.push(JSON.parse(values[0]));
      arr.push(JSON.parse(values[1]));
      return arr;
    })
  // let arr = [];
  // let a = JSON.parse("'" + getDataFromFilePromise(user1Path) + "'");
  // let b = JSON.parse("'" + getDataFromFilePromise(user2Path) + "'");
  // return Promise.all([a, b]).then(values=>{
  //     JSON.parse(values);
  //   })
}

readAllUsers();

module.exports = {
  readAllUsers
}