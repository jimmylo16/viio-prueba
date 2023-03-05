# viio-prueba

## Installation
Run In three different terminals the following comands:

### Database

```bash
$ cd Backend
$ docker-compose up -d 
```
### BackEnd
```bash
$ cd Backend
$ npm install
$ npm run start:dev
```

### FrontEnd
```bash
$ cd ..
$ cd Frontend
$ npm install
$ npm run dev
```

Ensure in the frontEnd  a .env.local with the following env variable 

GOOGLE_CLIENT_SECRET="google credentials"
