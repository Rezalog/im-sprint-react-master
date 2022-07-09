require('./testSupport.js');

describe('Thumbnail 컴포넌트 테스트', () => {
  require('./Thumbnail.test');
});

describe('Gallery 컴포넌트 테스트', () => {
  require('./Gallery.test');
});

describe('App 컴포넌트 테스트', () => {
  require('./App.test');
});

// Advanced Challenge 도전을 위해서 describe.skip을 describe로 변경하세요.
describe.skip('Todos 컴포넌트 테스트', () => {
  require('./Todos.test');
});
