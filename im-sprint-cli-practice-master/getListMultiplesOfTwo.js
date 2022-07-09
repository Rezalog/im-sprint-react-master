const { range } = require('range'); // range 모듈을 불러옵니다


// 2부터 입력받은 숫자(upTo)미만의 2의 배수를 출력해주는 함수입니다

function getListMultiplesOfTwo(upTo) {
  // return 함수를 이용합니다
  return range(2, Number(upTo) + 2, 2);
}

module.exports = getListMultiplesOfTwo;



// let x

// x = 숫자 입력값

// 레인지 함수 (2, x+2, 2) 
// range.range(2, x + 2, 2)