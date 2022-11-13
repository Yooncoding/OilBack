# OilBack

![logo.png](https://user-images.githubusercontent.com/63987872/201514067-efdedc4b-5e50-47e0-9ec1-707cc01bfef3.png)

- 'MOODA', '하루콩'과 같이 오늘 하루 어떤 감정을 느꼈는가? 또한 그 감정을 느낀 이유는 무엇이었는지 기록하는 어플
- 일기 내용을 토대로 감정을 분석하고 일정 기간 동안의 감정을 통계로 시각화한다.
- 홀로 보내는 시간이 외롭1고 힘들 때면 오늘의 일기가 작성자 감정을 토대로 조언을 추천한다.

### **✅ 사용 기술 및 개발 환경**

Node.js, express, Visual Studio Code, MySQL, Sequelize, AWS ec2, AWS S3, AWS RDS, Post man

### **✅ 실행**

깃허브 클론을 진행합니다.

```bash
git clone https://github.com/Yooncoding/OilBack.git
```

모듈을 설치합니다.

```bash
npm install
```

환경 변수를 셋팅합니다.

```bash
# .env
PORT =

MYSQL_DATABASE =
MYSQL_USERNAME =
MYSQL_PASSWORD =
MYSQL_HOST =

COOKIE_SECRET =
JWT_SECRET =

GMAIL_EMAIL =
GMAIL_PASSWORD =

CLOVA_ID =
CLOVA_SECRET =

AWS_S3_KEY_ID =
AWS_S3_KEY_SECRET =

RDS_DATABASE =
RDS_USER =
RDS_PASSWORD =
RDS_HOST =

MATGIM_KEY =
```

서버를 개발 스크립트로 실행합니다.

```bash
npm run dev
```
