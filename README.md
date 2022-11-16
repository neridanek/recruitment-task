# recruitment-task

Requirements: <b>POSTGRESQL</b>

Clone or download project:
```
git clone https://github.com/neridanek/recruitment-task.git
```


create and fill   ```.env``` variables:


```
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<POSTGRES_HOST>:<POSTGRES_PORT>/<POSTGRES_DB>?schema=public&sslmode=prefer"
```


Install deps:

```
npm install
```

Generate Prisma Client:
```
cd prisma
npx prisma generate
cd ..
```
Import mock data to generated table products

Start server:
```
npm run start 
```

Swagger api documentation : 
```
http://localhost:<port>/api-docs/
```

Now you can test api with postman !

