# BYBE frontend

## Requirements
node v18.16.0 

**IMPORTANT** The app may not work with different node versions

## Docker

Build image:

```bash
docker build -t bybe-frontend:{version} --build-arg version={version} . 
```
Run image:
```bash
docker run -p 9100:80 bybe-frontend:{version}
```

Or take a look the docker compose file and run:
```
docker-compose up -d
```
## Local deploy
### `git clone https://github.com/Solidwave/BYBE-frontend.git`
Clones the repository
### `npm i`
Installs dependencies
### `npm run build`
Builds the project
### `serve ./build/`
serves the app on port 3000
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



