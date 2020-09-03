# epam-node-mentoring

Before running the project, please make sure there is an .env file with all required configurations is provided.


`.env` example
```
DB_NAME='test-db'
DB_USER='user'
DB_PASSWORD='password'
DB_HOST='localhost'
DB_PORT=5432
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

First run
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

Re-run
```
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate

npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:all
```
