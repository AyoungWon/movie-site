# POP MOVIE
***
POP MOVIE는 현재 인기있는 영화 순위 리스트 및 영화 검색을 통한 영화의 상세 정보를 확인할 수 있습니다. 또한 마음에 드는 영화가 있다면 좋아하는 목록에 추가하여 관리할 수 있습니다. 


## Let's see
그림파일
* youtube: <https://youtu.be/BaQYYrIMfUw>

***

## 개발 동기
React를 공부하면서 SPA에 목적에 부합하는 웹앱 서비스를 만들어 보고 싶어졌고, 반응형으로 제작하여 웹과 앱 모두 한번에 이용 가능하도록 영화 정보 사이트를 만들게 되었습니다.

## 기술 스택

POP MOVIE는 The Movie database API를 이용하여 만들어졌습니다.
User와 관련된 front/back 부분은 <https://github.com/jaewonhimnae/boilerplate-mern-stack>을 참고하여 만들었습니다.

+ Front
  - VanilaJS
  - React
  - Redux
  - CSS
  
+ Back
  - VanilaJS
  - NodeJS
  - Express
  - MongoDB & Mongoose

## 특징
- The Movie database API를 이용한 영화 데이터 수집 및 활용
- Redux를 활용한 Auth관리
- MongoDB Atlas를 이용한 사용자 정보 관리

|||
|:---:|:---:|
| <img src="/README.assets/asset1.png"  width="300px" height="200px"><br>메인배너에서 이번주 가장 관심을 끈 영화 1위를 볼 수 있습니다.<br>|<img src="/README.assets/asset2.png"  width="300px" height="200px"><br>메인 하단에서는 현재 상영작 순위와 이번주 인기순위를 볼 수 있습니다.|
|<img src="/README.assets/asset3.png"  width="300px" height="200px"><br>장르로 영화를 검색할 수 있습니다.<br>|<img src="/README.assets/asset4.png"  width="300px" height="200px"><br>영화 제목으로도 영화를 검색할 수 있습니다.|
|<img src="/README.assets/asset5.png"  width="300px" height="200px"><br>영화 상세페이지에서는 영화와 관련된 기본적인 정보 및, 예고편, 비슷한 영화 추천까지 확인할 수 있습니다.<br>|<img src="/README.assets/asset6.png"  width="300px" height="200px"><br>영화 상세페이지에서 좋아요 버튼을 누르면 favorite페이지에서 해당 목록을 관리할 수 있습니다.|