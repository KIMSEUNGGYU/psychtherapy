# BE - simple ( 비대면 심리 상담 플랫폼)

### Technology Stack
Component         | Technology
---               | ---
Frontend          | React 16.3+, Redux
Backend           | Node v12+ LTS, Express
Security          | TBD...
Auth              | TBD...
Database          | Mysql
API Documentation | Swagger-UI
Build             | npm, yarn
Config            | Webpack

## Quick Start 
- Go to your project folder from your terminal

```bash
# Install dependencies
npm install

# Start development client (http://localhost:3000)
npm run client

# Start development server (http://localhost:8080)
npm run server

# Build for production
"yarn build" or "npm run build"

# Start production server
"yarn start" or "npm start"
```

### Swagger
- local : http://localhost:8080/swagger-ui.html (http://{base URL}/swagger-ui.html)


### Dev mode
- 개발 모드에서는 2대의 서버가 실행됩니다. Front code는 핫팩 및 라이브 리로딩을 도와주는 webpack-dev server에서 제공됩니다. 
  서버 측 Express code는 nodemon을 사용하여 서버 측 코드가 변경 될 때마다 라이브 리로딩을 도와줍니다. 

### Production mode
- 프로덕션 모드에서는 하나의 서버 만 실행됩니다. 모든 클라이언트 측 코드는 웹팩을 사용하여 정적 파일로 번들되며 node(Express) 애플리케이션에서 제공됩니다.