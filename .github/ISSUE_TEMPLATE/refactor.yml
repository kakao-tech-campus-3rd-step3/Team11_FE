name: "🛠 Refactor"
description: "코드 구조/가독성/성능 개선을 위한 리팩토링 작업"
labels: ["refactor"]
title: "[REFACTOR] "

body:
  - type: textarea
    attributes:
      label: 🔧 리팩토링 대상
      description: 리팩토링 대상(파일/모듈/함수 등)과 목적에 대해 구체적으로 기록해 주세요. 해당 부분에 대한 이미지를 첨부하면 더 좋습니다.
      placeholder: |
        반드시 -, 1. 2. 등의 글머리 기호를 통해 구분하여 주세요.
        이미지는 항상 해당 내용의 하단에 첨부합니다.
        작성 예시
        1. LoginForm 컴포넌트
        상태 관리 로직을 Context → Custom Hook으로 분리하여 유지보수성 향상
        <이미지/코드>

        2. UserService
        중복된 사용자 검증 로직 통합하여 중복 코드 제거
        <이미지/코드>

        3. API 응답 처리
        불필요한 캐싱 로직 제거 및 react-query로 통합하여 성능 최적화
        <이미지/코드>

  - type: textarea
    attributes:
      label: 📄 변경 사항
      description: 리팩토링 방식에 대해 기록해 주세요.
      placeholder: |
        반드시 -, 1. 2. 등의 글머리 기호를 통해 구분하여 주세요.
        이미지는 항상 해당 내용의 하단에 첨부합니다.
        작성 예시
        1. 공통 훅 useAuth 생성
        로그인 상태, 사용자 정보, 토큰 관리 로직을 통합
        기존 LoginForm, Navbar 등에서 중복된 상태 관리 제거
        <이미지/코드>

        2. UserService 모듈 정리
        중복된 사용자 검증 로직(userExists, validateUser)을 하나의 메서드로 통합
        예외 처리 방식을 통일하여 Error Handling 일관성 확보
        <이미지/코드>

        3. API 호출 구조 개선
        axios 인스턴스를 별도 clients/publicApi.ts 파일로 분리
        모든 모듈에서 공통 인스턴스를 사용하도록 변경
        react-query를 적용하여 데이터 캐싱 및 로딩 상태 관리 추가
        <이미지/코드>

        4. 타입 정의 정리
        User, Post 관련 타입을 libs/types/ 디렉토리로 이동
        중복된 타입 제거 및 공통 타입으로 통일
        <이미지/코드>

  - type: textarea
    attributes:
      label: 📂 참고 자료
      description: 참고한 문서나 관련 링크가 있다면 첨부해 주세요. 없으면 `> N/A` 그대로 두시면 됩니다.
      placeholder: |
        작성 예시
        > https://refactoring.guru/design-patterns
        혹은 > 를 지우고 이미지/코드 첨부
      value: "> N/A"
