# Section 1: Hiring Assessment

이번 Section 1: Hiring Assessment에서는 React를 이용한 갤러리 앱을 만듭니다. 주요 특징은 다음과 같습니다.

- Single Page Application으로, 페이지 두 개(About, Gallery 컴포넌트)가 존재합니다.
- Gallery 컴포넌트에서는 사진 목록이 썸네일로 존재하고, 썸네일 이미지를 클릭하면 크게 보이는 앱입니다.

![goals](https://user-images.githubusercontent.com/12145019/134956267-90628f6d-bed8-4b10-9841-891759eadb3f.gif)

## How to HA

### 의존성 모듈 설치

- `npm install`을 이용해 의존성 모듈(dependencies)를 설치합니다.

### 애플리케이션 실행

- `npm start` npm script를 이용해 클라이언트 앱을 실행합니다.
  - Gallery 컴포넌트를 눈으로 확인할 수 있습니다.
  - 테스트 후반에 이르러서는 조건에 따른 라우팅을 적용해야 Gallery 컴포넌트를 확인할 수 있습니다.

### 애플리케이션 테스트

- `npm test`를 통해 테스트를 진행할 수 있습니다.

### 과제 제출

- `npm run submit`으로 과제를 제출합니다.

- 주어진 시간 내 과제를 제출하세요.
  - 과제는 여러 번 제출할 수 있습니다.
  - Bare Minimum Requirements를 모두 통과하면 과제를 1차로 제출하세요.
  - Bare Minimum Requirements를 모두 하지 못했어도 제출하세요. (제출 내역이 없으면 0점 처리됩니다.)
  - Bare Minimum Requirements를 모두 통과하고 제출했으면, Advanced Challenge에 도전하세요.
    - `src/__test__/index.test.js`의 주석을 참고하여 Advanced Challenge를 시작할 수 있습니다.
  - Advanced Challenge도 같은 npm script로 제출해 주세요. (`npm run submit`)

- 테스트 케이스(`src/__test__` 이하 파일)를 수정하지 마세요.
  - 테스트 케이스에 문제가 있다고 판단되는 경우, 이슈 쉐어링으로 제보 부탁드립니다.

## Bare Minimum Requirements

주어진 모든 테스트를 통과하세요.

- Component unit test
  - 각 컴포넌트의 기능을 테스트합니다.
  - Thumbnail, Gallery, App

## Advanced Challenge

Advanced Challenge는 섹션 1에서 배운 내용과 배우지 않은 내용을 스스로 평가할 수 있도록 제작되었습니다.
자신의 실력과 자기주도적 학습 능력을 보다 정확하게 확인할 수 있는 좋은 기회입니다. 풀 수 있는 데까지 도전해 보세요.

- Bare Minimum Requirement에서 Todo 기능을 추가합니다.
  - Todo 컴포넌트 제작
  - 페이지 라우팅에 Todo 컴포넌트 추가
  - Todo Create, Delete, Mark 기능 구현

> Advanced Challenge는 HA 심사 평가에 반영하지 않습니다.
> Bare Minimum Requirements를 모두 통과하고 진행해 주세요.
> `src/__test__/index.test.js`의 주석을 참고하여 Advanced Challenge를 시작할 수 있습니다.
