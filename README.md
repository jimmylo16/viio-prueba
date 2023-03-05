# viio-prueba

## Installation
Run In three different terminals the following comands:

### Database

```bash
$ cd Backend
$ docker-compose up -d 
```
### BackEnd

change the .envCopy file name to ".env"
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

In the root directory there are a file called 

```bash
viio collection.postman_collection.json
```
this is a json file that you can import to postman and see the crud operations with examples


