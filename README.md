# recruitment-task

Clone or download project:
```
git clone https://github.com/neridanek/recruitment-task.git
```


Fill   ```.env``` variables:


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
Start server:
```
npm run start 
```

Swagger api documentation : 
```
http://localhost:'port'/api-docs/
```

Now you can test api with postman !

