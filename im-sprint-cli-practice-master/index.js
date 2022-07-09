const { range } = require('range');
const getListMultiplesOfTwo = require('./getListMultiplesOfTwo'); // getListMultiplesOfTwo.js 파일을 불러옵니다

// node.js에서 숫자를 입력 받습니다.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Please input number`, number => {
    console.log(`${number} 이하의 2의 배수는 다음과 같습니다.`);
    console.log(getListMultiplesOfTwo(number));
    readline.close()
  })
  