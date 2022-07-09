// 동영상 강의에 나온 코드를 그대로 실습하세요
// TODO : DOM으로부터 필요한 엘리먼트를 불러오세요.
// console.log("test");

// 아이디

let elInputUsername = document.querySelector('#username');
let elFailureMessage = document.querySelector('.failure-message');
let elSuccessMessage = document.querySelector('.success-message');

// 비밀번호

let elInputPassword = document.querySelector('#password');
let elFailureMessage_p = document.querySelector('.p-failure-message');
let elSuccessMessage_p = document.querySelector('.p-success-message');

let elInputPassword_r = document.querySelector('#password-retype');
let elMismatchMessage = document.querySelector('.mismatch-message');

elInputUsername.onkeyup = function () {

// 아이디 유효성 검사

  if(isValidLength(elInputUsername.value)) {

  // 성공 메세지
  elSuccessMessage.classList.remove('hide');

  // 실패 메세지 hide 
  elFailureMessage.classList.add('hide');

  } else {

  // 성공 메세지 hide
  elSuccessMessage.classList.add('hide');

  // 실패 메세지
  elFailureMessage.classList.remove('hide');
  
  }

  // 아이디 영문 입력만 가능하도록
  handleOnInput(elInputUsername);
  
}

// 비밀번호 유효성 검사 - 방법 1

// 대,소,특수문자 최소 1번이상씩, 8~10자
// const regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
// r


// elInputPassword.onkeyup = function () {

//   if(isValidLength(elInputPassword.value)
//     && regExpPw.test(elInputPassword.value)) {

//     elSuccessMessage_p.classList.remove('hide');
    
//     // 실패 메세지 hide 
//     elFailureMessage_p.classList.add('hide');
  
//   } else {
  
//     // 성공 메세지 hide
//     elSuccessMessage_p.classList.add('hide');
  
//     // 실패 메세지
//     elFailureMessage_p.classList.remove('hide');
    
//   }

//   console.log(elInputPassword.value);


// }

// 비밀번호 유효성 검사 - 방법 2

let regexLower = /[a-z]/;
let regexUpper = /[A-Z]/;
let regexSpecial = /[!@#$%^&*]/;

elInputPassword.onkeyup = function () {

  if(isValidLength(elInputPassword.value)
    && regexLower.test(elInputPassword.value) 
    && regexUpper.test(elInputPassword.value)
    && regexSpecial.test(elInputPassword.value)) {

    elSuccessMessage_p.classList.remove('hide');
    
    // 실패 메세지 hide 
    elFailureMessage_p.classList.add('hide');
  
  } else {
  
    // 성공 메세지 hide
    elSuccessMessage_p.classList.add('hide');
  
    // 실패 메세지
    elFailureMessage_p.classList.remove('hide');
    
  }

  console.log(elInputPassword.value);


}


// 비밀번호확인 유효성 검사

elInputPassword_r.onkeyup = function () {

  if (isMatch(elInputPassword.value, elInputPassword_r.value)) {
      
    // 비밀번호 match
    // console.log('비밀번호 일치');
    elMismatchMessage.classList.add('hide');

  } else {
    
    // 비밀번호 mismatch, hide remove
    // console.log('비밀번호 불일치');
    elMismatchMessage.classList.remove('hide');
  }
}


function isValidLength(value) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  return value.length >= 4 && value.length <= 12;
}

function isMatch (password1, password2) {
  // TODO : 동영상 강의를 보고 이 함수를 완성하세요.
  // 각 password의 input value를 받아 같은지 비교
  return password1 === password2;
}

// only english

function handleOnInput(e)  {
  e.value = e.value.replace(/[^A-Za-z0-9]/ig, '');
}

