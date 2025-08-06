NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=4fba01f73c21d549ab68f29d3a9eea7a4f2d079af43635d86934e623752774d3

node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"


JWT_SECRET=4fba01f73c21d549ab68f29d3a9eea7a4f2d079af43635d86934e623752774d3