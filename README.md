# Ome 🍽️

> 오늘의 메뉴, 오메!

**오메(Ome)**는 구독자들에게 맛있고 간편한 요리 레시피를 전해주는 프로젝트입니다.  
'오메'는 한국어 감탄사로, 너무 맛있어서 절로 나오는 말이에요.  
매일(또는 매주) 새로운 레시피를 받고, 즐겁게 요리해보세요!

## 주요 기능
- 📬 일일/주간 요리 레시피 구독 서비스
- 🍱 간단하고 따라 하기 쉬운 조리법 제공
- 🛍️ 장보기 리스트 자동 생성
- 💌 개인 맞춤형 레시피 추천 (예정)

## 기술 스택
1) 백엔드
- Java 21
- Spring Boot
- Spring Data JPA (Hibernate)
- MySQL
- Maven

2) 프론트 엔드
- React & React-Router-dom
- Vite/tailwindcss 4.1.7
- javascript & Axios
- Npm & NginX 


3) 브랜치 구조
main    실제 배포
develop    전체 개발 통합
frontend-dev    프론트 전용 통합
feature/frontend-xxx/#1     프론트 기능 개발용
backend-dev    백엔드 전용 통합
feature/backend-user-crud/#1    백엔드 기능 개발용
feature/backend-subscribe-crud/#2
