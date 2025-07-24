 깃허브 주소 : https://github.com/Seungmi97/ome

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
- Lombok
- MySQL 8.0.41
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
...



로컬 실행 메뉴얼 (개발환경 셋업)
---------------------------------------------------------------
1. 파일을 받아서 프론트엔드 폴더에서 프론트 실행
   - npm install
   - npm run dev

2. 파일을 받아서 백엔드 폴더에서 백엔드 실행
   - ./mvnw spring-boot:run



배포 환경 실행 메뉴얼 (실제 운영)
-> https://jaybee-dev.app/

1. 프론트엔드 배포 (수동)
   1) 별도의 개인 서버(우분투 리눅스 대상)에 apt install nginx 설치
   - vi /etc/nginx/site-available/jaybee
   (아래 내용 붙이기)
   server {
    listen 443 ssl;
    server_name www.jaybee-dev.app;

    ssl_certificate     /etc/nginx/ssl/jaybee.pem;
    ssl_certificate_key /etc/nginx/ssl/jaybee.key;

    # React 앱의 정적 파일 위치
    root /var/www/html;
    index index.html;

    # 정적 파일 : HTML, JS, CSS 등은 바로 리턴
    location /static/ {
            expires 1y;
            add_header Cache-Control "public";
    }

    location / {
        try_files $uri /index.html;
    }

    location /api/{
        if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' "$http_origin" always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
                add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Requested-With' always;
                add_header 'Access-Control-Allow-Credentials' 'true' always;
                return 204;
        }
        proxy_pass http://192.168.45.240:8081;  # 본인 백엔드 서버주소 기입 (리버스 프록시 대상)
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Authorization $http_authorization;
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;
    }
    location /uploads/ {
        proxy_pass http://192.168.45.240:8081;  # 본인 백엔드 서버주소 기입 (리버스 프록시 대상)
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP → HTTPS redirect
server {
    listen 80;
    server_name www.jaybee-dev.app;
    return 301 https://$host$request_uri;
}
   2) /var/www/html/ 디렉토리 아래에 npm run build 파일들 그대로 배치
    - 빌드 후 .dist/ 디렉토리에 파일 생성됨. 


2. 백엔드 배포
- backend\target (java 실행파일)
- java -jar target/my-app-1.0-SNAPSHOT.jar