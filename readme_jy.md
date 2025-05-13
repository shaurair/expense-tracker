 https://www.youtube.com/watch?v=_ycD0d7skdQ
 
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

https://firebase.google.com/
create project
build authentication

...

if npm error code EACCES -> sudo npm ...

// Deploy without github
firebase login
npm run build
firebase init

Hosting:configure files...
use an existing project -> select {project}
public? build
single-page app? N
auto deploy with github? N
index.html exist overwrite? N

setup workflow before deploy? N
automatic deploy? N

after that, while code changing

npm run build
firebase deploy