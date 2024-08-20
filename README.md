# api
This application is running on port 3030, you can chage port number in .env file.
 
### Requirements
For building and running the application, you need:

- npm
- node
- MySQL

First Copy ``.env.example`` to ``.env`` file.
Update the database configurations on ``.env`` file.

### Running the application

Install the IDE (preferred IDE: Visual Studio Code) <br/>
YOu must install lib first by running the following command from terminal.
```shell
npm install --save
```
You can run the following command from the terminal.

```shell
#database migration and seeding
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

#server start
npm start
```
The application is accessible on ``http://localhost:3030``

# frontend-server
This application is running on port ``3000``.
 
### Requirements
For building and running the application you need:

- npm
- api

Update the api configurations on ``apis/apis.js`` file.

### Running the application

Install the IDE (preferred IDE: Visual Studio Code) <br/>

YOu must install lib first by running the followint command from terminal.
```shell
npm install --save
```
You can run the following command from the terminal.

```shell
npm run start
```
The application is accessible on ``http://localhost:3000``


To see flight data, please choose this flight
```shell
From => Bangkok
To => Chaign Mai
Date => 2024-09-18
```

To see fully booked data, plese choose this flight

```shell
From => Chaign Mai
To => Bangkok
Date => 2024-09-19
```

