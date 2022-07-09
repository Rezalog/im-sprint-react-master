const path = require('path');
const { getDataFromFilePromise } = require('./02_promiseConstructor');

const user1Path = path.join(__dirname, 'files/user1.json');
const user2Path = path.join(__dirname, 'files/user2.json');

const readAllUsersAsyncAwait = async () => {
  // TODO: async/await 키워드를 이용해 작성합니다
  let arr = [];
  let a = await getDataFromFilePromise(user1Path);
  let b = await getDataFromFilePromise(user2Path);
  return Promise.all([a,b])
  .then(values=>{
      arr.push(JSON.parse(values[0]));
      arr.push(JSON.parse(values[1]));
      return arr;
    })
}

// readAllUsersAsyncAwait();

module.exports = {
  readAllUsersAsyncAwait
}