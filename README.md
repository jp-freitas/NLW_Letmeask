<p align="center">
  <img alt="Letmeask" src=".github/logo-dark.svg" width="160px"/>
</p>

<h1 align="center">
  <img alt="Letmeask" src=".github/github-cover.svg"  />
</h1>

<br/>

## Tecnologies
This project was developed with the following technologies:
- .[React].(https://reactjs.org)
- .[Firebase].(https://firebase.google.com/)
- .[TypeScript].(https://www.typescriptlang.org/)

## Letmeask Project
To use this project, you will need do somethings.

First of all, you need have a project in firebase, then go there and create a project in firebase.

After creating the firebase project, you will create a .env.local file in root of this project, with the below content:

```bash
# Firebase variables to your project configuration
REACT_APP_API_KEY="YOUR_API_KEY",
REACT_APP_AUTH_DOMAIN="YOUR_AUTH_DOMAIN",
REACT_APP_DATABASE_URL="YOUR_DATABASE_URL",
REACT_APP_PROJECT_ID="YOUR_PROJECT_ID",
REACT_APP_STORAGE_BUCKET="YOUR_STORAGE_BUCKET",
REACT_APP_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER",
REACT_APP_APP_ID="YOUR_APP_ID"
```
Inside of every double quote, you will put the information that is in your firebase project. 

This file is necessary to connect correctly to Firebase Project.

After creating the .env.local file, you will run the follow codes in terminal of this project.

```bash
# To install dependencies
$ yarn

# To run the application
$ yarn start
```
The application will be avaliable in yout browser in the address: http://localhost:3000.

- [x] Aula 01 - Liftoff
- [x] Aula 02 - Maximum Speed
- [x] Aula 03 - In Orbit
- [x] Aula 04 - Landing
- [x] Aula 05 - Surface Exploration

### To-Do list
- [ ] Dark Mode
- [ ] Styled Components
- [ ] ESLint, Prettier
- [ ] Responsive