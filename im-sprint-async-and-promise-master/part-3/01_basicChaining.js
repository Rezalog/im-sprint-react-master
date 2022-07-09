const { values } = require("underscore");

var newsURL = 'http://localhost:4999/data/latestNews';
var weatherURL = 'http://localhost:4999/data/weather';

function getNewsAndWeather() {
  // TODO: fetch을 이용해 작성합니다
  // TODO: 여러개의 Promise를 then으로 연결하여 작성합니다
  // let news ='http://localhost:5000/data/latestNews';
  // let weather = ' http://localhost:5000/data/weather';
  
  // let a = fetch(news)
  //   .then((response) => response.json())
  //   .then((json) => console.log(json))
  //   .catch((error) => console.log(error));
  
  // let b = fetch(weather)
  // .then((response) => response.json())
  // .then((json) => console.log(json))
  // .catch((error) => console.log(error));

  // let obj = {};
  // return Promise([a,b])
  // .then(values=>{
  //   obj.push(JSON.parse(values[0]));
  //   obj.push(JSON.parse(values[1]));
  //   return obj;
  // })
  return fetch(newsURL)
    .then(resp => resp.json())
    .then(json1 => {
      return fetch(weatherURL)
        .then(resp => resp.json())
        .then(json2 => {
          return {
            news: json1.data,
            weather: json2
          }
        });
    })
}

if (typeof window === 'undefined') {
  module.exports = {
    getNewsAndWeather
  }
}