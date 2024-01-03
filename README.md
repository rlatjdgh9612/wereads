# Wereads

## 사람들이 자신의 생각과 리뷰를 공유하고 소통하기 위한 커뮤니티 플랫폼 입니다.

## 팀원 소개
Front-End(1명) : 김성호

## 프로젝트 소개
Wereads Project는 META의 소셜 미디어 서비스인 Thread를 참고하여 개발한 개인 프로젝트입니다. 

Wereads 프론트엔드 소스 코드는 [여기](https://github.com/rlatjdgh9612/wereads)에 있습니다.

## Front-End 기술스택
- Frontend: [React.js](https://reactjs.org/)

<div align="center">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

# 프로젝트
## 실행하기
- 아래 명령어를 입력하여 실행해주세요.
```
npm start
```
- 명령어는 디렉토리 최상단에서 실행해주세요.

## 페이지 UI 소개
#### 1) 로그인 페이지
<img src="https://github.com/rlatjdgh9612/wereads/assets/78453933/0d8d447e-ecd8-49ac-adb2-67f1f9ac5139">

- 로그인 페이지는 유저의 이메일, 비밀번호를 입력하는 입력창과 로그인 버튼, 회원가입 & 비밀번호 찾기 버튼으로 구성되어 있습니다.
- 이메일은 이메일 형식으로 입력해야 하고, 비밀번호는 6자리 이상일때 유효성 검사를 부여하여 로그인 버튼이 활성화 되도록 구현하였습니다.
- 회원가입 하기 버튼은 text 형식으로 표현하였고, 버튼을 클릭했을때 회원가입 페이지로 이동할 수 있도록 하였습니다.

#### 2) 회원 가입 페이지
<img src="https://github.com/rlatjdgh9612/wereads/assets/78453933/220504e8-fcda-4131-bae7-3d46cb3b5aa2">

- 회원가입 페이지는 미가입 유저가 필수 정보 입력란과 선택 정보 입력란으로 구성하여 미가입 유저가 쉽게 회원가입 할 수 있도록 유도하였습니다.
- 이메일은 로그인 입력창과 마찬가지로 이메일 형식, 비밀번호는 대문자, 소문자, 특수문자 상관없이 6자리 이상으로 입력, 비밀번호 확인 창에서 똑같은 비밀번호를 입력하면 회원가입 하기 버튼이 활성화 되도록 구현하였습니다.
- 선택사항은 닉네임과 프로필에 들어갈 이미지 파일선택, 생년월일, 전화번호를 선택할수 있는 Select Box로 구현하였습니다.
- 뒤로 버튼을 누르면 로그인 페이지로 돌아갑니다.

#### 3) 회원가입 완료 페이지
<img src="https://github.com/rlatjdgh9612/wereads/assets/78453933/a512ab37-55ca-48ce-a2b2-ba54fedb1243">

- 회원가입 하기 버튼을 누르면 다음과 같이 회원가입이 완료되었다는 표시를 사용자에게 보여주고 확인 버튼을 누르면 로그인 페이지로 이동하게 됩니다.
- 뒤로 버튼을 누르면 회원가입 페이지로 이동됩니다.

#### 4) 포스트 리스트 페이지
<img src="https://github.com/rlatjdgh9612/wereads/assets/78453933/3380945d-95a1-49e8-ac03-f131788c7e24">

- 로그인에 성공하면 포스트 List 들을 최신순으로 작성된 순서대로 List들을 보여주도록 구성하였습니다.
- 여기서 userToken이 없거나 로그인이 안된 상태에서 자신이 작성한 포스트를 수정 또는 삭제하려고 시도한다면 CONTENT_NOT_FOUND 권한 에러를 발생시킵니다.
- 글 쓰기 버튼을 누르면 포스트 작성 패이지로 이동하도록 구성되어 있습니다.
- 로그인이 안된 상태에서 글 쓰기 버튼을 누르려고 하면 로그인후 이용할 수 있도록 사용자에게 알림창으로 안내하고 확인버튼을 누르면 로그인 페이지로 이동할 수 있도록 구성하였습니다.

#### 5) 포스트 작성 페이지
<img width="500" height="700" src="https://github.com/rlatjdgh9612/wereads/assets/78453933/73679d29-bff9-4446-a30c-3b56a592f43f">

- 리스트 페이지에서 글 쓰기 버튼을 누르면 작성 페이지로 이동되며 프로필 이미지와 닉네임을 가져와 표시할 수 있도록 페이지를 구성하였습니다.
- 리스트를 작성하지 않은 상태에서 게시 버튼을 누르면 한 글자 이상 입력해달라는 알림창을 띄워서 작성을 유도할 수 있도록 구현하였습니다.
- 취소 버튼을 누르면 포스트 작성 취소여부를 확인할 수 있도록 알림창을 띄워서 사용자에게 보여주도록 구현하였습니다.

#### 6) 포스트 수정 페이지
<img src="https://github.com/rlatjdgh9612/wereads/assets/78453933/add99b15-9286-4423-9d8a-8168c8a72114">

- 리스트 페이지에서 로그인 된 유저에 한해서만 수정 버튼을 눌렀을때 수정 페이지로 이동할수 있도록 구현하였습니다.
- 작성 페이지와 마찬가지로 게시 버튼을 누르면 수정할 내용에 대한 알림을 띄워 수정한 내용을 반영할 것인지에 대해 알려주도록 구현하였습니다.
- 수정을 취소하고자 할경우 수정 버튼을 누르면 포스트 수정을 취소 할것인지에 대한 내용을 알림창을 띄워서 사용자에게 보여주도록 구현하였습니다.

#### 7) 댓글 작성 페이지
<img width="532" src="https://github.com/rlatjdgh9612/wereads/assets/78453933/3a567884-409b-43a1-abaf-28587d1ef41e">

- 댓글 작성 페이지는 로그인한 유저에 한해 댓글을 작성할수 있도록 입력창과 버튼으로 구성했고, 댓글 리스트는 Mock Data를 이용해 최신순으로 List를 나열했습니다.
- 댓글 List 들은 스크롤바를 이용해 밑에 있는 댓글들을 확인할 수 있습니다.


## Reference
- 이 프로젝트는 META의 Thread를 참조하여 만들었습니다.
- 실무수준의 프로젝트이지만 해당 프로젝트는 학습 및 취업용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
- 백엔드 API는 사정상 연결을 해볼 수 있는 환경 구축이 어려워서 Test 해볼때, Mock Data 위주로 구현했습니다.
