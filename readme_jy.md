https://www.youtube.com/watch?v=_ycD0d7skdQ

// **\*** START **\*** //
npx create-react-app .

/src
remain only App.css, App.js, index.js
delete others

index.js
remove sth

App.js
remove sth

npm start
npm install react-router-dom firebase
npm install -g firebase-tools
npm install

https://firebase.google.com/
create project
build authentication

...

if npm error code EACCES -> sudo npm ...

// **\*** Run localhost **\*** //
(if change dev environment) npm install
npm start
ctrl + C to Stop

// **\*** Deploy without github **\*** //
(first time) firebase login (beforehand -> npm install -g firebase-tools)
npm run build
(verify build result: npx serve -s build)
(first time) firebase init
firebase deploy

Hosting:configure files...
use an existing project -> select {project}
public directory? build
single-page app? N
auto deploy with github? N
index.html exist overwrite? N

setup workflow before deploy? N
automatic deploy? N

after that, while code changing

npm run build
firebase deploy
